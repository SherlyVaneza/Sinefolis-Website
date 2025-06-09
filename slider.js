// Hero Slider functionality for Sinéfolis Cinemas

document.addEventListener("DOMContentLoaded", () => {
  initializeSlider()
})

function initializeSlider() {
  const slider = document.getElementById("heroSlider")
  const slides = slider ? slider.querySelectorAll(".slide") : []
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const dotsContainer = document.getElementById("sliderDots")

  if (!slider || slides.length === 0) return

  let currentSlide = 0
  let slideInterval
  let isTransitioning = false

  // Create dots
  createDots()

  // Initialize slider
  showSlide(currentSlide)
  startAutoSlide()

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (!isTransitioning) {
        previousSlide()
      }
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!isTransitioning) {
        nextSlide()
      }
    })
  }

  // Pause auto-slide on hover
  slider.addEventListener("mouseenter", stopAutoSlide)
  slider.addEventListener("mouseleave", startAutoSlide)

  // Touch/swipe support for mobile
  let touchStartX = 0
  let touchEndX = 0

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
    stopAutoSlide()
  })

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
    startAutoSlide()
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && !isTransitioning) {
      previousSlide()
    } else if (e.key === "ArrowRight" && !isTransitioning) {
      nextSlide()
    }
  })

  function createDots() {
    if (!dotsContainer) return

    dotsContainer.innerHTML = ""
    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.className = "dot"
      dot.addEventListener("click", () => {
        if (!isTransitioning) {
          goToSlide(index)
        }
      })
      dotsContainer.appendChild(dot)
    })
  }

  function showSlide(index) {
    if (isTransitioning) return

    isTransitioning = true

    // Remove active class from all slides
    slides.forEach((slide) => slide.classList.remove("active"))

    // Add active class to current slide
    slides[index].classList.add("active")

    // Update dots
    updateDots(index)

    // Reset transition flag after animation
    setTimeout(() => {
      isTransitioning = false
    }, 1000)
  }

  function updateDots(activeIndex) {
    if (!dotsContainer) return

    const dots = dotsContainer.querySelectorAll(".dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex)
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
    resetAutoSlide()
  }

  function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
    resetAutoSlide()
  }

  function goToSlide(index) {
    if (index !== currentSlide) {
      currentSlide = index
      showSlide(currentSlide)
      resetAutoSlide()
    }
  }

  function startAutoSlide() {
    stopAutoSlide()
    slideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval)
      slideInterval = null
    }
  }

  function resetAutoSlide() {
    stopAutoSlide()
    startAutoSlide()
  }

  function handleSwipe() {
    const swipeThreshold = 50
    const swipeDistance = touchEndX - touchStartX

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous slide
        previousSlide()
      } else {
        // Swipe left - go to next slide
        nextSlide()
      }
    }
  }

  // Preload images for better performance
  function preloadImages() {
    slides.forEach((slide) => {
      const img = slide.querySelector("img")
      if (img && img.src) {
        const preloadImg = new Image()
        preloadImg.src = img.src
      }
    })
  }

  preloadImages()

  // Pause slider when page is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide()
    } else {
      startAutoSlide()
    }
  })

  // Add loading state for images
  slides.forEach((slide, index) => {
    const img = slide.querySelector("img")
    if (img) {
      img.addEventListener("load", () => {
        slide.classList.add("loaded")
      })

      img.addEventListener("error", () => {
        console.error(`Failed to load slide image ${index + 1}`)
        // You could add a fallback image here
      })
    }
  })

  // Accessibility improvements
  slider.setAttribute("role", "region")
  slider.setAttribute("aria-label", "Movie carousel")

  slides.forEach((slide, index) => {
    slide.setAttribute("aria-hidden", index !== currentSlide)
    slide.setAttribute("role", "group")
    slide.setAttribute("aria-label", `Slide ${index + 1} of ${slides.length}`)
  })

  // Update aria-hidden when slides change
  function updateAccessibility() {
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index !== currentSlide)
    })
  }

  // Override showSlide to include accessibility updates
  const originalShowSlide = showSlide
  showSlide = (index) => {
    originalShowSlide(index)
    updateAccessibility()
  }
}

// Export for use in other files
window.SliderUtils = {
  initializeSlider,
}
