const Service = require('../models/category');
const Blog = require('../models/blog');
const mkdirp = require("mkdirp");

exports.get_blogs = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    // console.log("blogs:", blogs)

    res.render('admin/blog/index', {
      blogs: blogs
    })
  } catch (error) {
    next(error)
  }

}

exports.get_createBlog = async (req, res, next) => {
  try {
    const categories = await Service.find({}).sort({ createdAt: -1 });

    res.render('admin/blog/create', {
      categories: categories
    })
  } catch (error) {
    next(error);
  }
}

exports.post_createBlog = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.blogImage !== 'undefined' ? req.files.blogImage.name : "";
    const { title, content, status } = req.body;
    const category = req.body.category;

    const blog = new Blog({
      title: title,
      content: content,
      category: category,
      image: imageFile,
      status: status
    });

    await blog.save(function (error) {
      if (error) return console.log(error);

      mkdirp.sync('./public/uploads/images/blogs/' + blog._id);

      if (imageFile != "") {
        const blogImage = req.files.blogImage;
        const path = './public/uploads/images/blogs/' + blog._id + '/' + imageFile;

        blogImage.mv(path, function (error) {
          return console.log(error)
        });
      }

    });

    res.redirect('/admin/blogs');
  } catch (error) {
    next(error);
  }
}

exports.get_BlogId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);


    res.render('admin/blog/view', {
      id: blog._id,
      title: blog.title,
      content: blog.content,
      image: blog.image
    })
  } catch (error) {
    next(error)
  }
}

exports.get_updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById({ _id: id });

    const categories = await Service.find({}).sort({ createdAt: -1 });

    res.render('admin/blog/update', {
      categories: categories,
      id: blog._id,
      title: blog.title,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      status: blog.status
    })
  } catch (error) {
    next(error);
  }
}

exports.post_updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Blog.update({ _id: id }, req.body);

    res.redirect('/admin/blogs')
  } catch (error) {
    next(error)
  }
}

exports.get_deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndRemove(id);

    res.redirect('/admin/blogs')
  } catch (error) {
    next(error)
  }
}