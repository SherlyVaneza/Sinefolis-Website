// Booking functionality for Sinéfolis Cinemas

let currentBooking = {
  movieId: null,
  movieTitle: null,
  cinema: null,
  date: null,
  time: null,
  seats: [],
  ticketCount: 0,
  foodItems: [],
  totalPrice: 0,
  step: 1,
}

const TICKET_PRICE = 60000 // IDR 60,000 per ticket

const cinemaLocations = [
  "Grand Indonesia",
  "Senayan City",
  "Plaza Indonesia",
  "Central Park",
  "Summarecon Serpong",
  "The Breeze BSD",
  "Summarecon Bekasi",
  "Paris Van Java",
  "23 Paskal",
  "AEON Sentul City",
  "Pakuwon Mall",
  "Sun Plaza", 
  "Trans Studio Makassar",
  "Paragon Mall", 
  "Malioboro Mall"
]

const showtimes = ["10:00", "12:30", "15:00", "17:30", "20:00", "22:30"]

const foodMenu = [
  { id: "popcorn-small", name: "Small Popcorn", price: 25000, image: "/pict/food/smallPopcorn.jpg" },
  { id: "popcorn-large", name: "Large Popcorn", price: 35000, image: "/pict/food/largePopcorn.jpg" },
  { id: "soda-small", name: "Small Soda", price: 15000, image: "/pict/food/hotTea.jpg" },
  { id: "soda-large", name: "Large Soda", price: 20000, image: "/pict/food/largeSoda.jpg" },
  { id: "nachos", name: "Nachos", price: 30000, image: "/pict/food/nachos.jpg" },
  { id: "hotdog", name: "Hot Dog", price: 25000, image: "/pict/food/hotdog.jpg" },
  { id: "combo1", name: "Combo 1 (Popcorn + Soda)", price: 45000, image: "pict/food/popcornCombo.jpg" },
  { id: "combo2", name: "Combo 2 (Nachos + Soda)", price: 40000, image: "/pict/food/nachosCombo.jpg" },
]

const validVoucherCodes = {
  MEMBER50: { discount: 0.5, description: "50% off for members" },
  BUY2GET1: { discount: 0.33, description: "Buy 2 Get 1 Free" },
  FREEPOPCORN: { discount: 25000, description: "Free Large Popcorn", type: "fixed" },
  STUDENT30: { discount: 0.3, description: "30% student discount" },
  FAMILY4: { discount: 50000, description: "Family package discount", type: "fixed" },
  BIRTHDAY: { discount: 60000, description: "Birthday free ticket", type: "fixed" },
  VIPUPGRADE: { discount: 0.2, description: "VIP upgrade discount" },
  EARLYBIRD: { discount: 0.25, description: "25% early bird discount" },
}

function startBooking(movieId) {
  const movie = window.MoviesUtils?.moviesData[movieId]
  if (!movie) {
    console.error("Movie not found:", movieId)
    return
  }

  currentBooking = {
    movieId: movieId,
    movieTitle: movie.title,
    cinema: null,
    date: null,
    time: null,
    seats: [],
    ticketCount: 0,
    foodItems: [],
    totalPrice: 0,
    step: 1,
  }

  showBookingModal()
  showStep1()
}

function showBookingModal() {
  const modal = document.getElementById("bookingModal")
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal")
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }

  // Reset booking data
  currentBooking = {
    movieId: null,
    movieTitle: null,
    cinema: null,
    date: null,
    time: null,
    seats: [],
    ticketCount: 0,
    foodItems: [],
    totalPrice: 0,
    step: 1,
  }
}

function showStep1() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  content.innerHTML = `
        <div class="booking-header">
            <h2>Book Tickets - ${currentBooking.movieTitle}</h2>
            <div class="step-indicator">
                <div class="step active">1</div>
                <div class="step">2</div>
                <div class="step">3</div>
                <div class="step">4</div>
                <div class="step">5</div>
                <div class="step">6</div>
                <div class="step">7</div>
            </div>
        </div>
        
        <div class="booking-step">
            <h3>Step 1: Select Cinema</h3>
            <div class="cinema-list">
                ${cinemaLocations
                  .map(
                    (cinema) => `
                    <div class="cinema-option" onclick="selectCinema('${cinema}')">
                        <i class="fas fa-building"></i>
                        <span>Sinéfolis ${cinema}</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `
}

function selectCinema(cinema) {
  currentBooking.cinema = cinema

  // Update visual selection
  document.querySelectorAll(".cinema-option").forEach((option) => {
    option.classList.remove("selected")
  })
  event.target.closest(".cinema-option").classList.add("selected")

  setTimeout(() => {
    currentBooking.step = 2
    showStep2()
  }, 500)
}

function showStep2() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  // Generate next 7 days
  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push({
      value: date.toISOString().split("T")[0],
      display: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    })
  }

  content.innerHTML = `
    <div class="booking-header">
        <h2>Book Tickets - ${currentBooking.movieTitle}</h2>
        <div class="step-indicator">
            <div class="step completed">1</div>
            <div class="step active">2</div>
            <div class="step">3</div>
            <div class="step">4</div>
            <div class="step">5</div>
            <div class="step">6</div>
            <div class="step">7</div>
        </div>
    </div>
    
    <div class="booking-step">
        <h3>Step 2: Select Date & Time</h3>
        <div class="selected-cinema-info">
            <i class="fas fa-building"></i>
            <span>Cinema: Sinéfolis ${currentBooking.cinema}</span>
        </div>
        
        <h4><i class="fas fa-calendar-alt"></i> Select Date:</h4>
        <div class="date-selection-grid">
            ${dates
              .map(
                (date, index) => `
                <div class="date-card" onclick="selectDate('${date.value}')" data-date="${date.value}">
                    <div class="date-day">${date.display.split(" ")[0]}</div>
                    <div class="date-number">${date.display.split(" ")[2]}</div>
                    <div class="date-month">${date.display.split(" ")[1]}</div>
                    ${index === 0 ? '<div class="today-badge">Today</div>' : ""}
                    ${index === 1 ? '<div class="tomorrow-badge">Tomorrow</div>' : ""}
                </div>
            `,
              )
              .join("")}
        </div>
        
        <div id="timeSelection" class="hidden">
            <h4><i class="fas fa-clock"></i> Select Time:</h4>
            <div class="showtime-grid">
                ${showtimes
                  .map(
                    (time) => `
                    <div class="showtime-card" onclick="selectTime('${time}')" data-time="${time}">
                        <div class="showtime-time">${time}</div>
                        <div class="showtime-type">Regular</div>
                        <div class="showtime-price">IDR 60,000</div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    </div>
    
    <div class="booking-navigation">
        <button class="btn-back" onclick="showStep1()">
            <i class="fas fa-arrow-left"></i> Back
        </button>
    </div>
`
}

function selectDate(date) {
  currentBooking.date = date

  // Update visual selection
  document.querySelectorAll(".date-card").forEach((option) => {
    option.classList.remove("selected")
  })
  document.querySelector(`[data-date="${date}"]`).classList.add("selected")

  // Show time selection with animation
  const timeSelection = document.getElementById("timeSelection")
  timeSelection.classList.remove("hidden")
  timeSelection.style.opacity = "0"
  timeSelection.style.transform = "translateY(20px)"

  setTimeout(() => {
    timeSelection.style.transition = "opacity 0.3s ease, transform 0.3s ease"
    timeSelection.style.opacity = "1"
    timeSelection.style.transform = "translateY(0)"
  }, 100)
}

function selectTime(time) {
  currentBooking.time = time

  // Update visual selection
  document.querySelectorAll(".showtime-card").forEach((option) => {
    option.classList.remove("selected")
  })
  document.querySelector(`[data-time="${time}"]`).classList.add("selected")

  // Show next button
  const navigation = document.querySelector(".booking-navigation")
  if (!document.getElementById("nextToStep3")) {
    const nextBtn = document.createElement("button")
    nextBtn.id = "nextToStep3"
    nextBtn.className = "btn-next"
    nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Next'
    nextBtn.onclick = () => {
      currentBooking.step = 3
      showStep3()
    }
    navigation.appendChild(nextBtn)
  }
}

function showStep3() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  content.innerHTML = `
        <div class="booking-header">
            <h2>Book Tickets - ${currentBooking.movieTitle}</h2>
            <div class="step-indicator">
                <div class="step completed">1</div>
                <div class="step completed">2</div>
                <div class="step active">3</div>
                <div class="step">4</div>
                <div class="step">5</div>
                <div class="step">6</div>
                <div class="step">7</div>
            </div>
        </div>
        
        <div class="booking-step">
            <h3>Step 3: Number of Tickets</h3>
            <p>Cinema: Sinéfolis ${currentBooking.cinema}</p>
            <p>Date & Time: ${new Date(currentBooking.date).toLocaleDateString()} at ${currentBooking.time}</p>
            
            <div class="ticket-selection">
                <label for="ticketCount">Number of People:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeTicketCount(-1)">-</button>
                    <input type="number" id="ticketCount" value="1" min="1" max="10" readonly>
                    <button class="quantity-btn" onclick="changeTicketCount(1)">+</button>
                </div>
                <p class="price-info">Price per ticket: ${formatCurrency(TICKET_PRICE)}</p>
            </div>
        </div>
        
        <div class="booking-navigation">
            <button class="btn-back" onclick="showStep2()">Back</button>
            <button class="btn-next" onclick="proceedToSeatSelection()">Next</button>
        </div>
    `

  currentBooking.ticketCount = 1
}

function changeTicketCount(change) {
  const input = document.getElementById("ticketCount")
  const newValue = Number.parseInt(input.value) + change

  if (newValue >= 1 && newValue <= 10) {
    input.value = newValue
    currentBooking.ticketCount = newValue
  }
}

function proceedToSeatSelection() {
  if (currentBooking.ticketCount > 0) {
    currentBooking.step = 4
    showStep4()
  }
}

function showStep4() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  // Generate seat map (10x10 grid)
  const seatMap = generateSeatMap()

  content.innerHTML = `
        <div class="booking-header">
            <h2>Book Tickets - ${currentBooking.movieTitle}</h2>
            <div class="step-indicator">
                <div class="step completed">1</div>
                <div class="step completed">2</div>
                <div class="step completed">3</div>
                <div class="step active">4</div>
                <div class="step">5</div>
                <div class="step">6</div>
                <div class="step">7</div>
            </div>
        </div>
        
        <div class="booking-step">
            <h3>Step 4: Select Seats</h3>
            <p>Please select ${currentBooking.ticketCount} seat(s)</p>
            
            <div class="screen-indicator">
                <div class="screen">SCREEN</div>
            </div>
            
            <div class="seat-map">
                ${seatMap}
            </div>
            
            <div class="seat-legend">
                <div class="legend-item">
                    <div class="legend-seat available"></div>
                    <span>Available</span>
                </div>
                <div class="legend-item">
                    <div class="legend-seat occupied"></div>
                    <span>Occupied</span>
                </div>
                <div class="legend-item">
                    <div class="legend-seat selected"></div>
                    <span>Selected</span>
                </div>
            </div>
            
            <div class="selected-seats">
                <p>Selected seats: <span id="selectedSeatsDisplay">None</span></p>
            </div>
        </div>
        
        <div class="booking-navigation">
            <button class="btn-back" onclick="showStep3()">Back</button>
            <button class="btn-next" id="proceedToPrice" onclick="showStep5()" disabled>Next</button>
        </div>
    `

  addSeatMapStyles()
}

function generateSeatMap() {
  let seatMap = ""
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

  for (const row of rows) {
    for (let seatNum = 1; seatNum <= 10; seatNum++) {
      const seatId = `${row}${seatNum}`
      const isOccupied = Math.random() < 0.3 // 30% chance of being occupied
      const seatClass = isOccupied ? "seat occupied" : "seat available"

      seatMap += `<div class="${seatClass}" data-seat="${seatId}" onclick="selectSeat('${seatId}')">${seatId}</div>`
    }
  }

  return seatMap
}

function selectSeat(seatId) {
  const seatElement = document.querySelector(`[data-seat="${seatId}"]`)

  if (seatElement.classList.contains("occupied")) {
    return // Can't select occupied seats
  }

  if (seatElement.classList.contains("selected")) {
    // Deselect seat
    seatElement.classList.remove("selected")
    seatElement.classList.add("available")
    currentBooking.seats = currentBooking.seats.filter((seat) => seat !== seatId)
  } else {
    // Select seat (if not exceeding ticket count)
    if (currentBooking.seats.length < currentBooking.ticketCount) {
      seatElement.classList.remove("available")
      seatElement.classList.add("selected")
      currentBooking.seats.push(seatId)
    } else {
      alert(`You can only select ${currentBooking.ticketCount} seat(s)`)
      return
    }
  }

  updateSelectedSeatsDisplay()
  updateProceedButton()
}

function updateSelectedSeatsDisplay() {
  const display = document.getElementById("selectedSeatsDisplay")
  if (display) {
    display.textContent = currentBooking.seats.length > 0 ? currentBooking.seats.join(", ") : "None"
  }
}

function updateProceedButton() {
  const proceedBtn = document.getElementById("proceedToPrice")
  if (proceedBtn) {
    proceedBtn.disabled = currentBooking.seats.length !== currentBooking.ticketCount
  }
}

function showStep5() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  const ticketTotal = currentBooking.ticketCount * TICKET_PRICE

  content.innerHTML = `
        <div class="booking-header">
            <h2>Book Tickets - ${currentBooking.movieTitle}</h2>
            <div class="step-indicator">
                <div class="step completed">1</div>
                <div class="step completed">2</div>
                <div class="step completed">3</div>
                <div class="step completed">4</div>
                <div class="step active">5</div>
                <div class="step">6</div>
                <div class="step">7</div>
            </div>
        </div>
        
        <div class="booking-step">
            <h3>Step 5: Price Summary</h3>
            
            <div class="order-summary">
                <h4>Order Summary</h4>
                <div class="summary-item">
                    <span>Movie:</span>
                    <span>${currentBooking.movieTitle}</span>
                </div>
                <div class="summary-item">
                    <span>Cinema:</span>
                    <span>Sinéfolis ${currentBooking.cinema}</span>
                </div>
                <div class="summary-item">
                    <span>Date & Time:</span>
                    <span>${new Date(currentBooking.date).toLocaleDateString()} at ${currentBooking.time}</span>
                </div>
                <div class="summary-item">
                    <span>Seats:</span>
                    <span>${currentBooking.seats.join(", ")}</span>
                </div>
                <div class="summary-item">
                    <span>Tickets (${currentBooking.ticketCount}x):</span>
                    <span>${formatCurrency(ticketTotal)}</span>
                </div>
                <div class="summary-total">
                    <span>Total:</span>
                    <span>${formatCurrency(ticketTotal)}</span>
                </div>
            </div>
        </div>
        
        <div class="booking-navigation">
            <button class="btn-back" onclick="showStep4()">Back</button>
            <button class="btn-next" onclick="showStep6()">Add Food & Beverages</button>
            <button class="btn-next" onclick="skipToPayment()">Continue Without Food</button>
        </div>
    `

  currentBooking.totalPrice = ticketTotal
}

function showStep6() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  content.innerHTML = `
        <div class="booking-header">
            <h2>Book Tickets - ${currentBooking.movieTitle}</h2>
            <div class="step-indicator">
                <div class="step completed">1</div>
                <div class="step completed">2</div>
                <div class="step completed">3</div>
                <div class="step completed">4</div>
                <div class="step completed">5</div>
                <div class="step active">6</div>
                <div class="step">7</div>
            </div>
        </div>
        
        <div class="booking-step">
            <h3>Step 6: Food & Beverages (Optional)</h3>
            
            <div class="food-menu">
                ${foodMenu
                  .map(
                    (item) => `
                    <div class="food-item">
                        <img src="${item.image}" alt="${item.name}">
                        <h4>${item.name}</h4>
                        <p class="price">${formatCurrency(item.price)}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="changeFoodQuantity('${item.id}', -1)">-</button>
                            <span id="qty-${item.id}">0</span>
                            <button class="quantity-btn" onclick="changeFoodQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            
            <div class="food-total">
                <h4>Food & Beverages Total: <span id="foodTotal">${formatCurrency(0)}</span></h4>
            </div>
        </div>
        
        <div class="booking-navigation">
            <button class="btn-back" onclick="showStep5()">Back</button>
            <button class="btn-next" onclick="showStep7()">Proceed to Payment</button>
        </div>
    `
}

function changeFoodQuantity(itemId, change) {
  const qtyElement = document.getElementById(`qty-${itemId}`)
  const currentQty = Number.parseInt(qtyElement.textContent)
  const newQty = Math.max(0, currentQty + change)

  qtyElement.textContent = newQty

  // Update booking data
  const existingItem = currentBooking.foodItems.find((item) => item.id === itemId)
  const menuItem = foodMenu.find((item) => item.id === itemId)

  if (existingItem) {
    if (newQty === 0) {
      currentBooking.foodItems = currentBooking.foodItems.filter((item) => item.id !== itemId)
    } else {
      existingItem.quantity = newQty
    }
  } else if (newQty > 0) {
    currentBooking.foodItems.push({
      id: itemId,
      name: menuItem.name,
      price: menuItem.price,
      quantity: newQty,
    })
  }

  updateFoodTotal()
}

function updateFoodTotal() {
  const foodTotal = currentBooking.foodItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  document.getElementById("foodTotal").textContent = formatCurrency(foodTotal)
}

function skipToPayment() {
  currentBooking.step = 7
  showStep7()
}

function showStep7() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  const ticketTotal = currentBooking.ticketCount * TICKET_PRICE
  const foodTotal = currentBooking.foodItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
  const subtotal = ticketTotal + foodTotal

  content.innerHTML = `
        <div class="booking-header">
            <h2>Book Tickets - ${currentBooking.movieTitle}</h2>
            <div class="step-indicator">
                <div class="step completed">1</div>
                <div class="step completed">2</div>
                <div class="step completed">3</div>
                <div class="step completed">4</div>
                <div class="step completed">5</div>
                <div class="step completed">6</div>
                <div class="step active">7</div>
            </div>
        </div>
        
        <div class="booking-step">
            <h3>Step 7: Confirmation & Payment</h3>
            
            <div class="order-summary">
                <h4>Complete Order Summary</h4>
                <div class="summary-item">
                    <span>Movie:</span>
                    <span>${currentBooking.movieTitle}</span>
                </div>
                <div class="summary-item">
                    <span>Cinema:</span>
                    <span>Sinéfolis ${currentBooking.cinema}</span>
                </div>
                <div class="summary-item">
                    <span>Date & Time:</span>
                    <span>${new Date(currentBooking.date).toLocaleDateString()} at ${currentBooking.time}</span>
                </div>
                <div class="summary-item">
                    <span>Seats:</span>
                    <span>${currentBooking.seats.join(", ")}</span>
                </div>
                <div class="summary-item">
                    <span>Tickets (${currentBooking.ticketCount}x):</span>
                    <span>${formatCurrency(ticketTotal)}</span>
                </div>
                ${currentBooking.foodItems
                  .map(
                    (item) => `
                    <div class="summary-item">
                        <span>${item.name} (${item.quantity}x):</span>
                        <span>${formatCurrency(item.price * item.quantity)}</span>
                    </div>
                `,
                  )
                  .join("")}
                <div class="summary-subtotal">
                    <span>Subtotal:</span>
                    <span id="subtotalAmount">${formatCurrency(subtotal)}</span>
                </div>
                <div class="summary-discount hidden" id="discountRow">
                    <span>Discount:</span>
                    <span id="discountAmount">-${formatCurrency(0)}</span>
                </div>
                <div class="summary-total">
                    <span>Final Total:</span>
                    <span id="finalTotal">${formatCurrency(subtotal)}</span>
                </div>
            </div>
            
            <div class="voucher-section">
                <h4>Voucher/Promo Code</h4>
                <div class="voucher-input">
                    <input type="text" id="voucherCode" placeholder="Enter promo code">
                    <button class="apply-voucher" onclick="applyVoucher()">Apply</button>
                </div>
                <div id="voucherMessage"></div>
            </div>
            
            <div class="payment-section">
                <h4>Payment Method</h4>
                <div class="payment-methods">
                    <div class="payment-option" onclick="selectPayment('credit')">
                        <i class="fas fa-credit-card"></i>
                        <span>Credit Card</span>
                    </div>
                    <div class="payment-option" onclick="selectPayment('bank')">
                        <i class="fas fa-university"></i>
                        <span>Bank Transfer</span>
                    </div>
                    <div class="payment-option" onclick="selectPayment('ewallet')">
                        <i class="fas fa-mobile-alt"></i>
                        <span>E-Wallet</span>
                    </div>
                    <div class="payment-option" onclick="selectPayment('qris')">
                        <i class="fas fa-qrcode"></i>
                        <span>QRIS</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="booking-navigation">
            <button class="btn-back" onclick="showStep6()">Back</button>
            <button class="btn-next" id="payNowBtn" onclick="processPayment()" disabled>Pay Now</button>
        </div>
    `

  currentBooking.totalPrice = subtotal
}

function applyVoucher() {
  const voucherInput = document.getElementById("voucherCode")
  const voucherCode = voucherInput.value.trim().toUpperCase()
  const messageDiv = document.getElementById("voucherMessage")

  if (!voucherCode) {
    messageDiv.innerHTML = '<p style="color: #f44336;">Please enter a voucher code</p>'
    return
  }

  const voucher = validVoucherCodes[voucherCode]

  if (!voucher) {
    messageDiv.innerHTML = '<p style="color: #f44336;">Invalid voucher code</p>'
    return
  }

  // Calculate discount
  const ticketTotal = currentBooking.ticketCount * TICKET_PRICE
  const foodTotal = currentBooking.foodItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
  const subtotal = ticketTotal + foodTotal

  let discountAmount = 0

  if (voucher.type === "fixed") {
    discountAmount = Math.min(voucher.discount, subtotal)
  } else {
    discountAmount = subtotal * voucher.discount
  }

  const finalTotal = Math.max(0, subtotal - discountAmount)

  // Update display
  document.getElementById("discountRow").classList.remove("hidden")
  document.getElementById("discountAmount").textContent = `-${formatCurrency(discountAmount)}`
  document.getElementById("finalTotal").textContent = formatCurrency(finalTotal)

  messageDiv.innerHTML = `<p style="color: #4caf50;">Voucher applied: ${voucher.description}</p>`

  currentBooking.totalPrice = finalTotal
  currentBooking.voucher = {
    code: voucherCode,
    discount: discountAmount,
    description: voucher.description,
  }
}

function selectPayment(method) {
  // Update visual selection
  document.querySelectorAll(".payment-option").forEach((option) => {
    option.classList.remove("selected")
  })
  event.target.closest(".payment-option").classList.add("selected")

  currentBooking.paymentMethod = method

  // Enable pay button
  document.getElementById("payNowBtn").disabled = false
}

function processPayment() {
  if (!currentBooking.paymentMethod) {
    alert("Please select a payment method")
    return
  }

  const payBtn = document.getElementById("payNowBtn")
  const originalText = payBtn.innerHTML

  payBtn.disabled = true
  payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'

  // Simulate payment processing
  setTimeout(() => {
    payBtn.innerHTML = originalText

    // Show success message
    showPaymentSuccess()

    // Save booking to localStorage
    saveBooking()
  }, 3000)
}

function showPaymentSuccess() {
  const content = document.getElementById("bookingContent")
  if (!content) return

  content.innerHTML = `
        <div class="payment-success">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Payment Successful!</h2>
            <p>Your booking has been confirmed.</p>
            
            <div class="booking-confirmation">
                <h3>Booking Details</h3>
                <div class="confirmation-item">
                    <span>Booking ID:</span>
                    <span><strong>${generateBookingId()}</strong></span>
                </div>
                <div class="confirmation-item">
                    <span>Movie:</span>
                    <span>${currentBooking.movieTitle}</span>
                </div>
                <div class="confirmation-item">
                    <span>Cinema:</span>
                    <span>Sinéfolis ${currentBooking.cinema}</span>
                </div>
                <div class="confirmation-item">
                    <span>Date & Time:</span>
                    <span>${new Date(currentBooking.date).toLocaleDateString()} at ${currentBooking.time}</span>
                </div>
                <div class="confirmation-item">
                    <span>Seats:</span>
                    <span>${currentBooking.seats.join(", ")}</span>
                </div>
                <div class="confirmation-item">
                    <span>Total Paid:</span>
                    <span><strong>${formatCurrency(currentBooking.totalPrice)}</strong></span>
                </div>
            </div>
            
            <div class="success-actions">
                <button class="btn-primary" onclick="closeBookingModal()">
                    <i class="fas fa-times"></i>
                    Close
                </button>
                <button class="btn-download" onclick="downloadTicket()">
                    <i class="fas fa-download"></i>
                    Download Ticket
                </button>
            </div>
        </div>
    `

  addSuccessStyles()
}

function generateBookingId() {
  return "SF" + Date.now().toString().slice(-8)
}

function saveBooking() {
  const bookings = JSON.parse(localStorage.getItem("sinefolisBookings") || "[]")
  const booking = {
    ...currentBooking,
    bookingId: generateBookingId(),
    timestamp: new Date().toISOString(),
  }
  bookings.push(booking)
  localStorage.setItem("sinefolisBookings", JSON.stringify(bookings))
}

function downloadTicket() {
  // Create a simple ticket text
  const ticketText = `
SINÉFOLIS CINEMAS
E-TICKET

Booking ID: ${generateBookingId()}
Movie: ${currentBooking.movieTitle}
Cinema: Sinéfolis ${currentBooking.cinema}
Date: ${new Date(currentBooking.date).toLocaleDateString()}
Time: ${currentBooking.time}
Seats: ${currentBooking.seats.join(", ")}
Total: ${formatCurrency(currentBooking.totalPrice)}

Thank you for choosing Sinéfolis!
    `

  // Create and download file
  const blob = new Blob([ticketText], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `sinefolis-ticket-${generateBookingId()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

function addSeatMapStyles() {
  if (document.getElementById("seatMapStyles")) return

  const style = document.createElement("style")
  style.id = "seatMapStyles"
  style.textContent = `
        .screen-indicator {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .screen {
            background: linear-gradient(45deg, #333, #666);
            color: white;
            padding: 0.5rem 2rem;
            border-radius: 20px;
            display: inline-block;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        
        .seat-map {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 0.5rem;
            max-width: 500px;
            margin: 0 auto 2rem;
            padding: 2rem;
            background: #f5f5f5;
            border-radius: 15px;
        }
        
        .seat {
            width: 35px;
            height: 35px;
            border: 2px solid #ccc;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
        }
        
        .seat.available {
            background: white;
            border-color: #4caf50;
            color: #4caf50;
        }
        
        .seat.available:hover {
            background: #e8f5e8;
            transform: scale(1.1);
        }
        
        .seat.occupied {
            background: #f44336;
            border-color: #f44336;
            color: white;
            cursor: not-allowed;
        }
        
        .seat.selected {
            background: #e91e63;
            border-color: #e91e63;
            color: white;
            transform: scale(1.1);
        }
        
        .seat-legend {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }
        
        .legend-seat {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 2px solid;
        }
        
        .legend-seat.available {
            background: white;
            border-color: #4caf50;
        }
        
        .legend-seat.occupied {
            background: #f44336;
            border-color: #f44336;
        }
        
        .legend-seat.selected {
            background: #e91e63;
            border-color: #e91e63;
        }
        
        .selected-seats {
            text-align: center;
            margin-bottom: 2rem;
            font-weight: 500;
        }
        
        @media screen and (max-width: 768px) {
            .seat-map {
                grid-template-columns: repeat(8, 1fr);
                gap: 0.3rem;
                padding: 1rem;
            }
            
            .seat {
                width: 28px;
                height: 28px;
                font-size: 0.7rem;
            }
            
            .seat-legend {
                flex-direction: column;
                gap: 0.5rem;
                align-items: center;
            }
        }
    `
  document.head.appendChild(style)
}

function addSuccessStyles() {
  if (document.getElementById("successStyles")) return

  const style = document.createElement("style")
  style.id = "successStyles"
  style.textContent = `
        .payment-success {
            text-align: center;
            padding: 2rem;
        }
        
        .success-icon {
            font-size: 4rem;
            color: #4caf50;
            margin-bottom: 1rem;
        }
        
        .payment-success h2 {
            color: #4caf50;
            margin-bottom: 1rem;
        }
        
        .booking-confirmation {
            background: #f5f5f5;
            padding: 2rem;
            border-radius: 15px;
            margin: 2rem 0;
            text-align: left;
        }
        
        .booking-confirmation h3 {
            color: #e91e63;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .confirmation-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .success-actions {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        @media screen and (max-width: 768px) {
            .success-actions {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
            
            .success-actions .btn-primary,
            .success-actions .btn-download {
                width: 100%;
                max-width: 250px;
            }
        }
    `
  document.head.appendChild(style)
}

// Close booking modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("bookingModal")
  if (modal && e.target === modal) {
    closeBookingModal()
  }
})

// Export functions for use in other files
window.BookingUtils = {
  startBooking,
  closeBookingModal,
}
