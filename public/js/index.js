const socket = io();
const productsContainer = document.getElementById('products');
const postForm = document.getElementById('form');

socket.on('get_products', products => {
    console.log(products);
    productsContainer.innerHTML = products.map(product => {
        return `
        <div class="product">
            <p>${product.name}</p>
            <p>${product.price}</p>
            <p>${product.description}</p>
            <p>${product.code}</p> 
            <p>${product.status}</p>
            <p>${product.category}</p>
            <p>${product.thumbnail}</p>
        </div>
        `
    }).join(' ');
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const code = e.target.code.value;
    const status = e.target.status.value;
    const category = e.target.category.value;
    const thumbnail = e.target.thumbnail.value;

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            price,
            description,
            code,
            status,
            category,
            thumbnail
        })
    })
    .then(res => res.json())
    .then(() => postForm.reset())
});