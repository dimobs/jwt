const router = require('express').Router();

router.post('/register', (req, res) => {
    console.log('register');
    res.end();
});

router.post('/login', (req, res) => {
    console.log('login');
    res.end();
});

router.get('/logout', (req, res) => {
    console.log('logout');
    res.end();
});

module.exports = router;