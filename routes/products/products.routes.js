const { Router } = require('express');
const ProductManager = require('../../helpers/productManager');

const manager = new ProductManager('./db/products.json');

const router = Router();

router.get('/products', async (req, res) => {
    const products = await manager.getItems();
    const { limit } = req.query;
    if (!limit) {
        res.json({
            data: products
        });
    } else {
        res.json({
            data: products.slice(0, +limit)
        });
    }
});

router.post('/products', async (req, res) => {
    const newProd = req.body;
    const products = await manager.getItems();
    if (!newProd.name || !newProd.price
        || !newProd.description || !newProd.code
        || !newProd.status || !newProd.category
        || !newProd.thumbnail) {
        res.status(400).json({
            error: 'Bad request'
        });
    } else {
        await manager.addItem(newProd.name, newProd.price, newProd.description, newProd.code, newProd.status, newProd.category, newProd.thumbnail);
        res.json({
            data: products
        })
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const itemFound = await manager.findItemById(+id);
    if (!itemFound) {
        res.status(404).json({
            error: 'Not found'
        });
    } else {
        res.json({
            data: itemFound
        });
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const newProd = req.body;
    if (!newProd.name || !newProd.price) {
        res.status(400).json({
            error: 'Bad request'
        });
    } else {
        await manager.updateItem(+id, newProd.name, newProd.price);
        const itembyId = await manager.findItemById(+id);
        res.json({
            data: itembyId,
        })
    }
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const products = await manager.getItems();
    const itemFound = await manager.findItemById(+id);
    if (!itemFound) {
        res.status(404).json({
            error: 'Not found'
        });
    } else {
        await manager.deleteItem(+id);
        res.json({
            data: products
        })
    }
});

module.exports = router;