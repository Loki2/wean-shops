const Job = require("../models/job");
const mkdirp = require("mkdirp");



exports.get_jobs = async (req, res, next) => {
  try {
    const user = res.locals.user;

    const jobs = await Job.find({}).sort({ createdAt: -1 })

    res.render('admin/job/index', {
      user: user,
      jobs: jobs
    });
  } catch (error) {
    next(error)
  }

}


exports.get_createJob = async (req, res, next) => {
  try {
    res.render('admin/job/create')
  } catch (error) {
    next(error)
  }
}

exports.post_createJob = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.jobImage !== 'undefined' ? req.files.jobImage.name : "";
    const { position_la, position_en, desc, type, status } = req.body;

    const job = new Job({
      position_la: position_la,
      position_en: position_en,
      desc: desc,
      type: type,
      image: imageFile,
      status: status
    });

    await job.save(function (error) {
      if (error) return console.log(error);

      mkdirp.sync('./public/uploads/images/jobs/' + job._id);


      if (imageFile != "") {
        const jobImage = req.files.jobImage;
        const path = './public/uploads/images/jobs/' + job._id + '/' + imageFile;

        jobImage.mv(path, function (error) {
          return console.log(error)
        });
      }
    });

    res.redirect('/admin/jobs');
  } catch (error) {
    next(error)
  }
}


exports.get_JobId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    res.render('admin/job/view', {
      id: job._id,
      position: job.position,
      desc: job.desc,
      type: job.type,
      image: job.image,
      status: job.status,
      created_at: job.createdAt
    })
  } catch (error) {
    next(error)
  }
}


exports.get_updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    res.render('admin/job/update', {
      id: job._id,
      position: job.position,
      desc: job.desc,
      type: job.type,
      image: job.image,
      status: job.status,
      created_at: job.createdAt
    });
  } catch (error) {
    next(error)
  }
}


exports.post_updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Job.update({ _id: id }, req.body);

    res.redirect('/admin/jobs');
  } catch (error) {
    next(error)
  }
}


exports.get_deleteJobId = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Job.findByIdAndRemove(id);

    res.redirect('/admin/jobs');
  } catch (error) {
    next(error)
  }
}