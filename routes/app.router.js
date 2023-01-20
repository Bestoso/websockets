const { Router } = require('express');
const productsRouter = require('./products/products.routes');
const usersRouter = require('./users/users.routes');
const staticRouter = require('./static/static.routes');

const router = Router();

router.use('/api', productsRouter);
router.use('/api', usersRouter);

// static routes
router.use('/', staticRouter);

module.exports = router;