import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Categories from '../models/categoriesModel.js';
import data from '../data.js';
// import { isAdmin, isAuth } from '../utils.js';

const categoriesRouter = express.Router()

categoriesRouter.get('/seed',
  expressAsyncHandler(async (req, res) => {
    //remove previous data
    // await User.remove({})
    const createdCategories = await Categories.insertMany(data.categories)
    res.send({createdCategories})
  })
)

categoriesRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = await Categories.find({});
    res.send(category);
  })
);

categoriesRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const category = await Categories.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);

categoriesRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = new Categories({
      name: req.body.newData.name,
      image: req.body.newData.image,
    });
    const createdCategories = await category.save();
    res.send({
      _id: createdCategories._id,
      name: createdCategories.name,
      image: createdCategories.image,
    });
  })
);

categoriesRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const category = await Categories.findById(req.params.id);
    if (category) {
      const deleteCategory = await category.remove();
      res.send({ message: 'Categories Deleted', category: deleteCategory });
    } else {
      res.status(404).send({ message: 'Categories Not Found' });
    }
  })
);

categoriesRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Categories.findById(categoryId);
    if (category) {
      category.name = req.body.name;
      category.image = req.body.image;
      const updatedCategory = await category.save();
      res.send({ message: 'category Updated', category: updatedCategory });
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);


export default categoriesRouter