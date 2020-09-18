/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  var option;

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    option = document.createElement('option');
    selectElement.append(option);
    option.value = Product.allProducts[i].name;
    option.textContent = Product.allProducts[i].name;
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  // console.log(event.target);
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  var item = document.getElementById('items').value;
  var quantity = parseInt(document.getElementById('quantity').value);

  cart.addItem(item, quantity);


  // console.log(item, quantity);
  // console.log(cart);
}

// Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var cartCount = document.getElementById('itemCount');
  var quantity = document.getElementById('quantity').value;

  console.log("cartCount: ", cartCount.textContent);

  if (!cartCount.textContent)
    cartCount.textContent = quantity;
  else
    cartCount.textContent = parseInt(cartCount.textContent) + parseInt(quantity);
}

// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var item = document.getElementById('items').value;
  var quantity = document.getElementById('quantity').value;

  var contentsEl = document.getElementById('cartContents');

  contentsEl.innerHTML = null;

  var itemEl = document.createElement('img');
  contentsEl.append(itemEl);

  var quantityEl = document.createElement('span');
  contentsEl.append(quantityEl);
  quantityEl.textContent = "x " + quantity;

  for (let i = 0; i < Product.allProducts.length; i++) {
    // console.log(Product.allProducts[i])
    if (item === Product.allProducts[i].name) {
      // console.log(Product.allProducts[i].filePath);
      itemEl.src = Product.allProducts[i].filePath;
      break;
    }
  }

  quantityEl.setAttribute("class", "roundEffect");

  console.log(Product.allProducts);
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
