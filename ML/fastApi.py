import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware


# Load environment variables
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Load the scaler and the dataset
with open("scaler.pkl", "rb") as scaler_file:
    loaded_scaler = pickle.load(scaler_file)

data = pd.read_csv("../Data/spotify-2023-clean.csv")

# Define the features
features = [
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
]

# Spotify API credentials
client_id = os.getenv("SPOTIPY_CLIENT_ID")
client_secret = os.getenv("SPOTIPY_CLIENT_SECRET")

spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials(client_id, client_secret)
)


# Function to fetch playlist tracks
def get_playlist_tracks(playlist_id):
    results = spotify.playlist_tracks(playlist_id)
    tracks = results["items"]
    while results["next"]:
        results = spotify.next(results)
        tracks.extend(results["items"])
    return tracks


# Function to fetch audio features
def get_audio_features(track_ids):
    features = spotify.audio_features(track_ids)
    return features


def euclidean_distance(point1, point2):
    return np.sqrt(np.sum((point1 - point2) ** 2))


def knn(train_features, test_feature, k):
    distances = []
    for i in range(len(train_features)):
        distance = euclidean_distance(train_features[i], test_feature)
        distances.append((distance, i))
    distances.sort(key=lambda x: x[0])
    neighbors = distances[:k]
    return [neighbor[1] for neighbor in neighbors]


# Function to fetch additional information
def fetch_additional_info(track_ids):
    tracks_info = spotify.tracks(track_ids)["tracks"]
    track_details = []
    for track in tracks_info:
        track_detail = {
            "track_name": track["name"],
            "album_image": (
                track["album"]["images"][0]["url"] if track["album"]["images"] else None
            ),
            "artist_name": ", ".join([artist["name"] for artist in track["artists"]]),
            "album_name": track["album"]["name"],
            "duration_ms": track["duration_ms"],
            "popularity": track["popularity"],
            "album_release_date": track["album"]["release_date"],
        }
        track_details.append(track_detail)
    return track_details


# Define the recommendation function
def recommend_songs(data, scaler, user_liked_songs, features, k):
    data_selected_features = data[features]
    data_normalized_features = scaler.transform(data_selected_features)
    user_liked_songs_normalized = scaler.transform(user_liked_songs)

    user_average_feature = np.mean(user_liked_songs_normalized, axis=0)

    recommended_song_indices = knn(data_normalized_features, user_average_feature, k)
    recommended_tracks = data.iloc[recommended_song_indices][
        ["track_name", "artist(s)_name"]
    ]
    recommended_tracks_list = recommended_tracks.values.tolist()

    track_ids = []
    for track in recommended_tracks_list:
        track_search = spotify.search(
            q=f"track:{track[0]} artist:{track[1]}", type="track", limit=1
        )
        if track_search["tracks"]["items"]:
            track_ids.append(track_search["tracks"]["items"][0]["id"])

    if track_ids:
        recommended_songs_details = fetch_additional_info(track_ids)
        return recommended_songs_details
    else:
        return []


# Define request models
class PlaylistRequest(BaseModel):
    playlist_id: str
    k: int


class SearchQueryRequest(BaseModel):
    search_query: str
    k: int


@app.post("/recommend_from_playlist")
async def recommend_from_playlist(request: PlaylistRequest):
    tracks = get_playlist_tracks(request.playlist_id)

    track_ids = [
        item["track"]["id"] for item in tracks if item["track"]["id"] is not None
    ]
    audio_features = get_audio_features(track_ids)

    audio_features_df = pd.DataFrame(audio_features)

    if not audio_features_df.empty and set(features).issubset(
        audio_features_df.columns
    ):
        user_liked_songs = audio_features_df[features].values
        recommended_songs = recommend_songs(
            data, loaded_scaler, user_liked_songs, features, request.k
        )
        return recommended_songs
    else:
        raise HTTPException(
            status_code=400,
            detail="The playlist does not contain enough audio features to make recommendations.",
        )


def find_matching_indices(data, search_query):
    matching_indices = []
    for index, row in data.iterrows():
        track_name = row["track_name"].lower()
        artist_name = row["artist(s)_name"].lower()
        if search_query.lower() in track_name or search_query.lower() in artist_name:
            matching_indices.append(index)
    return matching_indices


def recommend_based_on_search_query(data, scaler, features, k, search_query):
    data_selected_features = data[features]
    data_normalized_features = scaler.transform(data_selected_features)

    matching_indices = find_matching_indices(data, search_query)

    if len(matching_indices) == 0:
        return []

    matching_songs_features = data_normalized_features[matching_indices]
    avg_matching_features = np.mean(matching_songs_features, axis=0)

    recommended_song_indices = knn(data_normalized_features, avg_matching_features, k)
    recommended_tracks = data.iloc[recommended_song_indices][
        ["track_name", "artist(s)_name"]
    ]
    recommended_tracks_list = recommended_tracks.values.tolist()

    track_ids = []
    for track in recommended_tracks_list:
        track_search = spotify.search(
            q=f"track:{track[0]} artist:{track[1]}", type="track", limit=1
        )
        if track_search["tracks"]["items"]:
            track_ids.append(track_search["tracks"]["items"][0]["id"])

    if track_ids:
        recommended_songs_details = fetch_additional_info(track_ids)
        return recommended_songs_details
    else:
        return []


@app.post("/recommend_based_on_search_query")
async def recommend_based_on_search_query_endpoint(request: SearchQueryRequest):
    recommended_songs = recommend_based_on_search_query(
        data, loaded_scaler, features, request.k, request.search_query
    )
    return recommended_songs


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=4000)
