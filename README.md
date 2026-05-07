
# 🎬 Movie Recommendation System

> *AI-powered movie recommendations using RAG-enhanced content-based filtering. Built for true movie lovers who want smart recommendations based on intelligent pattern matching.*

---

## 👨‍💻 Developer

**[Chinmay Duse](https://github.com/psyphon1)** (psyphon1)  
📧 [LinkedIn](https://www.linkedin.com/in/chinmayduse)

---

## 📚 RAG Implementation & Learning

This project implements **Retrieval-Augmented Generation (RAG)** concepts as part of an AI learning journey on **13/07/2025**.

### RAG Application
- **Retrieval Layer**: TF-IDF vectorization and cosine similarity for semantic search
- **Augmentation Layer**: Content-based filtering using movie metadata (genres, keywords, cast, director)
- **Generation Layer**: Intelligent recommendations based on learned feature patterns

The RAG approach allows the system to:
1. **Retrieve** similar movies using semantic similarity scores
2. **Augment** recommendations with multi-feature analysis
3. **Generate** contextual movie suggestions based on user input

---

## 🔍 What It Does

This application recommends movies based on **intelligent content-based filtering** and **RAG principles**. You give it a movie title, and it gives you **10** similar movies using advanced NLP and machine learning. Simple, smart, and seriously effective.

---

## 💡 How It Works

### Algorithm
1. **Load** movie dataset with comprehensive metadata
2. **Process** features: genres, keywords, tagline, cast, director
3. **Vectorize** using TF-IDF (converts text to numerical features)
4. **Compute** cosine similarity between movies
5. **Retrieve** top 10 most similar recommendations
6. **Rank** by similarity score (0-100%)

### Technology
- **Pandas & NumPy** for data wrangling and numerical computing
- **TfidfVectorizer** for turning movie metadata into vectorized features
- **Cosine Similarity** for semantic comparison between feature vectors
- **difflib** for smart fuzzy matching (handles typos)

---

## 🛠️ Tech Stack

### Backend
- **Python 3.7+** - Core language
- **Flask 3.0.0** - Web framework
- **pandas 2.0.0** - Data processing
- **numpy 1.24.0** - Numerical computing
- **scikit-learn 1.2.0** - ML algorithms (TF-IDF, Cosine Similarity)

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with dark mode
- **JavaScript (ES6+)** - Interactive features
- **Font Awesome 6.4** - Icons
- **Google Fonts** - Typography

### Data
- **CSV dataset** with 5000+ movies
- Features: title, genres, keywords, tagline, cast, director, overview

### Deployment
- **Vercel** - Serverless deployment
- **GitHub** - Version control & hosting

---

## 🚀 Quick Start

### Local Development

1. **Clone the repo**  
   ```bash
   git clone https://github.com/psyphon1/Movie-Recommendation-System-1.0.git
   cd Movie-Recommendation-System-1.0
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask app**
   ```bash
   python app.py
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

5. **Search for a movie**
   - Type a movie name (e.g., "Inception")
   - Get 10 smart recommendations instantly!

### Jupyter Notebook (Original Method)

1. **Launch Jupyter Notebook**
   ```bash
   jupyter notebook
   ```

2. **Open `main.ipynb`** and run all cells

3. **When prompted, input a movie title**
   ```bash
   Enter Movie Name: Inception
   ```
   It will print a list of 10 similar movie titles.

---

## 📑 Notebook Structure

1. **Imports & Setup**

   * `pandas`, `numpy`, `sklearn.feature_extraction.text.TfidfVectorizer`, `sklearn.metrics.pairwise.cosine_similarity`, `difflib`
2. **Load Dataset**

   * `movies.csv` into a DataFrame
3. **Initial Exploration**

   * `movie_data.head()`
4. **Select Features**

   * `['genres','keywords','tagline','cast','director']`
5. **Combine Features**

   * Concatenate the selected columns into a single string per movie
6. **Vectorize**

   * Apply TF-IDF to the combined feature strings
7. **Compute Similarity Matrix**

   * Cosine similarity on TF-IDF vectors
8. **User Input & Matching**

   * Prompt for movie name, use `difflib.get_close_matches` to handle typos
9. **Generate Recommendations**

   * Sort similarity scores and print the top 10 matches

---

## ✨ Example Output

```
Enter Movie Name: Interstellar
1. Gravity  
2. The Martian  
3. Contact  
4. Ad Astra  
5. 2001: A Space Odyssey  
6. Solaris  
7. Moon  
8. Passengers  
9. The Fountain  
10. Europa Report
```

*(Actual titles depend on your `movies.csv` content.)*

---

## ⚠️ Note

Ensure that `movies.csv` exists in the repo root and includes these columns:
`title`, `genres`, `keywords`, `tagline`, `cast`, `director`.

---

## 📄 License

MIT License. Fork it. Remix it. Use it. Just don’t resell it without flipping the code.

---

## 🙌 Created by [psyphon1](https://github.com/psyphon1)

Version 1.0. Future releases may feature a Streamlit/Flask UI and hybrid recommendation models.

*Made with code, caffeine & cosmic movie vibes ☕🚀*

```
