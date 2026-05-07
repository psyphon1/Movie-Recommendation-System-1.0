import os
from datetime import datetime

# Flask Configuration
class Config:
    """Base configuration"""
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Dataset configuration
    DATASET_PATH = 'movies.csv'
    
    # Recommendation settings
    RECOMMENDATIONS_COUNT = 10
    AUTOCOMPLETE_LIMIT = 10
    
    # TF-IDF settings
    TFIDF_MAX_FEATURES = 5000
    TFIDF_STOP_WORDS = 'english'
    
    # Fuzzy matching
    FUZZY_MATCH_CUTOFF = 0.6

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    # In production, use environment variables for security
    SECRET_KEY = os.environ.get('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError("No SECRET_KEY set for Flask application")

class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    DATASET_PATH = 'test_movies.csv'

# Feature flags
FEATURES = {
    'dark_mode': True,
    'autocomplete': True,
    'similarity_scores': True,
    'movie_details_modal': True,
    'theme_persistence': True,
}

# UI Customization
UI_CONFIG = {
    'primary_color': '#6366f1',
    'secondary_color': '#ec4899',
    'accent_color': '#f59e0b',
    'app_name': 'MovieMatch',
    'app_tagline': 'Find Your Next Favorite Movie',
    'cards_per_row': 'auto-fill',
    'card_min_width': '280px',
    'animation_duration': '0.3s',
}

# Page Configuration
PAGE_CONFIG = {
    'title': '🎬 MovieMatch - AI-Powered Movie Recommendations',
    'description': 'Discover movies that match your taste with AI-powered recommendations',
    'keywords': 'movies, recommendations, AI, movie search, cinema',
    'author': 'MovieMatch Team',
}

# Feature limits
LIMITS = {
    'max_recommendations': 10,
    'min_search_length': 2,
    'autocomplete_items': 10,
    'similarity_min_threshold': 0.1,
}

# Select features for recommendation (modify to add/remove features)
RECOMMENDATION_FEATURES = [
    'genres',
    'keywords',
    'tagline',
    'cast',
    'director'
]

def get_config():
    """Get configuration based on environment"""
    env = os.environ.get('FLASK_ENV', 'development')
    
    if env == 'production':
        return ProductionConfig()
    elif env == 'testing':
        return TestingConfig()
    else:
        return DevelopmentConfig()
