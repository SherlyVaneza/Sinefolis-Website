// Promotions functionality for Sinéfolis Cinemas

document.addEventListener("DOMContentLoaded", () => {
  initializePromoPage()
})

// Promo data with detailed information
const promoData = {
  member50: {
    img: "/pict/promo/member50.jpg",
    title: "Member 50% Off Weekend",
    code: "MEMBER50",
    type: "member",
    discount: "50% off",
    validUntil: "2024-12-31",
    description: "Get 50% discount on all movie tickets every weekend for Sinéfolis members only.",
    terms: [
      "Valid for Sinéfolis members only",
      "Valid for all movie screenings on Saturday and Sunday",
      "Maximum 2 tickets per transaction",
      "Cannot be combined with other promotions",
      "Valid until December 31, 2024",
      "Not valid for special screenings or premieres",
    ],
  },
  buy2get1: {
    img: "/pict/promo/buy2get1.jpg",
    title: "Buy 2 Get 1 Free Tickets",
    code: "BUY2GET1",
    type: "general",
    discount: "Buy 2 Get 1 Free",
    validUntil: "2024-10-31",
    description: "Purchase 2 movie tickets and get the 3rd ticket absolutely free. Valid for all movies.",
    terms: [
      "Valid for all customers",
      "Must purchase 3 tickets in a single transaction",
      "Lowest priced ticket will be free",
      "Valid for all movie screenings",
      "Cannot be combined with other promotions",
      "Valid until October 31, 2024",
    ],
  },
  freepopcorn: {
    img: "/pict/promo/freePopcorn.jpg",
    title: "Free Large Popcorn",
    code: "FREEPOPCORN",
    type: "member",
    discount: "Free large popcorn",
    validUntil: "2024-11-30",
    description: "Enjoy a complimentary large popcorn with every ticket purchase for members.",
    terms: [
      "Valid for Sinéfolis members only",
      "One free large popcorn per ticket purchased",
      "Valid for all movie screenings",
      "Cannot be combined with other food promotions",
      "Valid until November 30, 2024",
      "Subject to availability",
    ],
  },
  student30: {
    img: "/pict/promo/studentDiscount.jpg",
    title: "Student Discount 30%",
    code: "STUDENT30",
    type: "general",
    discount: "30% off",
    validUntil: "2024-12-31",
    description: "Students get 30% off on all movie tickets. Valid with student ID verification.",
    terms: [
      "Valid for students with valid student ID",
      "ID must be presented at the ticket counter",
      "Valid for all movie screenings",
      "Maximum 1 ticket per student ID",
      "Cannot be combined with other promotions",
      "Valid until December 31, 2024",
    ],
  },
  family4: {
    img: "/pict/promo/familyPackage.jpg",
    title: "Family Package Deal",
    code: "FAMILY4",
    type: "general",
    discount: "Special package price",
    validUntil: "2024-12-31",
    description: "Special family package: 4 tickets + 2 large popcorns + 4 drinks for only IDR 200,000.",
    terms: [
      "Valid for all customers",
      "Package includes 4 regular tickets, 2 large popcorns, and 4 regular drinks",
      "Valid for all movie screenings except premieres",
      "Cannot be combined with other promotions",
      "Valid until December 31, 2024",
      "Subject to availability",
    ],
  },
  birthday: {
    img: "/pict/promo/birthdaySpecial.jpg",
    title: "Birthday Special Offer",
    code: "BIRTHDAY",
    type: "general",
    discount: "Free ticket",
    validUntil: "2024-12-31",
    description: "Celebrate your birthday with us! Free movie ticket on your birthday month.",
    terms: [
      "Valid for all customers",
      "Must present valid ID showing birth date",
      "Valid during your birthday month",
      "One free ticket per customer",
      "Valid for all movie screenings except premieres",
      "Cannot be combined with other promotions",
      "Valid until December 31, 2024",
    ],
  },
  vipupgrade: {
    img: "/pict/promo/vipUpgrade.jpg",
    title: "Free VIP Upgrade",
    code: "VIPUPGRADE",
    type: "member",
    discount: "VIP seat upgrade",
    validUntil: "2024-09-30",
    description: "Members get complimentary VIP seat upgrade on weekdays (subject to availability).",
    terms: [
      "Valid for Sinéfolis members only",
      "Valid for weekday screenings (Monday-Thursday)",
      "Subject to seat availability",
      "Must be booked at least 24 hours in advance",
      "Cannot be combined with other promotions",
      "Valid until September 30, 2024",
    ],
  },
  earlybird: {
    img: "/pict/promo/earlyBird.jpg",
    title: "Early Bird 25% Off",
    code: "EARLYBIRD",
    type: "general",
    discount: "25% off",
    validUntil: "2024-12-31",
    description: "Book tickets for shows before 2 PM and save 25% on your purchase.",
    terms: [
      "Valid for all customers",
      "Valid for movie screenings starting before 2:00 PM",
      "Valid for all days of the week",
      "Cannot be combined with other promotions",
      "Valid until December 31, 2024",
    ],
  },
}

function initializePromoPage() {
  initializePromoCards()
  initializeCopyButtons()
}

function initializePromoCards() {
  const promoCards = document.querySelectorAll(".promo-card")

  promoCards.forEach((card) => {
    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

function initializeCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-btn")

  copyButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation() // Prevent triggering parent card click

      const codeId = this.getAttribute("onclick").match(/'([^']+)'/)[1]
      const codeElement = document.getElementById(codeId)

      if (codeElement) {
        // Copy to clipboard
        navigator.clipboard
          .writeText(codeElement.textContent)
          .then(() => {
            // Update button text
            const originalText = this.innerHTML
            this.innerHTML = '<i class="fas fa-check"></i> Copied!'
            this.classList.add("copied")

            // Show notification
            showNotification(`Promo code ${codeElement.textContent} copied to clipboard!`, "success")

            // Reset button after 2 seconds
            setTimeout(() => {
              this.innerHTML = originalText
              this.classList.remove("copied")
            }, 2000)
          })
          .catch((err) => {
            console.error("Failed to copy: ", err)
            showNotification("Failed to copy code. Please try again.", "error")
          })
      }
    })
  })
}

function showPromoDetails(promoId) {
  const promo = promoData[promoId]
  if (!promo) return

  const modal = document.getElementById("promoModal")
  const detailsContainer = document.getElementById("promoDetails")

  if (!modal || !detailsContainer) return

  detailsContainer.innerHTML = `
        <div class="promo-details">
            <div class="promo-header">
                <div class="promo-image-large">
                    <img src="${promo.img}" alt="${promo.title}">
                    ${promo.type === "member" ? '<div class="promo-badge-large">Member Exclusive</div>' : ""}
                </div>
                <div class="promo-meta">
                    <h2>${promo.title}</h2>
                    <p class="promo-discount"><i class="fas fa-tag"></i> ${promo.discount}</p>
                    <p class="promo-validity"><i class="fas fa-calendar-alt"></i> Valid until ${formatDate(promo.validUntil)}</p>
                    <div class="promo-code-large">
                        <span>Promo Code:</span>
                        <div class="code-container-large">
                            <code>${promo.code}</code>
                            <button class="copy-btn-large" onclick="copyPromoCode('${promo.code}')">
                                <i class="fas fa-copy"></i> Copy Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="promo-description">
                <h3>Description</h3>
                <p>${promo.description}</p>
            </div>
            
            <div class="promo-terms">
                <h3>Terms & Conditions</h3>
                <ul>
                    ${promo.terms.map((term) => `<li><i class="fas fa-check-circle"></i> ${term}</li>`).join("")}
                </ul>
            </div>
            
            <div class="promo-actions">
                <button class="btn-primary" onclick="usePromoCode('${promo.code}')">Use This Promo</button>
                <button class="btn-secondary" onclick="closePromoModal()">Close</button>
            </div>
        </div>
    `

  // Add styles for promo details
  addPromoDetailsStyles()

  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closePromoModal() {
  const modal = document.getElementById("promoModal")
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

function copyPromoCode(code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      showNotification(`Promo code ${code} copied to clipboard!`, "success")
    })
    .catch((err) => {
      console.error("Failed to copy: ", err)
      showNotification("Failed to copy code. Please try again.", "error")
    })
}

function usePromoCode(code) {
  // Redirect to Now Showing page
  window.location.href = "now-showing.html"
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function showNotification(message, type) {
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

function addPromoDetailsStyles() {
  if (document.getElementById("promoDetailsStyles")) return

  const style = document.createElement("style")
  style.id = "promoDetailsStyles"
  style.textContent = `
        .promo-details {
            max-width: 100%;
        }
        
        .promo-header {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
            align-items: start;
        }
        
        .promo-image-large {
            position: relative;
        }
        
        .promo-image-large img {
            width: 100%;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .promo-badge-large {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #e91e63;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
        }
        
        .promo-meta h2 {
            color: #e91e63;
            margin-bottom: 1rem;
            font-size: 1.8rem;
        }
        
        .promo-discount,
        .promo-validity {
            color: #666;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.1rem;
        }
        
        .promo-discount i,
        .promo-validity i {
            color: #e91e63;
        }
        
        .promo-code-large {
            margin-top: 1.5rem;
        }
        
        .promo-code-large span {
            color: #333;
            font-weight: 500;
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .code-container-large {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: #f5f5f5;
            padding: 1rem;
            border-radius: 10px;
        }
        
        .code-container-large code {
            background: #e91e63;
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            font-weight: bold;
            letter-spacing: 1px;
            font-size: 1.2rem;
        }
        
        .copy-btn-large {
            background: #666;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        }
        
        .copy-btn-large:hover {
            background: #333;
        }
        
        .promo-description,
        .promo-terms {
            margin-bottom: 2rem;
        }
        
        .promo-description h3,
        .promo-terms h3 {
            color: #e91e63;
            margin-bottom: 1rem;
        }
        
        .promo-description p {
            line-height: 1.6;
            color: #666;
        }
        
        .promo-terms ul {
            list-style: none;
        }
        
        .promo-terms li {
            margin-bottom: 0.8rem;
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            color: #666;
        }
        
        .promo-terms li i {
            color: #4caf50;
            margin-top: 0.3rem;
        }
        
        .promo-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
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
        
        @media screen and (max-width: 768px) {
            .promo-header {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .code-container-large {
                flex-direction: column;
                align-items: stretch;
                gap: 0.8rem;
            }
            
            .promo-actions {
                flex-direction: column;
            }
        }
    `
  document.head.appendChild(style)
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("promoModal")
  if (modal && e.target === modal) {
    closePromoModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePromoModal()
  }
})

// Export functions for use in other files
window.PromoUtils = {
  showPromoDetails,
  closePromoModal,
  copyPromoCode,
  promoData,
}
