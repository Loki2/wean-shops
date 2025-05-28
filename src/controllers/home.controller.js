const Banner = require("../models/banner");
const Project = require("../models/project");
const Blog = require("../models/blog");
const Service = require('../models/category');
const Customer = require('../models/customer');
const Product = require('../models/product');
const Job = require('../models/job');
const Volentear = require('../models/volenteer');
const Employee = require("../models/employee");
const Feedback = require('../models/feedback');
const Organize = require("../models/organize");

exports.get_home = async (req, res, next) => {
  try {
    // const banners = await Banner.find({}).sort({ createdAt: -1 });
    // const projects = await Project.find({}).sort({ createdAt: -1 });
    // const blogs = await Blog.find({}).sort({ createdAt: -1 });
    // const customers = await Customer.find({}).sort({ createdAt: -1 });
    // const employees = await Employee.find({}).sort({ createdAt: -1 });


    res.render("index", {
      title: "Home",
    });
  } catch (error) {
    next(error);
  }
};

exports.get_home_products = async (req, res, next) => {
  try {

    const products = await Product.find({}).sort({ createdAt: -1 });

    // console.log("product", products)

    res.render("products", {
      title: "Products Catalogs",
      // products: products
    });
  } catch (error) {
    next(error);
  }
};

exports.get_home_carts = async (req, res, next) => {
  try {
    res.render("carts", {
      title: "Carts Orders",
      // products: products
    });
  } catch (error) {
    next(error);
  }
}



exports.get_checkout = async (req, res, next) => {
  try {
    res.render("checkout", {
      title: "Checkout Wishlist",
      // products: products
    });
  } catch (error) {
    next(error);
  }
}


exports.get_orders = async (req, res, next) => {
  try {
    res.render("orders", {
      title: "Orders List",
    });
  } catch (error) {
    next(error);
  }
}



exports.get_home_blogs = async (req, res, next) => {
  try {

    res.render("blogs", {
      title: "Blogs",
      // products: products
    });
  } catch (error) {
    next(error);
  }
}


exports.get_home_about = async (req, res, next) => {
  try {

    res.render('about', {
      title: "About Us",
    })
  } catch (error) {
    next(error)
  }
}

exports.get_home_contact = async (req, res, next) => {
  try {
    res.render("contact", {
      title: "Contact Us",
    });
  } catch (error) {
    next(error);
  }
}

exports.post_home_contact = async (req, res, next) => {
  try {
    const { name, email, content } = req.body;

    const feedback = new Feedback({
      name: name,
      email: email,
      content: content
    });

    await feedback.save();

    res.redirect('/')
  } catch (error) {
    next(error);
  }
}

exports.get_home_term = async (req, res, next) => {
  try {
    res.render("term");
  } catch (error) {
    next(error);
  }
}

