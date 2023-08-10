const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single tag by Id
router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }]
    });

    if(!tagsData) {
      res.status(404).json({ message: 'No tags found with this Id!'});
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a tag by Id
router.put('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id);

    if (!tagsData) {
      res.statusMessage(404).json({ message: 'No tags found with this Id!'});
      return;
    }
    await tagsData.update(req.body);
    
    res.status(200).json({ message: 'Tag updated successfully!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by Id
router.delete('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagsData) {
      res.status(404).json({ message: 'No tags found with this Id!'});
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
