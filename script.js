// ===== API KEYS =====
const TMDB_KEY = "24a398c27de171fa494d537cd2343141";
const OMDB_KEY = "37aba0ed";

// ===== BASE URLS =====
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

// ===== DOM =====
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");
const trendingList = document.getElementById("trendingList");

// Search button click
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) searchMedia(query);
});

async function searchMedia(query) {
  resultDiv.classList.add("hidden");

  const url = `${TMDB_BASE}/search/multi?api_key=${TMDB_KEY}&query=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results.length) {
    resultDiv.innerHTML = "<p>No results found</p>";
    resultDiv.classList.remove("hidden");
    return;
  }

  // Pick best match
  const media = data.results.find(
    item => item.media_type === "movie" || item.media_type === "tv"
  );

  if (!media) return;

  if (media.media_type === "movie") {
    fetchMovieDetails(media.id);
  } else {
    fetchTvDetails(media.id);
  }
}

async function fetchMovieDetails(id) {
  const url = `${TMDB_BASE}/movie/${id}?api_key=${TMDB_KEY}`;
  const res = await fetch(url);
  const movie = await res.json();

  // Get IMDb & RT ratings
  const imdbID = movie.imdb_id;
  const ratingRes = await fetch(
    `https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_KEY}`
  );
  const ratings = await ratingRes.json();

  displayResult({
    type: "Movie",
    title: movie.title,
    year: movie.release_date?.split("-")[0],
    poster: IMG_BASE + movie.poster_path,
    runtime: movie.runtime,
    imdb: ratings.imdbRating,
    rt: ratings.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value
  });
}

async function fetchTvDetails(id) {
  const url = `${TMDB_BASE}/tv/${id}?api_key=${TMDB_KEY}`;
  const res = await fetch(url);
  const tv = await res.json();

  let totalMinutes = 0;

  tv.seasons.forEach(season => {
    totalMinutes += season.episode_count * (tv.episode_run_time[0] || 45);
  });

  displayResult({
    type: "TV Series",
    title: tv.name,
    year: tv.first_air_date?.split("-")[0],
    poster: IMG_BASE + tv.poster_path,
    runtime: totalMinutes,
    imdb: "—",
    rt: "—"
  });
}

function displayResult(data) {
  const hours = Math.floor(data.runtime / 60);
  const minutes = data.runtime % 60;

  resultDiv.innerHTML = `
    <h2>${data.title} (${data.year})</h2>
    <img src="${data.poster}" width="200" />
    <p>Type: ${data.type}</p>
    <p>IMDb ⭐ ${data.imdb}</p>
    <p>Rotten 🍅 ${data.rt}</p>
    <h3>⏱ Total Watch Time</h3>
    <p>${hours}h ${minutes}m</p>
  `;

  resultDiv.classList.remove("hidden");
}

async function loadTrending() {
  const url = `${TMDB_BASE}/trending/tv/day?api_key=${TMDB_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  trendingList.innerHTML = "";

  data.results.slice(0, 6).forEach(show => {
    const img = document.createElement("img");
    img.src = IMG_BASE + show.poster_path;
    img.title = show.name;
    trendingList.appendChild(img);
  });
}

loadTrending();
