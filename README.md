# 🎬⏱️ RunTimeX

**RunTimeX** is a futuristic, static web application that helps users instantly understand **how much time they need to invest** before starting a movie or TV series. With a single search — no login, no signup — users get total watch time, ratings, and trending recommendations in a premium, cinema-inspired interface.

---

## 🚀 Why RunTimeX?

In today’s streaming-heavy world, time is the most valuable currency.
RunTimeX answers a simple but powerful question:

> **“How many hours will this story take from my life?”**

Whether it’s a 2-hour movie or a 9-season TV series, RunTimeX gives you clarity *before* you press play.

---

## ✨ Key Features

* 🔍 **Instant Search** – Search any movie or TV series without logging in
* ⏱ **Total Watch Time Calculation**

  * Movies → exact runtime
  * TV Series → seasons × episodes × runtime
* 🎬 **Official Posters & Metadata**
* ⭐ **Ratings Overview**

  * IMDb & Rotten Tomatoes (Movies)
  * TMDB Community Rating (TV Series)
* 🔥 **Trending TV Shows** – Top 10 trending series from the last 3 days
* 📱 **Fully Responsive** – Optimized for desktop and mobile
* 🌌 **Premium Cinematic UI** – Futuristic animations and dark theater-style design
* ⚡ **100% Static** – No backend, no database

---

## 🧠 How It Works (Architecture)

RunTimeX does **not store any data locally**. All information is fetched in real time using public APIs.

```
User Search
   ↓
TMDB API (Search, Posters, Seasons, Episodes)
   ↓
OMDb API (IMDb & Rotten Tomatoes for Movies)
   ↓
Runtime Calculation (Client-side JavaScript)
   ↓
Cinematic UI Output
```

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3 (Futuristic animations, glassmorphism, responsive design)
* Vanilla JavaScript (ES6+)

### APIs

* **TMDB API** – Movies, TV shows, posters, trending data
* **OMDb API** – IMDb & Rotten Tomatoes ratings (movies)

### Hosting (Recommended)

* GitHub Pages
* Netlify
* Vercel

---

## 🎨 Design Philosophy

* 🎥 Inspired by movie theater dashboards and sci‑fi HUDs
* 🌑 Premium dark theme with cinematic background
* 💡 Subtle animations (GPU-friendly, no performance impact)
* 🎯 Watch time is the primary visual focus

---

## 📸 Screens & UI Highlights

* Hero result card for searched titles
* Large, glowing watch-time display
* Clean separation between spotlight result and trending content
* Mobile-first alignment fixes for real-world usability

---

## ⚠️ Limitations & Notes

* Rotten Tomatoes ratings are **not publicly available for most TV series** via free APIs
* API keys are exposed in client-side JavaScript (acceptable for demo/academic projects)
* Not intended for commercial production without a backend proxy

---

## 📦 Setup & Usage

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/RunTimeX.git
   ```

2. Open `script.js` and add your API keys:

   ```js
   const TMDB_KEY = "YOUR_TMDB_API_KEY";
   const OMDB_KEY = "YOUR_OMDB_API_KEY";
   ```

3. Open `index.html` in your browser

That’s it. No build tools. No installations.

---

## 🎯 Future Enhancements

* 🤖 AI-powered binge planning ("Finish in X days")
* 🎬 Dynamic background based on searched title
* 📊 Watch-time comparison between shows
* 🔊 Subtle sound or haptic-style UI feedback
* 🧩 Progressive Web App (PWA) support

---

## 👨‍💻 Author

**Tharindu Chanaka**
Software Developer | UI/UX Enthusiast | IoT & Web Innovator

---

## ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Share feedback or suggestions
* Use it as inspiration for your own creative builds

---

**🎬⏱️ RunTimeX — Know the hours behind the hype.**

