
# 🎬 Movie Recommendation System 1.0

> *Built for true movie lovers who want recs with real taste—not random guesses.*

---

## 🔍 What It Does

This Jupyter Notebook–powered app recommends movies based on **content-based filtering**. You give it a movie title, it gives you **10** similar movies using NLP and cosine similarity. Simple, smart, and seriously effective.

---

## 💡 How It Works

It uses:

- **Pandas & NumPy** for data wrangling  
- **TfidfVectorizer** for turning movie metadata into vectorized features  
- **Cosine Similarity** to compare feature vectors  
- **difflib** for smart matching even when user typos hit  

The system combines `genres`, `keywords`, `tagline`, `cast`, and `director` into a single feature string and computes similarity across all entries.

---

## 🛠️ Tech Stack

- **Python**  
- **Jupyter Notebook**  
- **pandas**, **numpy**, **scikit-learn**, **difflib**  
- **CSV dataset** (`movies.csv`)

---

## 🚀 How To Run It

1. **Clone the repo**  
   ```bash
   git clone https://github.com/psyphon1/Movie-Recommendation-System-1.0.git
   cd Movie-Recommendation-System-1.0
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```
3. **Launch Jupyter Notebook**

   ```bash
   jupyter notebook
   ```
4. **Open `main.ipynb`** (or your uploaded `.ipynb`) and run all cells.
5. **When prompted, input a movie title**

   ```bash
   Enter Movie Name: Inception
   ```

   It will print a list of **10** similar movie titles.

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
