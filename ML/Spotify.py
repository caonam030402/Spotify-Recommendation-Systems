import streamlit as st
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os

# Load environment variables
from dotenv import load_dotenv

load_dotenv()

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


# Define the recommendation function
def recommend_songs(data, scaler, user_liked_songs, features, k):
    data_selected_features = data[features]
    data_normalized_features = scaler.transform(data_selected_features)
    user_liked_songs_normalized = scaler.transform(user_liked_songs)

    user_average_feature = np.mean(user_liked_songs_normalized, axis=0)

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

    recommended_song_indices = knn(data_normalized_features, user_average_feature, k)
    recommended_songs_details = data.iloc[recommended_song_indices][
        ["track_name", "artist(s)_name"]
    ]

    return recommended_songs_details


# Streamlit app
st.title("Spotify Song Recommendation System")

st.write("Enter your Spotify Playlist ID:")

playlist_id = st.text_input("Playlist ID")

if playlist_id:
    tracks = get_playlist_tracks(playlist_id)

    track_ids = [
        item["track"]["id"] for item in tracks if item["track"]["id"] is not None
    ]
    audio_features = get_audio_features(track_ids)

    audio_features_df = pd.DataFrame(audio_features)

    if not audio_features_df.empty and set(features).issubset(
        audio_features_df.columns
    ):
        user_liked_songs = audio_features_df[features].values
        k = st.number_input(
            "Number of Recommendations", min_value=1, max_value=20, value=5
        )

        if st.button("Recommend"):
            recommended_songs = recommend_songs(
                data, loaded_scaler, user_liked_songs, features, k
            )
            st.write("Recommended Songs:")
            st.dataframe(recommended_songs)
    else:
        st.error(
            "The playlist does not contain enough audio features to make recommendations."
        )
