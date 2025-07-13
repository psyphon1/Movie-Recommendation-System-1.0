
# 🎬 Movie Recommendation System 1.0

> *Built for true movie lovers who want recs with real taste—not random guesses.*

---

## 🔍 What It Does

This Jupyter Notebook-powered app recommends movies based on **content-based filtering**. You give it a movie title, it gives you 10 similar movies using NLP and cosine similarity. Simple, smart, and seriously effective.

---

## 💡 How It Works

It uses:

- **Pandas & NumPy** for data wrangling  
- **TfidfVectorizer** for turning movie metadata into vectorized features  
- **Cosine Similarity** to compare feature vectors  
- **difflib** for smart matching even when user typos hit

The system combines genres, keywords, tagline, cast, and director into a single feature string and computes similarity across all entries.

---

## 🛠️ Tech Stack

- Python  
- Jupyter Notebook  
- pandas, numpy  
- scikit-learn  
- difflib  
- CSV dataset (movies.csv)

---

## 🚀 How To Run It

1. **Clone the repo**
   bash
   git clone https://github.com/psyphon1/Movie-Recommendation-System-1.0.git
   cd Movie-Recommendation-System-1.0


2. **Install dependencies**

   
   pip install -r requirements.txt


3. **Launch Jupyter Notebook**


4. **Open `main.ipynb` (or the provided `.ipynb` file) and run all cells.**

5. **When prompted, input a movie title**

   ```bash
   Enter Movie Name: Inception
   ```

   It will print a list of 5 similar movie titles.

---

## ✨ Example Output

If you input:

```
Enter Movie Name: Interstellar
```

You might get:

```
1. Gravity  
2. The Martian  
3. Contact  
4. Ad Astra  
5. 2001: A Space Odyssey
```

(Depending on the content in `movies.csv`)

---

## ⚠️ Note

Make sure the file `movies.csv` exists in the root directory and includes the required columns:
`title`, `genres`, `keywords`, `tagline`, `cast`, `director`

---

## 📄 License

MIT License. Fork it. Remix it. Use it. Just don't resell it without flipping the code.

---

## 🙌 Created by [psyphon1](https://github.com/psyphon1)

This is version 1.0. Future versions might bring UI with Streamlit or Flask and advanced hybrid recommendation models.

---

*Made with code, caffeine & cosmic movie vibes ☕🚀*
