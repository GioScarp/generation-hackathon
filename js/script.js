const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

const productsList = document.querySelector(".container-items");

let allProducts = [];

const valorTotal = document.querySelector('.total-pagar')

const countProduct = document.querySelector('#contador-productos')

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');


productsList.addEventListener("click", e => {
  if (e.target.classList.contains("btn-add-cart")) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h3").textContent,
      price: product.querySelector("p").textContent,
    };

    const exits = allProducts.some(product => product.title === infoProduct.title)

    if(exits) {
        const products = allProducts.map(product => {
            if(product.title === infoProduct.title){
                product.quantity++;
                return product
            } else {
                return product
            }
        })
        allProducts = [...products]
    } else{
        allProducts = [...allProducts, infoProduct];
    }

   

    showHTML();
  }
  
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		console.log(product);
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);


		showHTML();
	}

    console.log(allProducts);
});

const showHTML = () => {

	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}
    
    rowProduct.innerHTML = ''

    let total = 0;
    let totalOfProducs = 0;


  allProducts.forEach(product => {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');

    containerProduct.innerHTML = `
        <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
    </div>
    <i class=" icon-close fas fa-close"></i>
    `

    rowProduct.append(containerProduct)

    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducs = totalOfProducs + product.quantity;
  })

  valorTotal.innerText = `$${total}`;
  countProduct.innerText = totalOfProducs;
};
