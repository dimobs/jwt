const router = require('express').Router();
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/furniture');
const mapErrors = require('../utils/mapper');

router.get('/', async (req, res) => {
    console.log('gettt from catalog 8');
    const data = await api.getAll();
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => {
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
        owener: req.user_id
    }

    try {
        const result = await api.create(item);
        res.status(201).json(result);
    } catch {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error })
    }
});

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
       
    }
    const result = await api.update(itemId, item);
    res.status(200).json(result)
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    await api.deleteById(itemId);
    res.status(204).end();
});

module.exports = router;