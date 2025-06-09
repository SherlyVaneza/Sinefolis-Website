// Movies functionality for Now Showing page

document.addEventListener("DOMContentLoaded", () => {
  initializeMoviesPage()
})

// Movie data
const moviesData = {
  dune: {
    img: "/Sinefolis-Website/pict/landscape_poster/dune2.webp",
    title: "Dune: Part Two",
    genre: "Action, Sci-Fi",
    rating: "8.5/10",
    synopsis:
      "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    cinemas: ["Grand Indonesia", "Senayan City", "Central Park", "Summarecon Serpong", "23 Paskal"],
  },
  batman: {
    img: "/Sinefolis-Website/pict/landscape_poster/theBatman.jpeg",
    title: "The Batman",
    genre: "Action, Crime",
    rating: "7.8/10",
    synopsis:
      "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    cinemas: ["Grand Indonesia", "Central Park", "Summarecon Bekasi", "AEON Sentul City"],
  },
  topgun: {
    img: "/Sinefolis-Website/pict/landscape_poster/topgun.jpeg",
    title: "Top Gun: Maverick",
    genre: "Action, Drama",
    rating: "8.3/10",
    synopsis:
      "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    cinemas: ["Central Park", "Summarecon Serpong", "Paris Van Java", "Malioboro Mall"],
  },
  oppenheimer: {
    img: "/Sinefolis-Website/pict/landscape_poster/oppenheimer.jpg",
    title: "Oppenheimer",
    genre: "Drama, Biography",
    rating: "8.4/10",
    synopsis:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    cinemas: ["Grand Indonesia", "Senayan City", "Plaza Indonesia", "Paris Van Java", "23 Paskal", "Paragon Mall"],
  },
  killers: {
    img: "/Sinefolis-Website/pict/landscape_poster/flowerMoon.jpg",
    title: "Killers of the Flower Moon",
    genre: "Drama, Crime",
    rating: "7.6/10",
    synopsis:
      "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.",
    cinemas: ["Senayan City", "Plaza Indonesia", "Summarecon Serpong", "Paris Van Java", "Malioboro Mall"],
  },
  maestro: {
    img: "/Sinefolis-Website/pict/landscape_poster/maestro.jpeg",
    title: "Maestro",
    genre: "Drama, Biography",
    rating: "6.5/10",
    synopsis:
      "A towering and fearless love story chronicling the lifelong relationship between Leonard Bernstein and Felicia Montealegre Cohn Bernstein.",
    cinemas: ["Grand Indonesia", "Central Park", "Pakuwon Mall", "Sun Plaza"],
  },
  barbie: {
    img: "/Sinefolis-Website/pict/landscape_poster/barbie.jpg",
    title: "Barbie",
    genre: "Comedy, Adventure",
    rating: "6.9/10",
    synopsis:
      "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    cinemas: ["Grand Indonesia", "Senayan City", "Central Park", "Summarecon Serpong", "Summarecon Bekasi", "Pakuwon Mall", "Trans Studio Makassar"],
  },
  "cocaine-bear": {
    img: "/Sinefolis-Website/pict/landscape_poster/cocaine Bear.avif",
    title: "Cocaine Bear",
    genre: "Comedy, Thriller",
    rating: "5.9/10",
    synopsis:
      "An oddball group of cops, criminals, tourists and teens converge in a Georgia forest where a 500-pound black bear goes on a murderous rampage after unintentionally ingesting cocaine.",
    cinemas: ["Grand Indonesia", "Central Park", "Summarecon Serpong", "Paris Van Java", "23 Paskal"],
  },
  air: {
    img: "/Sinefolis-Website/pict/landscape_poster/air.jpeg",
    title: "Air",
    genre: "Comedy, Drama",
    rating: "7.4/10",
    synopsis:
      "Follows the history of shoe salesman Sonny Vaccaro, and how he led Nike in its pursuit of the greatest athlete in the history of basketball, Michael Jordan.",
    cinemas: ["Senayan City", "Plaza Indonesia", "Summarecon Bekasi", "AEON Sentul City", "Summarecon Serpong"],
  },
  scream: {
    img: "/Sinefolis-Website/pict/landscape_poster/screamVI.jpeg",
    title: "Scream VI",
    genre: "Horror, Mystery",
    rating: "6.5/10",
    synopsis:
      "The survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.",
    cinemas: ["Grand Indonesia", "Central Park", "Summarecon Serpong", "The Breeze BSD", "Paris Van Java"],
  },
  "evil-dead": {
    img: "/Sinefolis-Website/pict/landscape_poster/evilDead.jpg",
    title: "Evil Dead Rise",
    genre: "Horror",
    rating: "6.5/10",
    synopsis:
      "A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival.",
    cinemas: ["Senayan City", "Summarecon Serpong", "Summarecon Bekasi", "23 Paskal", "Pakuwon Mall"],
  },
  insidious: {
    img: "/Sinefolis-Website/pict/landscape_poster/insidious.jpeg",
    title: "Insidious: The Red Door",
    genre: "Horror, Mystery",
    rating: "5.5/10",
    synopsis:
      "The Lamberts must go deeper into The Further than ever before to put their demons to rest once and for all.",
    cinemas: ["Central Park", "Paris Van Java", "23 Paskal", "AEON Sentul City", "Summarecon Bekasi", "Sun Plaza", "Pakuwon Mall"],
  },
  avatar: {
    img: "/Sinefolis-Website/pict/landscape_poster/avatar.jpg",
    title: "Avatar: The Way of Water",
    genre: "Sci-Fi, Adventure",
    rating: "7.6/10",
    synopsis:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    cinemas: ["Grand Indonesia", "Senayan City", "Plaza Indonesia", "Summarecon Serpong", "Paris Van Java", "Summarecon Bekasi", "AEON Mall"],
  },
  spiderverse: {
    img: "/Sinefolis-Website/pict/landscape_poster/spiderman.jpg",
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation, Sci-Fi",
    rating: "8.7/10",
    synopsis:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    cinemas: ["Grand Indonesia", "Central Park", "Summarecon Serpong", "Summarecon Bekasi", "23 Paskal", "Pakuwon Mall", "Malioboro Mall"],
  },
  transformers: {
    img: "/Sinefolis-Website/pict/landscape_poster/transformers.jpg",
    title: "Transformers: Rise of the Beasts",
    genre: "Sci-Fi, Action",
    rating: "6.0/10",
    synopsis:
      "During the '90s, a new faction of Transformers - the Maximals - join the Autobots as allies in the battle for Earth.",
    cinemas: ["Plaza Indonesia", "Senayan City", "Central Park", "Paris Van Java", "AEON Sentul City", "AEON Sentul City"],
  },
}

function initializeMoviesPage() {
  initializeGenreFilter()
  initializeMovieCards()
}

function initializeGenreFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const movieCards = document.querySelectorAll(".movie-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const selectedGenre = this.getAttribute("data-genre")

      // Filter movies
      movieCards.forEach((card) => {
        const movieGenre = card.getAttribute("data-genre")

        if (selectedGenre === "all" || movieGenre === selectedGenre) {
          card.style.display = "block"
          // Add fade-in animation
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.transition = "opacity 0.3s ease, transform 0.3s ease"
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

function initializeMovieCards() {
  const movieCards = document.querySelectorAll(".movie-card")

  movieCards.forEach((card) => {
    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

function showMovieDetails(movieId) {
  const movie = moviesData[movieId]
  if (!movie) return

  const modal = document.getElementById("movieModal")
  const detailsContainer = document.getElementById("movieDetails")

  if (!modal || !detailsContainer) return

  detailsContainer.innerHTML = `
        <div class="movie-details">
            <div class="movie-header">
                <img src="${movie.img}" alt="${movie.title}" class="movie-poster-large">
                <div class="movie-meta">
                    <h2>${movie.title}</h2>
                    <p class="genre"><i class="fas fa-film"></i> ${movie.genre}</p>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
            </div>
            
            <div class="movie-synopsis">
                <h3>Synopsis</h3>
                <p>${movie.synopsis}</p>
            </div>
            
            <div class="movie-cinemas">
                <h3>Available at Sinéfolis Cinemas:</h3>
                <div class="cinema-list">
                    ${movie.cinemas
                      .map(
                        (cinema) => `
                        <div class="cinema-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Sinéfolis ${cinema}</span>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="movie-actions">
                <button class="btn-primary" onclick="startBooking('${movieId}')">Book Tickets</button>
                <button class="btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `

  // Add styles for movie details
  addMovieDetailsStyles()

  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("movieModal")
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

function addMovieDetailsStyles() {
  if (document.getElementById("movieDetailsStyles")) return

  const style = document.createElement("style")
  style.id = "movieDetailsStyles"
  style.textContent = `
        .movie-details {
            max-width: 100%;
        }
        
        .movie-header {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
            align-items: start;
        }
        
        .movie-poster-large {
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .movie-meta h2 {
            color: #e91e63;
            margin-bottom: 1rem;
            font-size: 1.8rem;
        }
        
        .movie-meta .genre {
            color: #666;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .movie-meta .rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #ffa726;
            font-size: 1.1rem;
        }
        
        .movie-synopsis {
            margin-bottom: 2rem;
        }
        
        .movie-synopsis h3 {
            color: #e91e63;
            margin-bottom: 1rem;
        }
        
        .movie-synopsis p {
            line-height: 1.6;
            color: #666;
        }
        
        .movie-cinemas h3 {
            color: #e91e63;
            margin-bottom: 1rem;
        }
        
        .cinema-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .cinema-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem;
            background: #f5f5f5;
            border-radius: 8px;
            color: #666;
        }
        
        .cinema-item i {
            color: #e91e63;
        }
        
        .movie-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .btn-secondary {
            background: #666;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
            background: #333;
        }
        
        @media screen and (max-width: 768px) {
            .movie-header {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .movie-poster-large {
                max-width: 200px;
                margin: 0 auto;
            }
            
            .cinema-list {
                grid-template-columns: 1fr;
            }
            
            .movie-actions {
                flex-direction: column;
            }
        }
    `
  document.head.appendChild(style)
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("movieModal")
  if (modal && e.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})

// Export functions for use in other files
window.MoviesUtils = {
  showMovieDetails,
  closeModal,
  moviesData,
}
