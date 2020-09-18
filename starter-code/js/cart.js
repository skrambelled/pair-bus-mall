/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  
  var tableEl = document.getElementById('cart');
  var tbodyEl = tableEl.getElementsByTagName('tbody')[0];
  console.log(tbodyEl);
  var rowEl;
  var deleteEl;
  var quantityEl;
  var itemEl;
  var itemImageEl;
// Iterate over the items in the cart
  for (var i = 0; i < cart.items.length; i++){
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
    quantityEl.textContent = (cart.items.items[i].quantity);
    itemImageEl.src = Product.allProducts[i].filePath; 
    
  }
}

function removeItemFromCart(event) {
  console.log(event.target);
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
