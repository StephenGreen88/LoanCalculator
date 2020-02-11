// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show Loader
  document.getElementById('loading').style.display = 'block';

  // Show Results after two seconds
  setTimeout(calculatedResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculatedResults() {

  // UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  const principal = parseFloat(amount.value); // <-- captures the value entered into the loan amount input
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12; // <-- captures years input * 12

  // Compute Monthly Payment 
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Check to see if the number is finite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); // <-- if finite, captures and displays value
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show Results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Hide Loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div'); // <-- dynamically creates a div

  // Get Elements
  const card = document.querySelector('.card'); // <-- selects the card class from the DOM
  const heading = document.querySelector('.heading'); // <-- selects the heading class from the DOM

  // Add Class
  errorDiv.className = 'alert alert-danger'; // <-- creates an alert with red text and body

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error)); // <-- takes the newly created errorDiv and inserts a text node

  // Insert error above heading
  card.insertBefore(errorDiv, heading); // <-- call a parent (line 37) and put in the element you want to insert (errorDiv) and then put in whatever you want to insert it before (heading)

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove(); // <-- grabs the alert class and removes it after three seconds
}