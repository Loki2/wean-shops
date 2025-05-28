const Customer = require("../models/customer");
const Project = require("../models/project");
const mkdirp = require("mkdirp");


exports.get_projects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 })

    res.render('admin/project/index', {
      projects: projects
    })
  } catch (error) {
    next(error);
  }
}

exports.get_createProject = async (req, res, next) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.render('admin/project/create', {
      customers: customers
    });
  } catch (error) {
    next(error)
  }
}

exports.post_createProject = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.projectImage !== 'undefined' ? req.files.projectImage.name : "";

    const { name_lao, name_eng, desc, remark, status } = req.body;

    const customer = req.body.customer;

    // console.log(req.body)

    const project = new Project({
      name_lao: name_lao,
      name_eng: name_eng,
      desc: desc,
      image: imageFile,
      customer: customer,
      remark: remark,
      status: status
    });

    await project.save(function (error) {
      if (error) return console.log(error)

      mkdirp.sync('./public/uploads/images/projects/' + project._id);

      mkdirp.sync('./public/uploads/images/projects/' + project._id + '/gallery');

      // mkdirp.sync('./public/uploads/images/projects/' + project._id + '/gallery/thumbs');

      if (imageFile != "") {
        const projectImage = req.files.projectImage;
        const path = './public/uploads/images/projects/' + project._id + '/' + imageFile;

        projectImage.mv(path, function (error) {
          return console.log(error)
        });
      }
    });

    res.redirect('/admin/projects')

  } catch (error) {
    next(error)
  }
}


exports.get_viewProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    const customer = await Customer.findById({ _id: project.customer });

    res.render('admin/project/view', {
      id: project._id,
      name_lao: project.name_lao,
      name_eng: project.name_eng,
      desc: project.desc,
      image: project.image,
      remark: project.remark,
      customer_name_lao: customer.name_lao,
      customer_name_eng: customer.name_eng,
      customer_contact: customer.contact,
      customer_phone: customer.phone,
      customer_web: customer.link,
      customer_address_1: customer.address_1,
      customer_address_2: customer.address_2,
      city: customer.city,
      province: customer.state
    })
  } catch (error) {
    next(error)
  }
}

exports.get_updateProject = async (req, res, next) => {
  try {

    const { id } = req.params;

    const project = await Project.findById(id);

    const customers = await Customer.find({}).sort({ createdAt: -1 });


    res.render('admin/project/edit', {
      customers: customers,
      id: project._id,
      name_lao: project.name_lao,
      name_eng: project.name_eng,
      desc: project.desc,
      image: project.image,
      remark: project.remark,
      status: project.status
    })

  } catch (error) {
    next(error)
  }
}


exports.post_updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Project.update({ _id: id }, req.body);

    res.redirect('/admin/projects')
  } catch (error) {
    next(error);
  }
}

exports.get_deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndRemove(id);

    res.redirect('/admin/projects')
  } catch (error) {
    next(error)
  }
}