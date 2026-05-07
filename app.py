from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure Flask app
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['ENV'] = os.environ.get('FLASK_ENV', 'development')
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', False)

# Load and prepare data
csv_path = os.path.join(os.path.dirname(__file__), 'movies.csv')
try:
    movie_data = pd.read_csv(csv_path)
    movie_data = movie_data.drop_duplicates().reset_index(drop=True)
except FileNotFoundError:
    print(f"Error: movies.csv not found at {csv_path}")
    movie_data = pd.DataFrame()
except Exception as e:
    print(f"Error loading CSV: {e}")
    movie_data = pd.DataFrame()

# Select features for recommendation
selected_features = ['genres', 'keywords', 'tagline', 'cast', 'director']

# Fill NaN values
for feature in selected_features:
    movie_data[feature] = movie_data[feature].fillna('')

# Create combined features
combined_features = (movie_data['genres'] + ' ' + 
                    movie_data['keywords'] + ' ' + 
                    movie_data['tagline'] + ' ' + 
                    movie_data['cast'] + ' ' + 
                    movie_data['director'])

# Vectorize and compute similarity
vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
feature_vectors = vectorizer.fit_transform(combined_features)
similarity = cosine_similarity(feature_vectors)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/movies', methods=['GET'])
def get_movies():
    """Get all available movies for autocomplete"""
    query = request.args.get('q', '').lower()
    movies = movie_data['title'].tolist()
    
    if query:
        filtered = [m for m in movies if query in m.lower()][:10]
    else:
        filtered = movies[:20]
    
    return jsonify({'movies': filtered})

@app.route('/api/recommend', methods=['POST'])
def recommend():
    """Get movie recommendations based on input"""
    try:
        data = request.json
        movie_name = data.get('movie_name', '').strip()
        
        if not movie_name:
            return jsonify({'error': 'Please enter a movie name'}), 400
        
        # Get close match
        list_of_all_titles = movie_data['title'].tolist()
        close_matches = difflib.get_close_matches(movie_name, list_of_all_titles, n=1, cutoff=0.6)
        
        if not close_matches:
            return jsonify({'error': 'Movie not found in database'}), 404
        
        close_match = close_matches[0]
        index_of_movie = movie_data[movie_data['title'] == close_match].index[0]
        
        # Get similarity scores
        similarity_score = list(enumerate(similarity[index_of_movie]))
        sorted_similarity_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)
        
        # Get top 10 recommendations (excluding the movie itself)
        recommendations = []
        count = 0
        for idx, score in sorted_similarity_movies:
            if count >= 11:
                break
            if idx != index_of_movie:
                row = movie_data.iloc[idx]
                recommendations.append({
                    'title': row.get('title', 'N/A'),
                    'genres': row.get('genres', 'N/A'),
                    'score': float(score),
                    'cast': row.get('cast', 'N/A')[:100] + '...' if len(str(row.get('cast', 'N/A'))) > 100 else row.get('cast', 'N/A'),
                    'director': row.get('director', 'N/A'),
                    'overview': row.get('overview', 'N/A')[:200] if 'overview' in row else 'N/A'
                })
                count += 1
        
        return jsonify({
            'searched_movie': close_match,
            'recommendations': recommendations[:10]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/movie/<movie_title>', methods=['GET'])
def get_movie_details(movie_title):
    """Get detailed information about a specific movie"""
    try:
        movie = movie_data[movie_data['title'] == movie_title].iloc[0]
        return jsonify({
            'title': movie.get('title', 'N/A'),
            'genres': movie.get('genres', 'N/A'),
            'cast': movie.get('cast', 'N/A'),
            'director': movie.get('director', 'N/A'),
            'tagline': movie.get('tagline', 'N/A'),
            'overview': movie.get('overview', 'N/A'),
            'keywords': movie.get('keywords', 'N/A')
        })
    except:
        return jsonify({'error': 'Movie not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
