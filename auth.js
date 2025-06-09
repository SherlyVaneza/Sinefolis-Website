// Authentication functionality for Sinéfolis Cinemas

// Declare SinefolisUtils variable
const SinefolisUtils = {
  validateRequired: (value) => value !== "",
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },
  validateMinLength: (value, minLength) => value.length >= minLength,
  validatePhone: (phone) => {
    const re = /^\+?[0-9\s()+-]{7,}$/
    return re.test(phone)
  },
  clearFieldError: (fieldId) => {
    const errorElement = document.getElementById(`${fieldId}Error`)
    if (errorElement) {
      errorElement.style.display = "none"
    }
  },
  showFieldError: (fieldId, errorMessage) => {
    const errorElement = document.getElementById(`${fieldId}Error`)
    if (errorElement) {
      errorElement.textContent = errorMessage
      errorElement.style.display = "block"
    }
  },
  showLoading: (button) => {
    button.disabled = true
    button.innerHTML = "Loading..."
  },
  hideLoading: (button, originalText) => {
    button.disabled = false
    button.innerHTML = originalText
  },
  saveToLocalStorage: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  },
  getFromLocalStorage: (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },
  removeFromLocalStorage: (key) => {
    localStorage.removeItem(key)
  },
  showNotification: (message, type) => {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  },
}

document.addEventListener("DOMContentLoaded", () => {
  initializeAuthForms()
  updateHeaderAuthState()
})

function initializeAuthForms() {
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  if (loginForm) {
    initializeLoginForm(loginForm)
  }

  if (signupForm) {
    initializeSignupForm(signupForm)
  }
}

function initializeLoginForm(form) {
  const emailField = document.getElementById("email")
  const passwordField = document.getElementById("password")

  // Real-time validation
  if (emailField) {
    emailField.addEventListener("blur", () => validateLoginEmail())
    emailField.addEventListener("input", () => {
      if (emailField.value.trim()) {
        SinefolisUtils.clearFieldError("email")
      }
    })
  }

  if (passwordField) {
    passwordField.addEventListener("blur", () => validateLoginPassword())
    passwordField.addEventListener("input", () => {
      if (passwordField.value.trim()) {
        SinefolisUtils.clearFieldError("password")
      }
    })
  }

  // Form submission
  form.addEventListener("submit", handleLoginSubmit)
}

function initializeSignupForm(form) {
  const firstNameField = document.getElementById("firstName")
  const lastNameField = document.getElementById("lastName")
  const emailField = document.getElementById("signupEmail")
  const phoneField = document.getElementById("phone")
  const passwordField = document.getElementById("signupPassword")
  const confirmPasswordField = document.getElementById("confirmPassword")

  // Real-time validation
  if (firstNameField) {
    firstNameField.addEventListener("blur", () => validateFirstName())
    firstNameField.addEventListener("input", () => {
      if (firstNameField.value.trim()) {
        SinefolisUtils.clearFieldError("firstName")
      }
    })
  }

  if (lastNameField) {
    lastNameField.addEventListener("blur", () => validateLastName())
    lastNameField.addEventListener("input", () => {
      if (lastNameField.value.trim()) {
        SinefolisUtils.clearFieldError("lastName")
      }
    })
  }

  if (emailField) {
    emailField.addEventListener("blur", () => validateSignupEmail())
    emailField.addEventListener("input", () => {
      if (emailField.value.trim()) {
        SinefolisUtils.clearFieldError("signupEmail")
      }
    })
  }

  if (phoneField) {
    phoneField.addEventListener("blur", () => validatePhone())
    phoneField.addEventListener("input", () => {
      // Only allow numbers, spaces, +, -, (, )
      phoneField.value = phoneField.value.replace(/[^0-9+\-\s()]/g, "")
      if (phoneField.value.trim()) {
        SinefolisUtils.clearFieldError("phone")
      }
    })
  }

  if (passwordField) {
    passwordField.addEventListener("blur", () => validateSignupPassword())
    passwordField.addEventListener("input", () => {
      if (passwordField.value.trim()) {
        SinefolisUtils.clearFieldError("signupPassword")
      }
      // Re-validate confirm password if it has a value
      if (confirmPasswordField && confirmPasswordField.value.trim()) {
        validateConfirmPassword()
      }
    })
  }

  if (confirmPasswordField) {
    confirmPasswordField.addEventListener("blur", () => validateConfirmPassword())
    confirmPasswordField.addEventListener("input", () => {
      if (confirmPasswordField.value.trim()) {
        SinefolisUtils.clearFieldError("confirmPassword")
      }
    })
  }

  // Form submission
  form.addEventListener("submit", handleSignupSubmit)
}

// Login validation functions
function validateLoginEmail() {
  const email = document.getElementById("email").value.trim()

  if (!SinefolisUtils.validateRequired(email)) {
    SinefolisUtils.showFieldError("email", "Email address is required")
    return false
  }

  if (!SinefolisUtils.validateEmail(email)) {
    SinefolisUtils.showFieldError("email", "Please enter a valid email address")
    return false
  }

  SinefolisUtils.clearFieldError("email")
  return true
}

function validateLoginPassword() {
  const password = document.getElementById("password").value.trim()

  if (!SinefolisUtils.validateRequired(password)) {
    SinefolisUtils.showFieldError("password", "Password is required")
    return false
  }

  SinefolisUtils.clearFieldError("password")
  return true
}

// Signup validation functions
function validateFirstName() {
  const firstName = document.getElementById("firstName").value.trim()

  if (!SinefolisUtils.validateRequired(firstName)) {
    SinefolisUtils.showFieldError("firstName", "First name is required")
    return false
  }

  if (!SinefolisUtils.validateMinLength(firstName, 2)) {
    SinefolisUtils.showFieldError("firstName", "First name must be at least 2 characters")
    return false
  }

  SinefolisUtils.clearFieldError("firstName")
  return true
}

function validateLastName() {
  const lastName = document.getElementById("lastName").value.trim()

  if (!SinefolisUtils.validateRequired(lastName)) {
    SinefolisUtils.showFieldError("lastName", "Last name is required")
    return false
  }

  if (!SinefolisUtils.validateMinLength(lastName, 2)) {
    SinefolisUtils.showFieldError("lastName", "Last name must be at least 2 characters")
    return false
  }

  SinefolisUtils.clearFieldError("lastName")
  return true
}

function validateSignupEmail() {
  const email = document.getElementById("signupEmail").value.trim()

  if (!SinefolisUtils.validateRequired(email)) {
    SinefolisUtils.showFieldError("signupEmail", "Email address is required")
    return false
  }

  if (!SinefolisUtils.validateEmail(email)) {
    SinefolisUtils.showFieldError("signupEmail", "Please enter a valid email address")
    return false
  }

  SinefolisUtils.clearFieldError("signupEmail")
  return true
}

function validatePhone() {
  const phone = document.getElementById("phone").value.trim()

  if (!SinefolisUtils.validateRequired(phone)) {
    SinefolisUtils.showFieldError("phone", "Phone number is required")
    return false
  }

  if (!SinefolisUtils.validatePhone(phone)) {
    SinefolisUtils.showFieldError("phone", "Please enter a valid phone number")
    return false
  }

  SinefolisUtils.clearFieldError("phone")
  return true
}

function validateSignupPassword() {
  const password = document.getElementById("signupPassword").value.trim()

  if (!SinefolisUtils.validateRequired(password)) {
    SinefolisUtils.showFieldError("signupPassword", "Password is required")
    return false
  }

  if (!SinefolisUtils.validateMinLength(password, 6)) {
    SinefolisUtils.showFieldError("signupPassword", "Password must be at least 6 characters")
    return false
  }

  SinefolisUtils.clearFieldError("signupPassword")
  return true
}

function validateConfirmPassword() {
  const password = document.getElementById("signupPassword").value.trim()
  const confirmPassword = document.getElementById("confirmPassword").value.trim()

  if (!SinefolisUtils.validateRequired(confirmPassword)) {
    SinefolisUtils.showFieldError("confirmPassword", "Please confirm your password")
    return false
  }

  if (password !== confirmPassword) {
    SinefolisUtils.showFieldError("confirmPassword", "Passwords do not match")
    return false
  }

  SinefolisUtils.clearFieldError("confirmPassword")
  return true
}

// Form submission handlers
function handleLoginSubmit(e) {
  e.preventDefault()

  const isEmailValid = validateLoginEmail()
  const isPasswordValid = validateLoginPassword()

  if (isEmailValid && isPasswordValid) {
    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    SinefolisUtils.showLoading(submitBtn)

    // Simulate API call
    setTimeout(() => {
      SinefolisUtils.hideLoading(submitBtn, originalText)

      // Get form data
      const formData = new FormData(e.target)
      const loginData = {
        email: formData.get("email"),
        timestamp: new Date().toISOString(),
      }

      // Save login state
      SinefolisUtils.saveToLocalStorage("sinefolisUser", loginData)

      SinefolisUtils.showNotification("Login successful! Welcome to Sinéfolis.", "success")

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 2000)
  }
}

function handleSignupSubmit(e) {
  e.preventDefault()

  const isFirstNameValid = validateFirstName()
  const isLastNameValid = validateLastName()
  const isEmailValid = validateSignupEmail()
  const isPhoneValid = validatePhone()
  const isPasswordValid = validateSignupPassword()
  const isConfirmPasswordValid = validateConfirmPassword()

  // Check terms acceptance
  const termsCheckbox = document.getElementById("terms")
  let isTermsAccepted = true

  if (termsCheckbox && !termsCheckbox.checked) {
    SinefolisUtils.showNotification("Please accept the Terms & Conditions", "error")
    isTermsAccepted = false
  }

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isTermsAccepted
  ) {
    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    SinefolisUtils.showLoading(submitBtn)

    // Simulate API call
    setTimeout(() => {
      SinefolisUtils.hideLoading(submitBtn, originalText)

      // Get form data
      const formData = new FormData(e.target)
      const signupData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        newsletter: formData.get("newsletter") === "on",
        timestamp: new Date().toISOString(),
      }

      // Save user data
      SinefolisUtils.saveToLocalStorage("sinefolisUser", signupData)

      SinefolisUtils.showNotification("Account created successfully! Welcome to Sinéfolis.", "success")

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 2000)
  }
}

// Check if user is logged in
function isUserLoggedIn() {
  const userData = SinefolisUtils.getFromLocalStorage("sinefolisUser")
  return userData !== null
}

// Get current user data
function getCurrentUser() {
  return SinefolisUtils.getFromLocalStorage("sinefolisUser")
}

// Logout function
function logout() {
  SinefolisUtils.removeFromLocalStorage("sinefolisUser")
  SinefolisUtils.showNotification("You have been logged out successfully.", "success")

  // Redirect to home page
  setTimeout(() => {
    window.location.href = "index.html"
  }, 1500)
}

// Update header based on login status
function updateHeaderAuthState() {
  const authButtons = document.querySelector(".auth-buttons")
  const userData = getCurrentUser()

  if (authButtons && userData) {
    authButtons.innerHTML = `
            <span class="user-greeting">Hello, ${userData.firstName || userData.email}</span>
            <button class="btn-logout" onclick="logout()">Logout</button>
        `

    // Add styles for user greeting and logout button
    const style = document.createElement("style")
    style.textContent = `
            .user-greeting {
                color: white;
                font-weight: 500;
                margin-right: 1rem;
            }
            
            .btn-logout {
                background: transparent;
                color: white;
                border: 2px solid white;
                padding: 0.5rem 1.5rem;
                border-radius: 25px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-logout:hover {
                background: white;
                color: #e91e63;
            }
            
            @media screen and (max-width: 768px) {
                .user-greeting {
                    margin-right: 0;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                
                .btn-logout {
                    width: 200px;
                    text-align: center;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// Export functions for use in other files
window.AuthUtils = {
  isUserLoggedIn,
  getCurrentUser,
  logout,
  updateHeaderAuthState,
}
