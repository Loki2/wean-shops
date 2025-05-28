const User = require("../models/user");
const Feedback = require("../models/feedback");
const Organize = require("../models/organize");
const mkdirp = require("mkdirp");


exports.get_admin = async (req, res, next) => {
  try {
    const user = res.locals.user;

    const users = await User.find({}).sort({ createdAt: -1 });


    res.render('admin/index', {
      user: user,
      users: users
    })
  } catch (error) {
    next(error)
  }

}

exports.get_Organize = async (req, res, next) => {
  try {
    const organize = await Organize.findOne();

    // console.log("Org", organize);

    if (organize !== null) {
      res.render('admin/organize', {
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
    } else {
      res.render('admin/create_org')
    }
  } catch (error) {
    next(error)
  }
}

exports.post_Organize = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.orgchartImage !== 'undefined' ? req.files.orgchartImage.name : "";
    const { name_lao, name_eng, desc, bio, phone, contact, email, address, city, province, country, found_date } = req.body;

    const org = new Organize({
      name_lao: name_lao,
      name_eng: name_eng,
      desc: desc,
      bio: bio,
      phone: phone,
      contact: contact,
      email: email,
      address: address,
      city: city,
      province: province,
      country: country,
      found_date: found_date,
      chart: imageFile
    });

    await org.save(function (error) {
      if (error) return console.log(error)

      mkdirp.sync('./public/uploads/images/organize/' + org._id);

      if (imageFile != "") {
        const orgChImage = req.files.orgchartImage;
        const path = './public/uploads/images/organize/' + org._id + '/' + imageFile;

        orgChImage.mv(path, function (error) {
          return console.log(error)
        });
      }
    });

    res.redirect('/admin/org');
  } catch (error) {
    next(error)
  }
}

exports.update_Organize = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Organize.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });

    res.redirect('/admin/org');
  } catch (error) {
    next(error)
  }
}

exports.get_feedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });

    res.render('admin/feedback', {
      feedbacks: feedbacks
    })
  } catch (error) {
    next(error)
  }
}