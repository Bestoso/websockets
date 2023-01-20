const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        title: 'Real Time Products'
    })
})

module.exports = router;