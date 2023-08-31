// API key for OMDB API
const apiKey = "4b63188e";

// Event handler on search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearchInput);

// Fetch movie suggestions from the OMDB API
async function fetchMovieSuggestions(searchTerm) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
        return (await response.json()).Search || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// Update the movie suggestion section with fetched data
function updateMovieSuggestions(suggestions) {
    const suggestionContainer = document.querySelector(".sugestionContainer");
    suggestionContainer.innerHTML = ""; // Clear previous suggestions
    if (suggestions.length === 0) {
        suggestionContainer.innerHTML = `
            <div class="default">
  
                <h1>No movie found.</h1>
            </div>`;
        return;
    }
    // Retrieve favorite movie IDs from Local Storage
    const favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovieIds')) || [];

    suggestions.forEach(movie => {
        const isFavorite = favoriteMovieIds.includes(movie.imdbID);

        // Create Movie cards for each movie suggestion
        const movieCardHTML = `
            <!-- Movie card -->
            <div class="movieCard" data-imdbid="${movie.imdbID}">
                <div class="movie-poster">
                    <a href='moviepage.html?imdbID=${movie.imdbID}'> <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'default-poster.png'}" alt="movie poster"></a>
                </div>
                <div class="movie-info">
                    <a href='moviepage.html?imdbID=${movie.imdbID}'><h6>${movie.Title}</h6></a>
                    <p>${movie.Year}</p>
                    <p><i class="fa-regular fa-star ${isFavorite ? 'fa-solid' : ''}" onclick="addToFavorites('${movie.imdbID}')"></i></p>
                </div>
            </div>
        `;

        suggestionContainer.innerHTML += movieCardHTML;
    });
}

// Handle user input in the search box
async function handleSearchInput() {
    // Get the search term
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim(); // Trim leading and trailing spaces

    if (searchTerm) {
        // Fetch suggestions and update suggestion container
        const suggestions = await fetchMovieSuggestions(searchTerm);
        updateMovieSuggestions(suggestions);

        // Store suggestions and last search term in Local Storage
        localStorage.setItem("movieSuggestions", JSON.stringify(suggestions));
        localStorage.setItem("lastSearchTerm", searchTerm);
    } else {
        // Clear suggestions and stored data when search term is empty
        const suggestionContainer = document.querySelector(".sugestionContainer");
        suggestionContainer.innerHTML = "";
        localStorage.removeItem("movieSuggestions");
        localStorage.removeItem("lastSearchTerm");
    }
}

// Add or remove a movie from favorites
function addToFavorites(id) {
    let star = document.querySelector(`[data-imdbid="${id}"] .fa-star`);
    
    if (star) {
        star.classList.toggle('fa-solid'); // Toggle the filled version class
        
        // Retrieve favorite movie IDs from Local Storage
        let favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovieIds')) || [];

        if (star.classList.contains('fa-solid')) {
            // Icon is now filled, so added to favorites
            alert('Added to Favorites');

            // Add the ID to the favoriteMovieIds array if not already present
            if (!favoriteMovieIds.includes(id)) {
                favoriteMovieIds.push(id);
            }
        } else {
            // Icon is now outline, so removed from favorites
            alert('Removed from Favorites');

            // Remove the ID from the favoriteMovieIds array
            favoriteMovieIds = favoriteMovieIds.filter(movieId => movieId !== id);
        }

        // Update the Local Storage with the new favoriteMovieIds array
        localStorage.setItem('favoriteMovieIds', JSON.stringify(favoriteMovieIds));
    }
}
