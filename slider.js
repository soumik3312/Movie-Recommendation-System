// Main JavaScript functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeSliders();
    initializeCategoryTabs();
    setupViewAllLinks();
    setupSearchFunctionality();
    setupMainNavigation();
});

// ===== SLIDER FUNCTIONALITY =====
function initializeSliders() {
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(container => {
        const slider = container.querySelector('.slider');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        
        let scrollAmount = 0;
        const slideWidth = 220; // Width of movie card + margin
        
        nextBtn.addEventListener('click', () => {
            scrollAmount += slideWidth * 3;
            if (scrollAmount > slider.scrollWidth - slider.clientWidth) {
                scrollAmount = slider.scrollWidth - slider.clientWidth;
            }
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        prevBtn.addEventListener('click', () => {
            scrollAmount -= slideWidth * 3;
            if (scrollAmount < 0) {
                scrollAmount = 0;
            }
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });
}

// ===== CATEGORY TABS FUNCTIONALITY =====
function initializeCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const movieCards = document.querySelectorAll('.category-content .movie-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show/hide movie cards based on category
            const category = tab.getAttribute('data-category');
            
            movieCards.forEach(card => {
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== VIEW ALL FUNCTIONALITY =====
function setupViewAllLinks() {
    // Recently Released View All
    const viewAllRecent = document.getElementById('view-all-recent');
    const recentViewAllPage = document.getElementById('recent-view-all');
    const backFromRecent = document.getElementById('back-from-recent');
    
    viewAllRecent.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('main').style.display = 'none';
        recentViewAllPage.style.display = 'block';
    });
    
    backFromRecent.addEventListener('click', () => {
        recentViewAllPage.style.display = 'none';
        document.querySelector('main').style.display = 'block';
    });
    
    // Trending View All
    const viewAllTrending = document.getElementById('view-all-trending');
    const trendingViewAllPage = document.getElementById('trending-view-all');
    const backFromTrending = document.getElementById('back-from-trending');
    
    viewAllTrending.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('main').style.display = 'none';
        trendingViewAllPage.style.display = 'block';
    });
    
    backFromTrending.addEventListener('click', () => {
        trendingViewAllPage.style.display = 'none';
        document.querySelector('main').style.display = 'block';
    });
    
    // Recommended View All
    const viewAllRecommended = document.getElementById('view-all-recommended');
    const recommendedViewAllPage = document.getElementById('recommended-view-all');
    const backFromRecommended = document.getElementById('back-from-recommended');
    
    viewAllRecommended.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('main').style.display = 'none';
        recommendedViewAllPage.style.display = 'block';
    });
    
    backFromRecommended.addEventListener('click', () => {
        recommendedViewAllPage.style.display = 'none';
        document.querySelector('main').style.display = 'block';
    });
    
    // Categories View All
    const viewAllCategories = document.getElementById('view-all-categories');
    viewAllCategories.addEventListener('click', e => {
        e.preventDefault();
        // Scroll to categories section
        document.getElementById('categories-section').scrollIntoView({ behavior: 'smooth' });
    });
}

// ===== SEARCH FUNCTIONALITY =====
function setupSearchFunctionality() {
    // Create movie database for search (adding more movies as requested)
    const movieDatabase = [
        // Recently Released
        { title: "Kalki 2898 AD", year: "2024", category: "Bollywood", rating: "8.7" },
        { title: "Oppenheimer", year: "2023", category: "Hollywood", rating: "8.9" },
        { title: "Salaar", year: "2023", category: "Tollywood", rating: "8.5" },
        { title: "Joker: Folie à Deux", year: "2024", category: "Hollywood", rating: "7.9" },
        { title: "Animal", year: "2023", category: "Bollywood", rating: "8.2" },
        { title: "Deadpool & Wolverine", year: "2024", category: "Hollywood", rating: "8.6" },
        { title: "Twisters", year: "2024", category: "Hollywood", rating: "7.4" },
        { title: "Furiosa: A Mad Max Saga", year: "2024", category: "Hollywood", rating: "8.2" },
        { title: "Stree 2", year: "2024", category: "Bollywood", rating: "8.0" },
        { title: "Shaitaan", year: "2024", category: "Bollywood", rating: "7.3" },
        { title: "Devara", year: "2024", category: "Tollywood", rating: "7.8" },
        
        // Trending
        { title: "Jawan", year: "2023", category: "Bollywood", rating: "7.9" },
        { title: "Barbie", year: "2023", category: "Hollywood", rating: "7.3" },
        { title: "Pushpa", year: "2021", category: "Tollywood", rating: "7.6" },
        { title: "Avatar: The Way of Water", year: "2022", category: "Hollywood", rating: "7.7" },
        { title: "Pathaan", year: "2023", category: "Bollywood", rating: "7.1" },
        { title: "RRR", year: "2022", category: "Tollywood", rating: "8.0" },
        { title: "Inside Out 2", year: "2024", category: "Hollywood", rating: "8.4" },
        { title: "Godzilla x Kong", year: "2024", category: "Hollywood", rating: "7.3" },
        { title: "Fighter", year: "2024", category: "Bollywood", rating: "7.4" },
        { title: "The Batman", year: "2022", category: "Hollywood", rating: "7.8" },
        { title: "KGF: Chapter 2", year: "2022", category: "Tollywood", rating: "8.3" },
        { title: "Tu Jhoothi Main Makkaar", year: "2023", category: "Bollywood", rating: "6.5" },
        
        // Recommended/Classics
        { title: "The Godfather", year: "1972", category: "Hollywood", rating: "9.2" },
        { title: "Lagaan", year: "2001", category: "Bollywood", rating: "8.1" },
        { title: "Pulp Fiction", year: "1994", category: "Hollywood", rating: "8.9" },
        { title: "Bahubali: The Beginning", year: "2015", category: "Tollywood", rating: "8.1" },
        { title: "The Shawshank Redemption", year: "1994", category: "Hollywood", rating: "9.3" },
        { title: "3 Idiots", year: "2009", category: "Bollywood", rating: "8.4" },
        
        // Categories
        { title: "The Departed", year: "2006", category: "Hollywood", rating: "8.5" },
        { title: "Inception", year: "2010", category: "Hollywood", rating: "8.8" },
        { title: "The Dark Knight", year: "2008", category: "Hollywood", rating: "9.0" },
        { title: "Interstellar", year: "2014", category: "Hollywood", rating: "8.6" },
        { title: "Dangal", year: "2016", category: "Bollywood", rating: "8.4" },
        { title: "PK", year: "2014", category: "Bollywood", rating: "8.1" },
        { title: "Bajrangi Bhaijaan", year: "2015", category: "Bollywood", rating: "8.0" },
        { title: "Queen", year: "2014", category: "Bollywood", rating: "8.2" },
        { title: "Bahubali: The Conclusion", year: "2017", category: "Tollywood", rating: "8.2" },
        { title: "KGF: Chapter 1", year: "2018", category: "Tollywood", rating: "8.3" },
        { title: "Arjun Reddy", year: "2017", category: "Tollywood", rating: "8.1" },
        { title: "Rangasthalam", year: "2018", category: "Tollywood", rating: "8.4" },
        
        // Additional Movies
        { title: "Goodfellas", year: "1990", category: "Hollywood", rating: "8.7" },
        { title: "The Matrix", year: "1999", category: "Hollywood", rating: "8.7" },
        { title: "Parasite", year: "2019", category: "International", rating: "8.5" },
        { title: "Gangs of Wasseypur", year: "2012", category: "Bollywood", rating: "8.2" },
        { title: "Andhadhun", year: "2018", category: "Bollywood", rating: "8.2" },
        { title: "Tumbbad", year: "2018", category: "Bollywood", rating: "8.3" },
        { title: "Kantara", year: "2022", category: "Tollywood", rating: "8.0" },
        { title: "Super Deluxe", year: "2019", category: "Tollywood", rating: "8.4" },
        { title: "Vikram", year: "2022", category: "Tollywood", rating: "8.3" },
        { title: "Whiplash", year: "2014", category: "Hollywood", rating: "8.5" },
        { title: "Fight Club", year: "1999", category: "Hollywood", rating: "8.8" },
        { title: "Gladiator", year: "2000", category: "Hollywood", rating: "8.5" }
    ];
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const mainContent = document.querySelector('main');
    
    searchInput.addEventListener('focus', () => {
        document.querySelector('.search-overlay').style.display = 'block';
    });
    
    document.querySelector('.close-search').addEventListener('click', () => {
        document.querySelector('.search-overlay').style.display = 'none';
        searchResults.innerHTML = '';
        searchInput.value = '';
    });
    
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        if (searchTerm.length < 2) return;
        
        // Filter movies based on search term
        const filteredMovies = movieDatabase.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) || 
            movie.category.toLowerCase().includes(searchTerm)
        );
        
        // Display results
        if (filteredMovies.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No movies found matching your search.</div>';
        } else {
            filteredMovies.slice(0, 8).forEach(movie => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="result-image">
                        <img src="/api/placeholder/60/90" alt="${movie.title}">
                    </div>
                    <div class="result-info">
                        <div class="result-title">${movie.title}</div>
                        <div class="result-details">
                            <span>${movie.year}</span>
                            <span class="result-category">${movie.category}</span>
                            <span class="result-rating">${movie.rating}/10</span>
                        </div>
                    </div>
                `;
                
                resultItem.addEventListener('click', () => {
                    showMovieDetails(movie);
                });
                
                searchResults.appendChild(resultItem);
            });
            
            if (filteredMovies.length > 8) {
                const viewMore = document.createElement('div');
                viewMore.className = 'view-more-results';
                viewMore.textContent = `View all ${filteredMovies.length} results`;
                searchResults.appendChild(viewMore);
            }
        }
    });
    
    function showMovieDetails(movie) {
        // Hide search overlay
        document.querySelector('.search-overlay').style.display = 'none';
        searchResults.innerHTML = '';
        searchInput.value = '';
        
        // Create a movie details page
        const movieDetailsPage = document.createElement('div');
        movieDetailsPage.className = 'movie-details-page';
        movieDetailsPage.innerHTML = `
            <div class="back-button"><i class="fas fa-arrow-left"></i> Back</div>
            <div class="movie-details-container">
                <div class="movie-poster">
                    <img src="/api/placeholder/300/450" alt="${movie.title}">
                </div>
                <div class="movie-info-expanded">
                    <h1>${movie.title}</h1>
                    <div class="movie-meta">
                        <span>${movie.year}</span>
                        <span class="category-badge">${movie.category}</span>
                        <span class="rating-large">${movie.rating}/10</span>
                    </div>
                    <div class="movie-description">
                        <p>This is a highly acclaimed ${movie.category} movie released in ${movie.year}. The film has received critical acclaim for its storyline, direction, and performances.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac metus justo. Nullam consectetur, justo nec tincidunt scelerisque, eros nisi tristique turpis, id tempor neque ex id tortor.</p>
                    </div>
                    <div class="movie-actions">
                        <button class="play-btn"><i class="fas fa-play"></i> Watch Now</button>
                        <button class="add-watchlist"><i class="fas fa-plus"></i> Add to Watchlist</button>
                    </div>
                </div>
            </div>
            <div class="similar-movies">
                <h2>Similar Movies</h2>
                <div class="similar-movies-container">
                    <!-- Will be populated with similar movies -->
                </div>
            </div>
        `;
        
        // Add back button functionality
        movieDetailsPage.querySelector('.back-button').addEventListener('click', () => {
            movieDetailsPage.remove();
            mainContent.style.display = 'block';
        });
        
        // Add similar movies
        const similarMoviesContainer = movieDetailsPage.querySelector('.similar-movies-container');
        const similarMovies = movieDatabase
            .filter(m => 
                m.category === movie.category && 
                m.title !== movie.title
            )
            .slice(0, 4);
            
        similarMovies.forEach(similarMovie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <div class="category-badge">${similarMovie.category}</div>
                <img src="/api/placeholder/200/300" alt="${similarMovie.title}">
                <div class="movie-info">
                    <h3 class="movie-title">${similarMovie.title}</h3>
                    <div class="movie-details">
                        <span>${similarMovie.year}</span>
                        <span class="rating">${similarMovie.rating}/10</span>
                    </div>
                </div>
            `;
            similarMoviesContainer.appendChild(movieCard);
        });
        
        // Hide main content and show movie details
        mainContent.style.display = 'none';
        document.body.appendChild(movieDetailsPage);
    }
}

// ===== MAIN NAVIGATION FUNCTIONALITY =====
function setupMainNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tvShowSection = createTVShowsSection();
    const aboutSection = createAboutSection();
    const mainContent = document.querySelector('main');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Handle different sections
            const section = link.getAttribute('data-section');
            
            // Hide all view-all pages
            document.querySelectorAll('.view-all-page').forEach(page => {
                page.style.display = 'none';
            });
            
            // Reset main content
            mainContent.innerHTML = '';
            
            switch (section) {
                case 'movies':
                    // Restore original content (this is hacky but works for demo)
                    window.location.reload();
                    break;
                    
                case 'tvshows':
                    mainContent.appendChild(tvShowSection);
                    break;
                    
                case 'about':
                    mainContent.appendChild(aboutSection);
                    break;
                    
                default:
                    // Default to movies
                    window.location.reload();
                    break;
            }
        });
    });
}

// ===== TV SHOWS SECTION =====
function createTVShowsSection() {
    const tvShowsSection = document.createElement('div');
    tvShowsSection.className = 'tv-shows-container';
    
    const tvShows = [
        { title: "Stranger Things", year: "2016-Present", category: "Netflix", rating: "8.7" },
        { title: "Game of Thrones", year: "2011-2019", category: "HBO", rating: "9.2" },
        { title: "Breaking Bad", year: "2008-2013", category: "AMC", rating: "9.5" },
        { title: "The Office", year: "2005-2013", category: "NBC", rating: "8.9" },
        { title: "Friends", year: "1994-2004", category: "NBC", rating: "8.5" },
        { title: "The Crown", year: "2016-Present", category: "Netflix", rating: "8.7" },
        { title: "Sacred Games", year: "2018-2019", category: "Netflix", rating: "8.5" },
        { title: "Mirzapur", year: "2018-Present", category: "Prime", rating: "8.4" },
        { title: "The Family Man", year: "2019-Present", category: "Prime", rating: "8.7" },
        { title: "House of the Dragon", year: "2022-Present", category: "HBO", rating: "8.5" },
        { title: "The Last of Us", year: "2023-Present", category: "HBO", rating: "8.8" },
        { title: "Wednesday", year: "2022-Present", category: "Netflix", rating: "8.1" }
    ];
    
    tvShowsSection.innerHTML = `
        <section class="tv-shows-hero">
            <h1>Top TV Shows</h1>
            <p>Explore the best television series from around the world</p>
        </section>
        
        <section class="movie-row">
            <div class="section-title">
                <h2>Popular TV Shows</h2>
                <a href="#" class="view-all">View All</a>
            </div>
            <div class="slider-container">
                <div class="slider">
                    ${tvShows.slice(0, 6).map(show => `
                        <div class="movie-card">
                            <div class="category-badge">${show.category}</div>
                            <img src="/api/placeholder/200/300" alt="${show.title}">
                            <div class="movie-info">
                                <h3 class="movie-title">${show.title}</h3>
                                <div class="movie-details">
                                    <span>${show.year}</span>
                                    <span class="rating">${show.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="slider-btn prev"><i class="fas fa-chevron-left"></i></div>
                <div class="slider-btn next"><i class="fas fa-chevron-right"></i></div>
            </div>
        </section>
        
        <section class="movie-row">
            <div class="section-title">
                <h2>Trending TV Shows</h2>
                <a href="#" class="view-all">View All</a>
            </div>
            <div class="slider-container">
                <div class="slider">
                    ${tvShows.slice(6, 12).map(show => `
                        <div class="movie-card">
                            <div class="category-badge">${show.category}</div>
                            <img src="/api/placeholder/200/300" alt="${show.title}">
                            <div class="movie-info">
                                <h3 class="movie-title">${show.title}</h3>
                                <div class="movie-details">
                                    <span>${show.year}</span>
                                    <span class="rating">${show.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="slider-btn prev"><i class="fas fa-chevron-left"></i></div>
                <div class="slider-btn next"><i class="fas fa-chevron-right"></i></div>
            </div>
        </section>
    `;
    
    return tvShowsSection;
}

// ===== ABOUT SECTION =====
function createAboutSection() {
    const aboutSection = document.createElement('div');
    aboutSection.className = 'about-container';
    
    aboutSection.innerHTML = `
        <section class="about-hero">
            <h1>About CineVerse</h1>
            <p>Your ultimate destination for movies from around the world</p>
        </section>
        
        <section class="about-content">
            <div class="about-section">
                <h2>Our Story</h2>
                <p>CineVerse was founded in 2023 with a simple mission: to connect movie lovers with the best films from around the world. Whether you enjoy Hollywood blockbusters, Bollywood dramas, or Tollywood action films, CineVerse brings them all together in one place.</p>
                <p>We believe that great cinema transcends borders and languages. That's why we've created a platform that celebrates diversity in filmmaking and helps you discover stories from different cultures and perspectives.</p>
            </div>
            
            <div class="about-section">
                <h2>What We Offer</h2>
                <ul>
                    <li>Curated collections of the best movies from Hollywood, Bollywood, and Tollywood</li>
                    <li>Personalized recommendations based on your viewing history</li>
                    <li>Honest ratings and reviews from critics and users</li>
                    <li>Regular updates with the latest releases and trending content</li>
                    <li>Easy navigation to help you find exactly what you're looking for</li>
                </ul>
            </div>
            
            <div class="about-section">
                <h2>Contact Us</h2>
                <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
                <div class="contact-info">
                    <p><strong>Email:</strong> info@cineverse.com</p>
                    <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                    <p><strong>Address:</strong> 123 Movie Lane, Hollywood, CA 90001</p>
                </div>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
        </section>
    `;
    
    return aboutSection;
}