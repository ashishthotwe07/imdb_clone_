// Wait for the HTML document to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // Your OMDB API key for accessing movie data
    const apiKey = "4b63188e";

    // Function to display detailed information about a movie
    function displayMovieDetails(id) {
        // Fetch movie details by id using the OMDB API
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
            .then(response => response.json()) // Convert the response to JSON
            .then(movieData => {
                // Access the container for displaying movie details
                const movieContainer = document.querySelector('.movie-detail-container');

                // Create a new element to hold the movie details
                const moviecard_ = document.createElement('div');
                moviecard_.classList.add('movieDetail');

                // Construct the HTML for displaying movie details
                moviecard_.innerHTML = `
                    <div class="head d-flex justify-content-between">
                        <div class="movieName">
                            <h3>${movieData.Title}</h3>
                            <p>${movieData.Runtime}</p>
                        </div>
                        <div class="movieRating">
                            <h4><a href="index.html"><i class="fa-solid fa-arrow-left"></i> Go Back</a></h4>
                        </div>
                    </div>
                    <div class="movieInfo d-flex">
                        <div class="right-side-poster">
                            <div class="Movie-poster">
                                <img src="${movieData.Poster !== 'N/A' ? movieData.Poster : 'default-poster.png'}">
                            </div>
                            <h4>${movieData.Type}</h4>
                        </div>
                        <div class="left-side-info">
                            <p><span>PG Rated :</span> ${movieData.Rated}</p>
                            <p><span>IMDB Rating :</span> ${movieData.imdbRating}</p>
                            <p><span>Released :</span> ${movieData.Released}</p>
                            <p><span>Genre :</span> ${movieData.Genre}</p>
                            <p><span>Plot :</span> ${movieData.Plot}</p>
                            <p><span>Director :</span>  ${movieData.Director}</p>
                            <p><span>Writer :</span> ${movieData.Writer}</p>
                            <p><span>Cast :</span> ${movieData.Actors}</p>
                            <p><span>Collection :</span> ${movieData.BoxOffice}</p>
                            <p><span>Awards :</span> ${movieData.Awards}</p>
                            <p><span>Language :</span> ${movieData.Language}</p>
                        </div>
                    </div>`;

                // Append movie details to the container
                movieContainer.appendChild(moviecard_);
            })
            .catch(error => {
                // If there's an error, log it and display an error message
                console.error("Error fetching movie details:", error);
                const movieContainer = document.querySelector('.movie-detail-container');
                movieContainer.innerHTML = "Error fetching movie details.";
            });
    }

    // Extract the IMDb ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get("imdbID");

    // Check if an IMDb ID is present in the URL
    if (imdbID) {
        // Display the detailed information for the given IMDb ID
        displayMovieDetails(imdbID);
    } else {
        // If IMDb ID is missing, log an error
        console.error("IMDb ID not found in URL parameter.");
    }
});
