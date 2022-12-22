const router = require('express').Router();
const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/users');
const { logout } = require('../services/users');

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == "") {
            throw new Error('Email or password are required')
        }

        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim())
        res.status(201).json(result);

    } catch (err) {
        console.error = mapErrors(err);
        const error = mapErrors(err)
        res.status(400).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim())
        res.status(200).json(result);

    } catch (err) {
        console.error = mapErrors(err);
        const error = mapErrors(err)
        res.status(400).json({ message: error });
    }
});


router.get('/logout', (req, res) => {
logout(req.user?.token );
    res.status(204).end();
});

module.exports = router;