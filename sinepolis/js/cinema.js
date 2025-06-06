// Cinema locations functionality

document.addEventListener("DOMContentLoaded", () => {
  initializeCinemaPage()
})

// Cinema data with detailed information
const cinemaData = {
  "grand-indonesia": {
    img: "/pict/cinema/GrandIndonesia.jpg",
    name: "Sinéfolis Grand Indonesia",
    city: "Jakarta",
    address: "Jl. M.H. Thamrin No.1, Menteng, Jakarta Pusat 10310",
    phone: "+62 21 2358 0000",
    features: ["IMAX", "4DX", "VIP", "Dolby Atmos"],
    screens: 8,
    coordinates: { lat: -6.1944, lng: 106.8229 },
    description:
      "Located in the heart of Jakarta, our Grand Indonesia location offers the ultimate premium cinema experience with state-of-the-art IMAX and 4DX technology.",
  },
  "senayan-city": {
    img: "/pict/cinema/senayanCity.jpg",
    name: "Sinéfolis Senayan City",
    city: "Jakarta",
    address: "Jl. Asia Afrika No.8, Gelora, Jakarta Selatan 10270",
    phone: "+62 21 2722 8000",
    features: ["Dolby Atmos", "VIP", "Premium"],
    screens: 6,
    coordinates: { lat: -6.2297, lng: 106.8075 },
    description:
      "Experience movies like never before at our Senayan City location, featuring luxurious VIP seating and crystal-clear Dolby Atmos sound.",
  },
  "plaza-indonesia": {
    img: "/pict/cinema/plazaIndonesia.jpg",
    name: "Sinéfolis Plaza Indonesia",
    city: "Jakarta",
    address: "Jl. M.H. Thamrin Kav. 28-30, Menteng, Jakarta Pusat 10350",
    phone: "+62 21 2992 3456",
    features: ["Premium", "VIP", "Luxury Dining"],
    screens: 5,
    coordinates: { lat: -6.1928, lng: 106.8232 },
    description:
      "Our Plaza Indonesia cinema combines luxury and comfort with premium seating and exclusive dining options for the ultimate movie experience.",
  },
  "central-park": {
    img: "/pict/cinema/centralPark.jpeg",
    name: "Sinéfolis Central Park",
    city: "Jakarta",
    address: "Jl. Letjen S. Parman Kav. 28, Tanjung Duren, Jakarta Barat 11470",
    phone: "+62 21 2922 8888",
    features: ["4DX", "Dolby Atmos", "Family Friendly"],
    screens: 7,
    coordinates: { lat: -6.1781, lng: 106.7906 },
    description:
      "Perfect for families and thrill-seekers, our Central Park location features exciting 4DX technology and family-friendly amenities.",
  },
  "summarecon-serpong": {
    img: "/pict/cinema/SummareconSerpong.jpg",
    name: "Sinéfolis Summarecon Serpong",
    city: "Tangerang",
    address: "Jl. Boulevard Gading Serpong, Kelapa Dua, Tangerang 15810",
    phone: "+62 21 5460 8888",
    features: ["IMAX", "VIP", "Premium"],
    screens: 9,
    coordinates: { lat: -6.2382, lng: 106.6372 },
    description:
      "Our largest location in Tangerang, featuring spectacular IMAX screens and luxurious VIP experiences in the heart of Serpong.",
  },
  "breeze-bsd": {
    img: "/pict/cinema/TheBreeze.jpg",
    name: "Sinéfolis The Breeze BSD",
    city: "Tangerang",
    address: "Jl. Grand Boulevard, BSD City, Tangerang Selatan 15345",
    phone: "+62 21 5315 2888",
    features: ["Premium", "Dolby Atmos", "Rooftop Dining"],
    screens: 6,
    coordinates: { lat: -6.3018, lng: 106.6519 },
    description:
      "Enjoy movies with a view at our BSD location, featuring premium screens and unique rooftop dining experiences.",
  },
  "summarecon-bekasi": {
    img: "/pict/cinema/SummareconBekasi.jpg",
    name: "Sinéfolis Summarecon Bekasi",
    city: "Bekasi",
    address: "Jl. Boulevard Ahmad Yani, Marga Mulya, Bekasi 17142",
    phone: "+62 21 8889 5555",
    features: ["4DX", "VIP", "Gaming Zone"],
    screens: 7,
    coordinates: { lat: -6.2254, lng: 107.0011 },
    description:
      "Entertainment beyond movies! Our Bekasi location features thrilling 4DX experiences and an exciting gaming zone for the whole family.",
  },
  "paris-van-java": {
    img: "/pict/cinema/pvj.webp",
    name: "Sinéfolis Paris Van Java",
    city: "Bandung",
    address: "Jl. Sukajadi No.131-139, Sukajadi, Bandung 40162",
    phone: "+62 22 2013 8888",
    features: ["IMAX", "Premium", "Mountain View"],
    screens: 8,
    coordinates: { lat: -6.8957, lng: 107.5946 },
    description:
      "Experience cinema with stunning mountain views in Bandung. Our Paris Van Java location offers IMAX technology in a beautiful setting.",
  },
  "paskal-23": {
    img: "/pict/cinema/paskal.jpg",
    name: "Sinéfolis 23 Paskal",
    city: "Bandung",
    address: "Jl. Pasir Kaliki No.25-27, Ciroyom, Bandung 40181",
    phone: "+62 22 4230 2323",
    features: ["Dolby Atmos", "VIP", "Student Discounts"],
    screens: 5,
    coordinates: { lat: -6.9034, lng: 107.6056 },
    description:
      "Popular with students and young professionals, our 23 Paskal location offers great entertainment with special student pricing.",
  },
  "aeon-sentul": {
    img: "/pict/cinema/aeonSentul.jpg",
    name: "Sinéfolis AEON Sentul City",
    city: "Bogor",
    address: "Jl. MH. Thamrin No.1, Sentul City, Bogor 16810",
    phone: "+62 21 8796 4444",
    features: ["Premium", "Family Friendly", "Nature View"],
    screens: 6,
    coordinates: { lat: -6.5598, lng: 106.8321 },
    description:
      "Escape to nature while enjoying premium cinema. Our Sentul location offers a peaceful movie experience surrounded by beautiful landscapes.",
  },
  "pakuwon-mall": {
    img: "/pict/cinema/pakuwon.webp",
    name: "Sinéfolis Pakuwon Mall",
    city: "Surabaya",
    address: "Jl. Puncak Indah Lontar No.2, Sambikerep, Surabaya 60219",
    phone: "+62 31 7345 8888",
    features: ["IMAX", "4DX", "Waterfront View"],
    screens: 10,
    coordinates: { lat: -7.2459, lng: 112.6844 },
    description:
      "East Java's premier cinema destination featuring the latest IMAX and 4DX technology with stunning waterfront views.",
  },
  "sun-plaza": {
    img: "/pict/cinema/sunplaza.jpg",
    name: "Sinéfolis Sun Plaza",
    city: "Medan",
    address: "Jl. Zainul Arifin No.7, Kesawan, Medan 20111",
    phone: "+62 61 4566 7777",
    features: ["Premium", "VIP", "Cultural Heritage"],
    screens: 6,
    coordinates: { lat: 3.5952, lng: 98.6722 },
    description:
      "Located in historic Medan, our Sun Plaza cinema blends modern technology with the rich cultural heritage of North Sumatra.",
  },
  "trans-studio-makassar": {
    img: "/pict/cinema/transStudio.jpg",
    name: "Sinéfolis Trans Studio Makassar",
    city: "Makassar",
    address: "Jl. HM. Dg. Patompo, Makassar 90231",
    phone: "+62 411 8888 999",
    features: ["4DX", "Premium", "Theme Park Access"],
    screens: 8,
    coordinates: { lat: -5.1477, lng: 119.4327 },
    description:
      "Combine movies with theme park fun! Our Makassar location offers exciting 4DX experiences and access to Trans Studio theme park.",
  },
  "paragon-semarang": {
    img: "/pict/cinema/paragon.jpg",
    name: "Sinéfolis Paragon Mall",
    city: "Semarang",
    address: "Jl. Pemuda No.118, Sekayu, Semarang 50132",
    phone: "+62 24 3562 8888",
    features: ["Dolby Atmos", "VIP", "Historic District"],
    screens: 5,
    coordinates: { lat: -6.9667, lng: 110.4167 },
    description:
      "Experience cinema in the heart of historic Semarang with premium Dolby Atmos sound and luxurious VIP seating.",
  },
  "malioboro-mall": {
    img: "/pict/cinema/malioboroMall.jpg",
    name: "Sinéfolis Malioboro Mall",
    city: "Yogyakarta",
    address: "Jl. Malioboro No.52-58, Sosromenduran, Yogyakarta 55213",
    phone: "+62 274 4444 555",
    features: ["Premium", "Family Friendly", "Cultural Center"],
    screens: 6,
    coordinates: { lat: -7.7956, lng: 110.3695 },
    description:
      "Located on famous Malioboro Street, our Yogyakarta cinema offers premium entertainment in the cultural heart of Java.",
  },
}

function initializeCinemaPage() {
  initializeCityFilter()
  initializeCinemaCards()
}

function initializeCityFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const cinemaCards = document.querySelectorAll(".cinema-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const selectedCity = this.getAttribute("data-city")

      // Filter cinemas
      cinemaCards.forEach((card) => {
        const cinemaCity = card.getAttribute("data-city")

        if (selectedCity === "all" || cinemaCity === selectedCity) {
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

function initializeCinemaCards() {
  const cinemaCards = document.querySelectorAll(".cinema-card")

  cinemaCards.forEach((card) => {
    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

function showCinemaDetails(cinemaId) {
  const cinema = cinemaData[cinemaId]
  if (!cinema) return

  const modal = document.getElementById("cinemaModal")
  const detailsContainer = document.getElementById("cinemaDetails")

  if (!modal || !detailsContainer) return

  detailsContainer.innerHTML = `
        <div class="cinema-details">
            <div class="cinema-header">
                <div class="cinema-image-large">
                    <img src="${cinema.img}" alt="${cinema.name}">
                </div>
                <div class="cinema-meta">
                    <h2>${cinema.name}</h2>
                    <p class="cinema-city"><i class="fas fa-map-marker-alt"></i> ${cinema.city}</p>
                    <div class="cinema-features-large">
                        ${cinema.features
                          .map(
                            (feature) => `
                            <span class="feature-tag">${feature}</span>
                        `,
                          )
                          .join("")}
                    </div>
                    <div class="cinema-stats">
                        <div class="stat">
                            <i class="fas fa-tv"></i>
                            <span>${cinema.screens} Screens</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-phone"></i>
                            <span>${cinema.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cinema-description">
                <h3>About This Location</h3>
                <p>${cinema.description}</p>
            </div>
            
            <div class="cinema-address">
                <h3>Address & Contact</h3>
                <div class="address-info">
                    <div class="address-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${cinema.address}</span>
                    </div>
                    <div class="address-item">
                        <i class="fas fa-phone"></i>
                        <span>${cinema.phone}</span>
                    </div>
                </div>
            </div>
            
            <div class="cinema-map">
                <h3>Location Map</h3>
                <div class="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666!2d${cinema.coordinates.lng}!3d${cinema.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMzUnNDIuNyJTIDEwNsKwNDknMjMuNCJF!5e0!3m2!1sen!2sid!4v1234567890"
                        width="100%" 
                        height="300" 
                        style="border:0; border-radius: 10px;" 
                        allowfullscreen="" 
                        loading="lazy">
                    </iframe>
                </div>
                <div class="map-actions">
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${cinema.coordinates.lat},${cinema.coordinates.lng}" 
                       target="_blank" 
                       class="btn-directions">
                        <i class="fas fa-directions"></i> Get Directions
                    </a>
                    <button class="btn-call" onclick="window.open('tel:${cinema.phone}')">
                        <i class="fas fa-phone"></i> Call Cinema
                    </button>
                </div>
            </div>
            
            <div class="cinema-actions">
                <button class="btn-primary" onclick="goToNowShowing()">View Movies</button>
                <button class="btn-secondary" onclick="closeCinemaModal()">Close</button>
            </div>
        </div>
    `

  // Add styles for cinema details
  addCinemaDetailsStyles()

  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeCinemaModal() {
  const modal = document.getElementById("cinemaModal")
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

function goToNowShowing() {
  window.location.href = "now-showing.html"
}

function addCinemaDetailsStyles() {
  if (document.getElementById("cinemaDetailsStyles")) return

  const style = document.createElement("style")
  style.id = "cinemaDetailsStyles"
  style.textContent = `
        .cinema-details {
            max-width: 100%;
        }
        
        .cinema-header {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
            align-items: start;
        }
        
        .cinema-image-large img {
            width: 100%;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .cinema-meta h2 {
            color: #e91e63;
            margin-bottom: 1rem;
            font-size: 1.8rem;
        }
        
        .cinema-meta .cinema-city {
            color: #666;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.1rem;
        }
        
        .cinema-features-large {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .cinema-features-large .feature-tag {
            background: linear-gradient(45deg, #e91e63, #f8bbd9);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .cinema-stats {
            display: flex;
            gap: 2rem;
        }
        
        .cinema-stats .stat {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #666;
        }
        
        .cinema-stats .stat i {
            color: #e91e63;
        }
        
        .cinema-description,
        .cinema-address {
            margin-bottom: 2rem;
        }
        
        .cinema-description h3,
        .cinema-address h3,
        .cinema-map h3 {
            color: #e91e63;
            margin-bottom: 1rem;
        }
        
        .cinema-description p {
            line-height: 1.6;
            color: #666;
        }
        
        .address-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .address-item {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            color: #666;
        }
        
        .address-item i {
            color: #e91e63;
            margin-top: 0.3rem;
        }
        
        .map-container {
            margin-bottom: 1rem;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .map-actions {
            display: flex;
            gap: 1rem;
        }
        
        .btn-directions,
        .btn-call {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .btn-directions {
            background: #4caf50;
            color: white;
            border: none;
        }
        
        .btn-directions:hover {
            background: #388e3c;
        }
        
        .btn-call {
            background: #2196f3;
            color: white;
            border: none;
        }
        
        .btn-call:hover {
            background: #1976d2;
        }
        
        .cinema-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        @media screen and (max-width: 768px) {
            .cinema-header {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .cinema-features-large {
                justify-content: center;
            }
            
            .cinema-stats {
                justify-content: center;
            }
            
            .map-actions {
                flex-direction: column;
            }
            
            .cinema-actions {
                flex-direction: column;
            }
        }
    `
  document.head.appendChild(style)
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("cinemaModal")
  if (modal && e.target === modal) {
    closeCinemaModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCinemaModal()
  }
})

// Export functions for use in other files
window.CinemaUtils = {
  showCinemaDetails,
  closeCinemaModal,
  cinemaData,
}
