/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  var cartArr = [];

  var product;
  var quantity;

  console.log(cartItems);

  if (cartItems.items) {
    for (var i = 0; i < cartItems.items.length; i++) {
      product = cartItems.items[i]['product'];
      quantity = cartItems.items[i]['quantity'];

      cartArr.push(new CartItem(product, quantity));
    }
  }

  cart = new Cart(cartArr);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tbodyEl = table.getElementsByTagName('tbody')[0];
  tbodyEl.innerHTML = null;
}

// Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  var tbodyEl = table.getElementsByTagName('tbody')[0];
  console.log(tbodyEl);
  var rowEl;
  var deleteEl;
  var quantityEl;
  var itemEl;
  var itemImageEl;
  // Iterate over the items in the cart
  for (var i = 0; i < cart.items.length; i++) {
    // Create a TR
    rowEl = document.createElement('tr');
    tbodyEl.append(rowEl);

    // Create a TD for the delete link, quantity,  and the item
    deleteEl = document.createElement('td');
    rowEl.append(deleteEl);
    quantityEl = document.createElement('td');
    rowEl.append(quantityEl);
    itemEl = document.createElement('td');
    rowEl.append(itemEl);
    itemImageEl = document.createElement('img');
    itemEl.append(itemImageEl);

    deleteEl.addEventListener('click', removeItemFromCart);
    deleteEl.textContent = 'x';
    quantityEl.textContent = (cart.items[i].quantity);
    for (var j = 0; j < Product.allProducts.length; j++) {
      if (cart.items[i].product === Product.allProducts[j].name) {
        itemImageEl.src = Product.allProducts[j].filePath;
        itemImageEl.product = cart.items[i].product;
        break;
      }
    }

  }
}

function removeItemFromCart(event) {
  var remove = event.target.nextElementSibling.nextElementSibling.firstElementChild.product;
  for (var i = 0; i < cart.items.length; i++) {
    if (cart.items[i].product === remove) {
      cart.removeItem(cart.items[i]);
    }
  }

  // console.log(event.target.getElementSibling.getElementsSibling.getElementsByTagName('img')[0]);

  // Save the cart back to local storage
  cart.saveToLocalStorage()

  renderCart();
  // TODO: Re-draw the cart table
}


// This form is quite ugly! Needs better verification, but it'll do for now.
function generateCustomerForm() {
  var main = document.getElementsByTagName('main')[0];

  var section = document.createElement('section');
  main.append(section);

  var form = document.createElement('form');
  section.append(form);
  form.id = "customerForm";

  var fieldset = document.createElement('fieldset');
  form.append(fieldset);

  var legend = document.createElement('legend');
  fieldset.append(legend);
  legend.textContent = 'Order now!'

  var inputs = {
    name: "[A-Za-z]+",
    street: "[A-Za-z]+",
    city: "[A-Za-z]+",
    state: "[A-Z]{2}",
    zip: "[0-9]{5}",
    phone: "[0-9]{10}",
    cc: "[0-9]{16}"
  }

  var keys = Object.keys(inputs);

  var label;
  var input;
  for (let i = 0; i < keys.length; i++) {
    label = document.createElement('label');
    fieldset.append(label);
    label.for = "f" + keys[i];
    label.textContent = keys[i];

    input = document.createElement('input')
    label.append(input);
    input.type = "text";
    input.id = "f" + keys[i];
    input.name = "f" + keys[i];
    input.required = true;
    input.pattern = inputs[keys[i]];
  }

  // process order button
  var submit = document.createElement('button');
  fieldset.append(submit);
  submit.textContent = "Process order";


  // clear and animation upon submit
  form.addEventListener('submit', makeAnimation);

}

var makeAnimation = function (event) {
  event.preventDefault();
  console.log(event.target);

  var form = document.getElementsByTagName('form')[0].innerHTML = null;

  var main = document.getElementsByTagName('main')[0];
  var section = document.createElement('section');
  main.append(section);
  var thing = document.createElement('animated');
  section.append(thing);
  thing.textContent = "WINNER!";

}

// This will initialize the page and draw the cart on screen
renderCart();
generateCustomerForm();