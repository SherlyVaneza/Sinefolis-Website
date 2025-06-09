// Feedback form functionality for Sinéfolis Cinemas

document.addEventListener("DOMContentLoaded", () => {
  initializeFeedbackForm()
})

function initializeFeedbackForm() {
  const feedbackForm = document.getElementById("feedbackForm")

  if (feedbackForm) {
    // Initialize form validation
    initializeFormValidation()

    // Form submission
    feedbackForm.addEventListener("submit", handleFeedbackSubmit)
  }
}

function initializeFormValidation() {
  // First Name validation
  const firstNameField = document.getElementById("firstName")
  if (firstNameField) {
    firstNameField.addEventListener("blur", validateFirstName)
    firstNameField.addEventListener("input", () => {
      if (firstNameField.value.trim()) {
        clearFieldError("firstName")
      }
    })
  }

  // Last Name validation
  const lastNameField = document.getElementById("lastName")
  if (lastNameField) {
    lastNameField.addEventListener("blur", validateLastName)
    lastNameField.addEventListener("input", () => {
      if (lastNameField.value.trim()) {
        clearFieldError("lastName")
      }
    })
  }

  // Email validation
  const emailField = document.getElementById("email")
  if (emailField) {
    emailField.addEventListener("blur", validateEmail)
    emailField.addEventListener("input", () => {
      if (emailField.value.trim()) {
        clearFieldError("email")
      }
    })
  }

  // Phone validation
  const phoneField = document.getElementById("phone")
  if (phoneField) {
    phoneField.addEventListener("blur", validatePhone)
    phoneField.addEventListener("input", () => {
      // Only allow numbers, spaces, +, -, (, )
      phoneField.value = phoneField.value.replace(/[^0-9+\-\s()]/g, "")
      if (phoneField.value.trim()) {
        clearFieldError("phone")
      }
    })
  }

  // Rating validation
  const ratingInputs = document.querySelectorAll('input[name="rating"]')
  if (ratingInputs.length > 0) {
    ratingInputs.forEach((input) => {
      input.addEventListener("change", validateRating)
    })
  }

  // Message validation
  const messageField = document.getElementById("message")
  if (messageField) {
    messageField.addEventListener("blur", validateMessage)
    messageField.addEventListener("input", () => {
      if (messageField.value.trim()) {
        clearFieldError("message")
      }
    })
  }
}

// Validation functions
function validateFirstName() {
  const firstName = document.getElementById("firstName").value.trim()

  if (!validateRequired(firstName)) {
    showFieldError("firstName", "First name is required")
    return false
  }

  if (!validateMinLength(firstName, 2)) {
    showFieldError("firstName", "First name must be at least 2 characters")
    return false
  }

  clearFieldError("firstName")
  return true
}

function validateLastName() {
  const lastName = document.getElementById("lastName").value.trim()

  if (!validateRequired(lastName)) {
    showFieldError("lastName", "Last name is required")
    return false
  }

  if (!validateMinLength(lastName, 2)) {
    showFieldError("lastName", "Last name must be at least 2 characters")
    return false
  }

  clearFieldError("lastName")
  return true
}

function validateEmail() {
  const email = document.getElementById("email").value.trim()

  if (!validateRequired(email)) {
    showFieldError("email", "Email address is required")
    return false
  }

  if (!validateEmailFormat(email)) {
    showFieldError("email", "Please enter a valid email address")
    return false
  }

  clearFieldError("email")
  return true
}

function validatePhone() {
  const phone = document.getElementById("phone").value.trim()

  if (!validateRequired(phone)) {
    showFieldError("phone", "Phone number is required")
    return false
  }

  if (!validatePhoneFormat(phone)) {
    showFieldError("phone", "Please enter a valid phone number")
    return false
  }

  clearFieldError("phone")
  return true
}

function validateRating() {
  const ratingInputs = document.querySelectorAll('input[name="rating"]')
  let isSelected = false

  ratingInputs.forEach((input) => {
    if (input.checked) {
      isSelected = true
    }
  })

  if (!isSelected) {
    showFieldError("rating", "Please select a rating")
    return false
  }

  clearFieldError("rating")
  return true
}

function validateMessage() {
  const message = document.getElementById("message").value.trim()

  if (!validateRequired(message)) {
    showFieldError("message", "Feedback message is required")
    return false
  }

  if (!validateMinLength(message, 10)) {
    showFieldError("message", "Message must be at least 10 characters")
    return false
  }

  clearFieldError("message")
  return true
}

// Helper validation functions
function validateRequired(value) {
  return value !== ""
}

function validateMinLength(value, minLength) {
  return value.length >= minLength
}

function validateEmailFormat(email) {
  // Simple email validation (contains @ and .)
  return email.includes("@") && email.includes(".")
}

function validatePhoneFormat(phone) {
  // Phone must be numeric and have at least 10 digits
  const digitsOnly = phone.replace(/\D/g, "")
  return digitsOnly.length >= 10
}

// Error handling functions
function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.add("show")
  }
}

function clearFieldError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}Error`)
  if (errorElement) {
    errorElement.textContent = ""
    errorElement.classList.remove("show")
  }
}

// Form submission handler
function handleFeedbackSubmit(e) {
  e.preventDefault()

  // Validate all fields
  const isFirstNameValid = validateFirstName()
  const isLastNameValid = validateLastName()
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()
  const isRatingValid = validateRating()
  const isMessageValid = validateMessage()

  if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && isRatingValid && isMessageValid) {
    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'

    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false

      // Get form data
      const formData = new FormData(e.target)
      const feedbackData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        cinema: formData.get("cinema"),
        rating: formData.get("rating"),
        aspects: formData.getAll("aspects"),
        message: formData.get("message"),
        newsletter: formData.get("newsletter") === "on",
        timestamp: new Date().toISOString(),
      }

      // Save feedback to localStorage
      saveFeedback(feedbackData)

      // Show success message
      showFeedbackSuccess()
    }, 2000)
  } else {
    // Scroll to the first error
    const firstError = document.querySelector(".error-message.show")
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
}

function saveFeedback(feedbackData) {
  const feedbacks = JSON.parse(localStorage.getItem("sinefolisFeedbacks") || "[]")
  feedbacks.push(feedbackData)
  localStorage.setItem("sinefolisFeedbacks", JSON.stringify(feedbacks))
}

function showFeedbackSuccess() {
  const feedbackForm = document.getElementById("feedbackForm")
  const feedbackContainer = feedbackForm.parentElement

  if (feedbackContainer) {
    feedbackContainer.innerHTML = `
            <div class="feedback-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Thank You for Your Feedback!</h2>
                <p>We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve our services.</p>
                <p>A confirmation has been sent to your email address.</p>
                <div class="success-actions">
                    <button class="btn-primary" onclick="location.href='index.html'">Return to Home</button>
                </div>
            </div>
        `

    addSuccessStyles()
  }
}

function addSuccessStyles() {
  if (document.getElementById("feedbackSuccessStyles")) return

  const style = document.createElement("style")
  style.id = "feedbackSuccessStyles"
  style.textContent = `
        .feedback-success {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(233, 30, 99, 0.1);
        }
        
        .success-icon {
            font-size: 4rem;
            color: #4caf50;
            margin-bottom: 1rem;
        }
        
        .feedback-success h2 {
            color: #4caf50;
            margin-bottom: 1rem;
        }
        
        .feedback-success p {
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .success-actions {
            margin-top: 2rem;
        }
    `
  document.head.appendChild(style)
}

// Export functions for use in other files
window.FeedbackUtils = {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateMessage,
}
