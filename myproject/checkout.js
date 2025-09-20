// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const orderItemsContainer = document.getElementById('order-items-container');
const orderTotalElem = document.getElementById('order-total');
const checkoutForm = document.getElementById('checkout-form');
const orderSuccess = document.getElementById('order-success');

function renderOrderItems() {
  orderItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    orderItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    orderTotalElem.textContent = '';
    checkoutForm.style.display = 'none';
    return;
  }

  checkoutForm.style.display = 'block';

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'd-flex justify-content-between align-items-center mb-3 border rounded p-3';

    itemDiv.innerHTML = `
      <div>
        <h5>${item.title}</h5>
        <p class="mb-1">$${item.price.toFixed(2)} each</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div class="fw-bold">
        $${(item.price * item.quantity).toFixed(2)}
      </div>
    `;

    orderItemsContainer.appendChild(itemDiv);
  });

  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  orderTotalElem.innerHTML = `
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Tax (15%): $${tax.toFixed(2)}</p>
    <p class="fw-bold">Total: $${total.toFixed(2)}</p>
  `;
}


function isExpiryDateValid(expiry) {
  if (!expiry) {
    alert("Expiry date is required.");
    return false;
  }

  const match = expiry.match(/^(\d{2})\/?(\d{2})$/);
  if (!match) {
    alert("Expiry date format is invalid. Please use MM/YY.");
    return false;
  }

  const month = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);

  if (month < 1 || month > 12) {
    alert("Expiry month must be between 01 and 12.");
    return false;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    alert("Expiry date has already passed.");
    return false;
  }

  return true;
}


checkoutForm.addEventListener('submit', e => {
  e.preventDefault();

  if (!checkoutForm.checkValidity()) {
    checkoutForm.classList.add('was-validated');
    return;
  }

  const expiryDateInput = document.getElementById('expiryDate');
  if (!isExpiryDateValid(expiryDateInput.value)) {
    expiryDateInput.classList.add('is-invalid');
    expiryDateInput.focus();
    return;
  } else {
    expiryDateInput.classList.remove('is-invalid');
  }

  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
});



  localStorage.removeItem('cart');
  cart = [];

  checkoutForm.style.display = 'none';
  orderItemsContainer.innerHTML = '';
  orderTotalElem.textContent = '';

  orderSuccess.classList.remove('d-none');

});

renderOrderItems();
