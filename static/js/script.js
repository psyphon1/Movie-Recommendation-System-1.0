// DOM Elements
const movieInput = document.getElementById('movieInput');
const searchBtn = document.getElementById('searchBtn');
const autocompleteList = document.getElementById('autocomplete-list');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const recommendationsSection = document.getElementById('recommendationsSection');
const recommendationsGrid = document.getElementById('recommendationsGrid');
const searchedMovieInfo = document.getElementById('searchedMovieInfo');
const searchedMovieTitle = document.getElementById('searchedMovieTitle');
const themeToggle = document.getElementById('themeToggle');
const movieModal = document.getElementById('movieModal');
const modalClose = document.querySelector('.modal-close');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Load saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark-mode');
}
updateThemeIcon();

// Autocomplete functionality
movieInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    
    if (query.length < 2) {
        autocompleteList.classList.remove('active');
        return;
    }

    try {
        const response = await fetch(`/api/movies?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.movies.length > 0) {
            autocompleteList.innerHTML = data.movies
                .map(movie => `<div class="autocomplete-item">${movie}</div>`)
                .join('');
            autocompleteList.classList.add('active');
            
            // Add click handlers to autocomplete items
            document.querySelectorAll('.autocomplete-item').forEach(item => {
                item.addEventListener('click', () => {
                    movieInput.value = item.textContent;
                    autocompleteList.classList.remove('active');
                    searchMovies();
                });
            });
        } else {
            autocompleteList.classList.remove('active');
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
});

// Close autocomplete when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.matches('.search-input')) {
        autocompleteList.classList.remove('active');
    }
});

// Close autocomplete on Escape
movieInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        autocompleteList.classList.remove('active');
    }
});

// Search functionality
searchBtn.addEventListener('click', searchMovies);
movieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

async function searchMovies() {
    const movieName = movieInput.value.trim();
    
    if (!movieName) {
        showError('Please enter a movie name');
        return;
    }

    // Close autocomplete
    autocompleteList.classList.remove('active');
    
    // Show loading
    loadingSpinner.style.display = 'flex';
    hideError();

    try {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movie_name: movieName })
        });

        const data = await response.json();

        if (response.ok) {
            displayRecommendations(data.searched_movie, data.recommendations);
            loadingSpinner.style.display = 'none';
            
            // Scroll to results
            setTimeout(() => {
                recommendationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            showError(data.error || 'An error occurred');
            loadingSpinner.style.display = 'none';
        }
    } catch (error) {
        showError('Failed to fetch recommendations. Please try again.');
        loadingSpinner.style.display = 'none';
        console.error('Error:', error);
    }
}

function displayRecommendations(searchedMovie, recommendations) {
    // Update searched movie info
    searchedMovieTitle.textContent = searchedMovie;
    searchedMovieInfo.style.display = 'block';

    // Clear grid
    recommendationsGrid.innerHTML = '';

    // Create movie cards
    recommendations.forEach((movie) => {
        const card = createMovieCard(movie);
        recommendationsGrid.appendChild(card);
    });

    // Show recommendations section
    recommendationsSection.style.display = 'block';
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Calculate percentage for score
    const scorePercentage = (movie.score * 100).toFixed(1);

    card.innerHTML = `
        <div class="movie-card-header">
            <div class="movie-card-title">${escapeHtml(movie.title)}</div>
        </div>
        <div class="movie-card-body">
            <div class="movie-score">
                <span class="score-label">Similarity</span>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${scorePercentage}%"></div>
                </div>
                <span class="score-value">${(movie.score * 100).toFixed(0)}%</span>
            </div>

            ${movie.genres ? `
            <div class="movie-info">
                <div class="info-label">Genres</div>
                <div class="info-value">${escapeHtml(movie.genres)}</div>
            </div>
            ` : ''}

            ${movie.director ? `
            <div class="movie-info">
                <div class="info-label">Director</div>
                <div class="info-value">${escapeHtml(movie.director)}</div>
            </div>
            ` : ''}

            ${movie.cast ? `
            <div class="movie-info">
                <div class="info-label">Cast</div>
                <div class="info-value">${escapeHtml(movie.cast)}</div>
            </div>
            ` : ''}

            <button class="view-details-btn" onclick="showMovieDetails('${escapeHtml(movie.title)}')">
                <i class="fas fa-info-circle"></i> View Details
            </button>
        </div>
    `;

    return card;
}

async function showMovieDetails(movieTitle) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieTitle)}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalGenres').textContent = data.genres || 'N/A';
            document.getElementById('modalDirector').textContent = data.director || 'N/A';
            document.getElementById('modalCast').textContent = data.cast || 'N/A';
            document.getElementById('modalTagline').textContent = data.tagline || 'N/A';
            document.getElementById('modalOverview').textContent = data.overview || 'N/A';

            movieModal.style.display = 'flex';
        } else {
            showError('Could not load movie details');
        }
    } catch (error) {
        showError('Error loading movie details');
        console.error('Error:', error);
    }
}

// Modal close handlers
modalClose.addEventListener('click', () => {
    movieModal.style.display = 'none';
});

movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) {
        movieModal.style.display = 'none';
    }
});

// Error message handlers
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    errorMessage.style.display = 'none';
}

document.querySelector('.close-error').addEventListener('click', hideError);

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text ? text.replace(/[&<>"']/g, m => map[m]) : '';
}

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// Initial focus on search input
movieInput.focus();
