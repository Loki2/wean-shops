const Volentear = require("../models/volenteer");
const mkdirp = require("mkdirp");


exports.get_volentears = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const volentears = await Volentear.find({}).sort({ createdAt: -1 });
    res.render('admin/volentear/index', {
      user: user,
      volentears: volentears
    })
  } catch (error) {
    next(error)
  }

}

exports.get_createVolentear = async (req, res, next) => {
  try {
    res.render('admin/volentear/create')
  } catch (error) {
    next(erro)
  }
}


exports.post_createVolentear = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.volenImage !== 'undefined' ? req.files.volenImage.name : "";
    const { title, location, desc, remark, status } = req.body;

    const volentear = new Volentear({
      title: title,
      location: location,
      desc: desc,
      image: imageFile,
      remark: remark,
      status: status
    });

    await volentear.save(function (error) {
      if (error) return console.log(error);

      mkdirp.sync('./public/uploads/images/volentears/' + volentear._id);

      if (imageFile != "") {
        const volenImage = req.files.volenImage;
        const path = './public/uploads/images/volentears/' + volentear._id + '/' + imageFile;

        volenImage.mv(path, function (error) {
          return console.log(error)
        });
      }
    });

    res.redirect('/admin/volentears')
  } catch (error) {
    next(error);
  }
}

exports.get_VolentearId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const volentear = await Volentear.findById(id);

    res.render('admin/volentear/view', {
      id: volentear._id,
      title: volentear.title,
      location: volentear.location,
      desc: volentear.desc,
      image: volentear.image,
      remark: volentear.remark,
      status: volentear.status,
      created_at: volentear.createdAt
    })
  } catch (error) {
    next(error)
  }
}


exports.get_updateVolentear = async (req, res, next) => {
  try {
    const { id } = req.params;

    const volentear = await Volentear.findById(id);

    res.render('admin/volentear/update', {
      id: volentear._id,
      title: volentear.title,
      location: volentear.location,
      desc: volentear.desc,
      image: volentear.image,
      remark: volentear.remark,
      status: volentear.status
    })
  } catch (error) {
    next(error)
  }
}


exports.post_updateVolentear = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Volentear.update({ _id: id }, req.body)

    res.redirect('/admin/volentears');
  } catch (error) {
    next(error)
  }
}


exports.get_deleteVolentear = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Volentear.findByIdAndRemove(id);

    res.redirect('/admin/volentears');
  } catch (error) {
    next(error);
  }
}