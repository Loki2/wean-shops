const Banner = require("../models/banner");
const mkdirp = require("mkdirp");
const Service = require('../models/category');


exports.get_banners = async (req, res, next) => {
  try {
    const banners = await Banner.find({}).sort({ createdAt: -1 });

    res.render("admin/banner/index", {
      banners: banners
    });
  } catch (error) {
    next(error)
  }
};

exports.get_createBanner = async (req, res, next) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 })
    res.render("admin/banner/create", {
      services: services
    });
  } catch (error) {
    next(error)
  }
};

exports.post_createBanner = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.bannerImage !== 'undefined' ? req.files.bannerImage.name : "";

    const { code, title, desc, slug, status } = req.body;
    // console.log(req.body);

    const banner = new Banner({
      code: code,
      title: title,
      desc: desc,
      image: imageFile,
      slug: slug,
      status: status
    });

    await banner.save(function (error) {
      if (error) return console.log(error)

      mkdirp.sync('./public/uploads/images/banners/' + banner._id);

      if (imageFile != "") {
        const bannImage = req.files.bannerImage;
        const path = './public/uploads/images/banners/' + banner._id + '/' + imageFile;

        bannImage.mv(path, function (error) {
          return console.log(error)
        })
      }
    });


    res.redirect('/admin/banners');

  } catch (error) {
    next(error);
  }
};


exports.get_viewbanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById({ _id: id });


    res.render('admin/banner/view', {
      id: banner._id,
      title: banner.title,
      desc: banner.desc,
      image: banner.image
    })
  } catch (error) {
    next(error)
  }
}

exports.get_updatebanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById({ _id: id });

    res.render('admin/banner/edit', {
      id: banner._id,
      code: banner.code,
      title: banner.title,
      desc: banner.desc,
      image: banner.image,
      slug: banner.slug,
      status: banner.status
    })
  } catch (error) {
    next(error)
  }
}

exports.post_updatebanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Banner.update({ _id: id }, req.body);

    res.redirect('/admin/banners')
  } catch (error) {
    next(error)
  }
}

exports.get_deletebanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Banner.findByIdAndRemove(id);

    res.redirect('/admin/banners')
  } catch (error) {
    next(error)
  }
}