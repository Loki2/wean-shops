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

exports.get_org = async (req, res, next) => {
  try {
    const organize = await Organize.findOne();

    console.log("org data", organize)

    res.render("org", {
      id: organize._id,
      name_lao: organize.name_lao,
      name_eng: organize.name_eng,
      desc: organize.desc,
      bio: organize.bio,
      phone: organize.phone,
      contact: organize.contact,
      email: organize.email,
      city: organize.city,
      address: organize.address,
      province: organize.province,
      country: organize.country,
      found_date: organize.found_date.toLocaleString(),
      chart: organize.chart
    })
  } catch (error) {
    next(error)
  }
}

exports.get_teams = async (req, res, next) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });

    res.render("team", {
      employees: employees
    })
  } catch (error) {
    next(error);
  }

}

exports.get_clientsProj = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    const customers = await Customer.find({}).sort({ createdAt: -1 });

    res.render("clientpro", {
      projects: projects,
      customers: customers,
    })
  } catch (error) {
    next(error)
  }
}

exports.get_service = async (req, res, next) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    const projects = await Project.find({}).sort({ createdAt: -1 });
    const customers = await Customer.find({}).sort({ createdAt: -1 });


    res.render("service", {
      services: services,
      projects: projects,
      customers: customers
    });
  } catch (error) {
    next(error);
  }
};

exports.get_service_electrical = async (req, res, next) => {
  try {
    res.render("electrical");
  } catch (error) {
    next(error);
  }
};

exports.get_home_agriculture = async (req, res, next) => {
  try {
    res.render("agriculture");
  } catch (error) {
    next(error);
  }
}

exports.get_home_products = async (req, res, next) => {
  try {

    const products = await Product.find({}).sort({ createdAt: -1 });

    // console.log("product", products)

    res.render("products", {
      products: products
    });
  } catch (error) {
    next(error);
  }
};


exports.get_home_volentears = async (req, res, next) => {
  try {
    const volunteers = await Volentear.find({}).sort({ createdAt: -1 });

    res.render('volentear', {
      volunteers: volunteers
    })
  } catch (error) {
    next(error)
  }
}


exports.get_home_jobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });

    res.render('hiring', {
      jobs: jobs
    })
  } catch (error) {
    next(error)
  }
}


exports.get_home_about = async (req, res, next) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });

    res.render('about', {
      employees: employees
    })
  } catch (error) {
    next(error)
  }
}

exports.get_home_contact = async (req, res, next) => {
  try {
    res.render("contact");
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

