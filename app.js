require('dotenv').config();
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const { Server } = require('socket.io');
const path = require('path');
const ProductManager = require('./helpers/productManager');
const manager = new ProductManager('./db/products.json');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', require('./routes/app.router'));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const httpSever = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const socketServer = new Server(httpSever);

socketServer.on('connection', async ( socket ) => {
    console.log('User connected: ', socket.id);

    socket.emit('get_products', await manager.getItems());
})