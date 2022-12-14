const router = require('express').Router();
const api = require('../services/furniture');

router.get('/',  async (req, res) => {
  const data = await api.getAll();
  res.json(data); 
});

router.post('/', async (req, res) => {
    const item = {
    make: req.body.make,
  model: req.body.model,
  year:req.body.year,
  description:req.body.description,
  price:req.body.price,
  img:req.body.img,
  material: req.body.material
    }

    try {
const result = await api.create(item);
res.status(201).json(result);
    }catch {
console.error(err.message);
res.status(400).json( { message: err.message})
    }
});

router.get('/:id', (req, res) => {
    console.log('read record');
    res.end();
});

router.put('/:id', (req, res) => {
    console.log('update record');
    res.end();
});

router.delete('/:id', (req, res) => {
    console.log('delete record');
    res.end();
});

module.exports = router;