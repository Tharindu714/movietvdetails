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
  const avgRuntime = tv.episode_run_time[0] || 45;

  tv.seasons.forEach(season => {
    totalMinutes += season.episode_count * avgRuntime;
  });

  displayResult({
    type: "TV Series",
    title: tv.name,
    year: tv.first_air_date?.split("-")[0],
    poster: IMG_BASE + tv.poster_path,
    runtime: totalMinutes,
    imdb: "N/A",
    rt: "N/A",
    tmdbRating: tv.vote_average
  });
}


function displayResult(data) {
  const hours = Math.floor(data.runtime / 60);
  const minutes = data.runtime % 60;

  resultDiv.innerHTML = `
    <img src="${data.poster}" alt="${data.title}" />

    <div class="result-details">
      <h1>${data.title} <span>(${data.year})</span></h1>

      <div class="watch-time">
        ⏱ ${hours}h ${minutes}m
      </div>

      <div class="ratings">
        <span>IMDb ⭐ ${data.imdb}</span>
        <span>Rotten 🍅 ${data.rt}</span>
        ${data.tmdbRating ? `<span>TMDB ⭐ ${data.tmdbRating}/10</span>` : ""}
      </div>
    </div>
  `;

  resultDiv.classList.remove("hidden");
  resultDiv.scrollIntoView({ behavior: "smooth" });
}


async function loadTrending() {
  const url = `${TMDB_BASE}/trending/tv/day?api_key=${TMDB_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  trendingList.innerHTML = "";

  data.results.slice(0, 10).forEach(show => {
    const img = document.createElement("img");
    img.src = IMG_BASE + show.poster_path;
    img.title = show.name;
    trendingList.appendChild(img);
  });
}

loadTrending();
