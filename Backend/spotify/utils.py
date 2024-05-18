import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
import logging

logging.basicConfig(level=logging.DEBUG)

# Load environment variables
from dotenv import load_dotenv

load_dotenv()

client_id = os.getenv("SPOTIPY_CLIENT_ID")
client_secret = os.getenv("SPOTIPY_CLIENT_SECRET")

spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials(client_id, client_secret)
)

with open("../Data/scaler.pkl", "rb") as scaler_file:
    loaded_scaler = pickle.load(scaler_file)

data = pd.read_csv("../Data/spotify-2023-clean.csv")

features = [
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
]


def get_playlist_tracks(playlist_id):
    results = spotify.playlist_tracks(playlist_id)
    tracks = results["items"]
    while results["next"]:
        results = spotify.next(results)
        tracks.extend(results["items"])
    return tracks


def get_audio_features(track_ids):
    return spotify.audio_features(track_ids)


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


def recommend_songs(data, scaler, user_liked_songs, features, k):
    if isinstance(data, dict):
        # Convert the dictionary to a DataFrame if it's a dictionary
        data = pd.DataFrame([data])  # Wrap dictionary in a list

    # Check if data is a DataFrame
    if isinstance(data, pd.DataFrame):
        # Check if all features are present in the DataFrame columns
        missing_features = [
            feature for feature in features if feature not in data.columns
        ]
        if not missing_features:
            data_selected_features = data[features]
            data_normalized_features = scaler.transform(data_selected_features)
            user_liked_songs_normalized = scaler.transform(user_liked_songs)

            user_average_feature = np.mean(user_liked_songs_normalized, axis=0)

            recommended_song_indices = knn(
                data_normalized_features, user_average_feature, k
            )
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
        else:
            raise ValueError(
                f"The following features are missing in the DataFrame columns: {', '.join(missing_features)}"
            )
    else:
        raise ValueError("Data should be a DataFrame or a dictionary")


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
