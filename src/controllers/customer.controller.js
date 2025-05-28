const Customer = require("../models/customer");
const mkdirp = require("mkdirp");

exports.get_customers = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.render('admin/customer/index', {
      user: user,
      customers: customers
    })
  } catch (error) {
    next(error)
  }

}

exports.get_createCustomer = async (req, res, next) => {
  try {
    res.render('admin/customer/create')
  } catch (error) {
    next(error)
  }
}

exports.post_createCustomer = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.logoImage !== 'undefined' ? req.files.logoImage.name : "";

    const { name_lao, name_eng, desc, address_1, address_2, city, state, country, contact, phone, link, facebook, remark, status } = req.body;

    const customer = new Customer({
      name_lao: name_lao,
      name_eng: name_eng,
      desc: desc,
      address_1: address_1,
      address_2: address_2,
      city: city,
      state: state,
      country: country,
      contact: contact,
      phone: phone,
      link: link,
      facebook: facebook,
      logo: imageFile,
      status: status,
      remark: remark
    });

    await customer.save(function (error) {
      if (error) return console.log(error);

      mkdirp.sync('./public/uploads/images/customers/logos/' + customer._id);

      if (imageFile != "") {
        const logoImage = req.files.logoImage;

        const path = './public/uploads/images/customers/logos/' + customer._id + '/' + imageFile;

        logoImage.mv(path, function (error) {
          return console.log(error)
        })
      }
    });

    res.redirect('/admin/customers')
  } catch (error) {
    next(error)
  }
}


exports.get_viewCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    res.render('admin/customer/view', {
      id: customer._id,
      name_lao: customer.name_lao,
      name_eng: customer.name_eng,
      desc: customer.desc,
      address_1: customer.address_1,
      address_2: customer.address_2,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      contact: customer.contact,
      site: customer.link,
      facebook: customer.facebook,
      phone: customer.phone,
      logo: customer.logo,
      remark: customer.remark,
      status: customer.status
    });
  } catch (error) {
    next(error)
  }
}

exports.get_editCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    res.render('admin/customer/edit', {
      id: customer._id,
      name_lao: customer.name_lao,
      name_eng: customer.name_eng,
      desc: customer.desc,
      address_1: customer.address_1,
      address_2: customer.address_2,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      contact: customer.contact,
      site: customer.link,
      facebook: customer.facebook,
      phone: customer.phone,
      logo: customer.logo,
      remark: customer.remark,
      status: customer.status
    })
  } catch (error) {
    next(error);
  }
}


exports.post_editCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    //if selected logo file

    await Customer.update({ _id: id }, req.body);

    //ToDo: move new logo file to logos directory

    res.redirect('/admin/customers');
  } catch (error) {
    next(error)
  }
}

exports.get_deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Customer.findByIdAndRemove(id);

    res.redirect('/admin/customers');
  } catch (error) {
    next(error);
  }
}