function calcCartPriceAndDelivery() {
  const cartWrapper = document.querySelector('.cart-wrapper');
  const cartItems = document.querySelectorAll('.cart-item');

  const totalPriceEl = document.querySelector('.total-price');
  const deliveryCost = document.querySelector('.delivery-cost');
  const cartDelivery = document.querySelector('[data-cart-delivery]');

  let totalPrice = 0;


  cartItems.forEach(function (item) {

    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.price__currency');

    const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);

    totalPrice += currentPrice;

  });

  if (totalPrice < 20) {
    totalPriceEl.innerText = 0;
  } else if (totalPrice < 60) {
    totalPriceEl.innerText = totalPrice + 25;
  } else {
    totalPriceEl.innerText = totalPrice;
  }

  if (totalPrice > 0) {
    cartDelivery.classList.remove('none');
  } else {
    cartDelivery.classList.add('none');
  }

  if (totalPrice >= 60) {

    deliveryCost.classList.add('free');
    deliveryCost.innerText = 'free';
  } else {
    deliveryCost.classList.remove('free');
    deliveryCost.innerText = '25 $';
  }
}

function toggleCartStatus() {

  const cartWrapper = document.querySelector('.cart-wrapper');
  const cartEmptyBadge = document.querySelector('[data-cart-empty]');
  const orderForm = document.querySelector('#order-form');

  if (cartWrapper.children.length > 0) {
    cartEmptyBadge.classList.add('none');
    orderForm.classList.remove('none');
  } else {
    cartEmptyBadge.classList.remove('none');
    orderForm.classList.add('none');
  }
}

window.addEventListener('click', function (event) {

  let counter;

  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {

    const counterWrapper = event.target.closest('.counter-wrapper');

    counter = counterWrapper.querySelector('[data-counter]');

  }


  if (event.target.dataset.action === 'plus') {
    counter.innerText = ++counter.innerText;
  }

  if (event.target.dataset.action === 'minus') {

    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {

      event.target.closest('.cart-item').remove();

      toggleCartStatus();

      calcCartPriceAndDelivery();
    }

  }

  if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
    calcCartPriceAndDelivery();
  }
});

const cartWrapper = document.querySelector('.cart-wrapper');

window.addEventListener('click', function (event) {

  if (event.target.hasAttribute('data-cart')) {

    const card = event.target.closest('.card');

    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector('.product-img').getAttribute('src'),
      title: card.querySelector('.item-title').innerText,
      itemsInBox: card.querySelector('[data-items-in-box]').innerText,
      weight: card.querySelector('.price__weight').innerText,
      price: card.querySelector('.price__currency').innerText,
      counter: card.querySelector('[data-counter]').innerText,
    };

    const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

    if (itemInCart) {
      const counterEl = itemInCart.querySelector('[data-counter]');
      counterEl.innerText = parseInt(counterEl.innerText) + parseInt(productInfo.counter);
    } else {

      const cartItemHTML = `
			<div class="cart-item" data-id="${productInfo.id}">
										<div class="cart-item__top">
											<div class="cart-item__img">
												<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
											</div>
											<div class="cart-item__desc">
												<div class="cart-item__title">${productInfo.title}</div>
												<div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
	
												<!-- cart-item__details -->
												<div class="cart-item__details">
	
													<div class="items items--small counter-wrapper">
														<div class="items__control" data-action="minus">-</div>
														<div class="items__current" data-counter="">${productInfo.counter}</div>
														<div class="items__control" data-action="plus">+</div>
													</div>
	
													<div class="price">
														<div class="price__currency">${productInfo.price}</div>
													</div>
	
												</div>
	
											</div>
										</div>
									</div>
			`;

      cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
    }

    card.querySelector('[data-counter]').innerText = '1';

    toggleCartStatus();

    calcCartPriceAndDelivery();
  }

});

