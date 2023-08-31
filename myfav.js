// Fetch movie details using the provided ID
async function fetchMovieDetails(id) {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    return await response.json();
}

// Display favorite movies in the favorites container
async function displayFavoriteMovies() {
    const favContainer = document.querySelector('.fav-con');
    favContainer.innerHTML = ''; // Clear previous content

    // Retrieve stored movie IDs from Local Storage
    const favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovieIds')) || [];

    if (favoriteMovieIds.length === 0) {
        // Display a message if no favorite movies are stored
        const defaultHTML = `
            <div class="default">
                <i class="fa-regular fa-bookmark"></i>
                <h1>Nothing in Favorites</h1>
            </div>
        `;
        favContainer.innerHTML = defaultHTML;
    } else {
        // Loop through each favorite movie ID and fetch its details
        for (const id of favoriteMovieIds) {
            const movieData = await fetchMovieDetails(id);

            // Create a card for the favorite movie
            const movieCardHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                    <a href='moviepage.html?imdbID=${id}'><img src="${movieData.Poster !== 'N/A' ? movieData.Poster : 'default-poster.png'}" class="card-img-top" alt="${movieData.Title} Poster"></a>
                        <div class="card-body">
                          <a href='moviepage.html?imdbID=${id}' style="color:Black">  <h5 class="card-title">${movieData.Title}</h5></a>
                            <p class="card-text">${movieData.Year}</p>
                            <a href="#" class="btn btn-dark" onclick="removeFromFavorites('${id}')">Remove from Favorites</a>
                        </div>
                    </div>
                </div>
            `;
            favContainer.innerHTML += movieCardHTML;
        }
    }
}

// Initial display of favorite movies when the page loads
displayFavoriteMovies();

// Remove a movie from favorites
function removeFromFavorites(id) {
    let favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovieIds')) || [];

    // Remove the ID from the favoriteMovieIds array
    favoriteMovieIds = favoriteMovieIds.filter(movieId => movieId !== id);
    alert("removed from favorite");
    // Update the Local Storage with the updated favoriteMovieIds array
    localStorage.setItem('favoriteMovieIds', JSON.stringify(favoriteMovieIds));

    // Refresh the displayed favorite movies
    displayFavoriteMovies();
}
