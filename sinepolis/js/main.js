// Main JavaScript file for Sinéfolis Cinemas

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeScrollEffects()
  initializeAnimations()
})

// Navigation functionality
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  }
}

// Scroll effects
function initializeScrollEffects() {
  // Header background change on scroll
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "linear-gradient(135deg, rgba(233, 30, 99, 0.95), rgba(248, 187, 217, 0.95))"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "linear-gradient(135deg, #e91e63, #f8bbd9)"
      header.style.backdropFilter = "none"
    }
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Animation effects
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".movie-card, .cinema-card, .promo-card, .news-card, .testimonial-card",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Utility functions
function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#ff9800"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `

  // Add to document
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  })
}

// Form validation utilities
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9+\-\s()]+$/
  return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, "").length >= 10
}

function validateRequired(value) {
  return value && value.trim().length > 0
}

function validateMinLength(value, minLength) {
  return value && value.trim().length >= minLength
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId)
  const errorElement = document.getElementById(fieldId + "Error")

  if (field && errorElement) {
    field.style.borderColor = "#f44336"
    errorElement.textContent = message
    errorElement.classList.add("show")
  }
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId)
  const errorElement = document.getElementById(fieldId + "Error")

  if (field && errorElement) {
    field.style.borderColor = "#e0e0e0"
    errorElement.textContent = ""
    errorElement.classList.remove("show")
  }
}

// Loading state management
function showLoading(element) {
  if (element) {
    element.disabled = true
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
  }
}

function hideLoading(element, originalText) {
  if (element) {
    element.disabled = false
    element.innerHTML = originalText
  }
}

// Local storage utilities
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return null
  }
}

function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing from localStorage:", error)
    return false
  }
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format date
function formatDate(date) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

// Format time
function formatTime(time) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(`2000-01-01T${time}`))
}

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notification-close:hover {
        opacity: 0.8;
    }
`
document.head.appendChild(style)

// Export functions for use in other files
window.SinefolisUtils = {
  showNotification,
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
  showFieldError,
  clearFieldError,
  showLoading,
  hideLoading,
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  formatCurrency,
  formatDate,
  formatTime,
  debounce,
  throttle,
}
