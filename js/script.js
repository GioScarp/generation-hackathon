
// Se inicializa las variables
const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(".container-cart-products");

const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

const productsList = document.querySelector(".container-items");

let allProducts = [];

const valorTotal = document.querySelector('.total-pagar')

const countProduct = document.querySelector('#contador-productos')

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');


// Se agrega un evento para ocultar el carrito de compras
btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

// Se agrega un evento al boton de agregar producto
// Para obtener la informaciòn del producto y mostrarlo en el carrito
productsList.addEventListener("click", e => {
    // Verificar si el elemento clicado (e.target) tiene la clase "btn-add-cart"
  if (e.target.classList.contains("btn-add-cart")) {
    // Obtener el elemento padre del botón (que debería ser el contenedor de producto)
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h3").textContent,
      price: product.querySelector("p").textContent,
    };

    // Verificar si ya existe un producto en el carrito con el mismo título que el producto actual
    const exits = allProducts.some(product => product.title === infoProduct.title)

    /* Se hace un flujo de control para aumentar la cantidad 
    del producto si existe ya en el carrito,
    si no se agrega al carrito de compras */
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


// Agregar un evento de clic al icono de eliminar
rowProduct.addEventListener('click', e => {
    // Verificar si el elemento clicado tiene la clase "icon-close"
	if (e.target.classList.contains('icon-close')) {
        // Obtener el elemento padre del icono
		const product = e.target.parentElement;
        // Obtener el título del producto dentro del contenedor
		const title = product.querySelector('p').textContent;

        // Filtrar la lista de productos para eliminar el producto con el título correspondiente
		allProducts = allProducts.filter(
			product => product.title !== title
		);

		showHTML();
	}

    console.log(allProducts);
});

// FUnciòn que muestra los productos agregados al carrito
const showHTML = () => {
    //Flujo de control para verificar si el carrito esta vacio
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

  // Iterar a través de los productos en allProducts
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

    //Se calcula el valor total de los productos
    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducs = totalOfProducs + product.quantity;
  })

  //Se actualiza los valores en la interfaz gràfica
  valorTotal.innerText = `$${total}`;
  countProduct.innerText = totalOfProducs;
};
