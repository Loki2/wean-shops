const Category = require("../models/category");
const mkdirp = require("mkdirp");


exports.get_categories = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const categories = await Category.find({}).sort({ createdAt: -1 });

    console.log("balalalalalal", categories);

    res.render('admin/category/index', {
      user: user,
      categories: categories
    })
  } catch (error) {
    next(error)
  }

}


exports.get_createCategory = async (req, res, next) => {
  try {
    res.render('admin/category/create')
  } catch (error) {
    next(error);
  }
}

exports.post_createCategory = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.categoryImage !== 'undefined' ? req.files.categoryImage.name : "";
    const { title, desc, icon, status } = req.body;


    const category = new Category({
      title: title,
      desc: desc,
      image: imageFile,
      icon: icon,
      status: status
    });

    await category.save(function (error) {
      if (error) return console.log(error);

      mkdirp.sync('./public/uploads/images/category/' + category._id);

      if (imageFile != "") {
        const cateImage = req.files.categoryImage;
        const path = './public/uploads/images/category/' + category._id + '/' + imageFile;

        cateImage.mv(path, function (error) {
          return console.log(error)
        })
      }
    });

    res.redirect('/admin/categories');
  } catch (error) {
    next(error)
  }
}

exports.get_updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById({ _id: id });

    res.render('admin/category/edit', {
      id: category._id,
      title: category.title,
      desc: category.desc,
      icon: category.icon,
      status: category.status
    })
  } catch (error) {
    next(error);
  }
}

exports.post_updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await category.update({ _id: id }, req.body);

    res.redirect('/admin/categories');

  } catch (error) {
    next(error);
  }
}

exports.get_deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await category.findByIdAndRemove(id);

    res.redirect('/admin/categories')

  } catch (error) {
    next(error);
  }
}