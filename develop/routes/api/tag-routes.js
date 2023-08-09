const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//GET all tags
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

// GET a single tag
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }]
    });

    if(!tagsData) {
      res.status(404).json({ message: 'No tags found with this name!'});
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

// CREATE a new tag
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a tag
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsData = await Tag.findByPk(req.params.id);

    if (!tagsData) {
      res.statusMessage(404).json({ message: 'No tags found with this name! '});
      return;
    }
    await tagsData.update(req.body);
    
    res.status(200).json({ message: 'Tag updated successfully!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagsData) {
      res.status(404).json({ message: 'No tags found with this name!'});
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
