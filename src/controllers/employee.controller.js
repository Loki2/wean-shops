const Employee = require("../models/employee");
const mkdirp = require("mkdirp");


exports.get_Employees = async (req, res, next) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 })
    res.render("admin/employee/index", {
      employees: employees
    });
  } catch (error) {
    next(error);
  }
};

exports.get_addEmployee = async (req, res, next) => {
  try {
    res.render("admin/employee/create");
  } catch (error) {
    next(error);
  }
};

exports.post_addEmployee = async (req, res, next) => {
  try {
    console.log(req.body);
    const imageFile = typeof req.files.employeeImage !== 'undefined' ? req.files.employeeImage.name : "";
    const {
      firstname,
      lastname,
      gender,
      dob,
      bio,
      position,
      address_1,
      address_2,
      city,
      province,
      country,
      contact,
      phone,
      facebook,
      mentalStatus,
      blood,
    } = req.body;

    const employee = new Employee({
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      bio: bio,
      contact: contact,
      phone: phone,
      facebook: facebook,
      position: position,
      address_1: address_1,
      address_2: address_2,
      city: city,
      province: province,
      country: country,
      mentalStatus: mentalStatus,
      blood: blood,
      image: imageFile
    });

    await employee.save(function (error) {
      if (error) return console.log(error);

      mkdirp.sync('./public/uploads/images/employees/' + employee._id);

      if (imageFile != "") {
        const emplImage = req.files.employeeImage;
        const path = './public/uploads/images/employees/' + employee._id + '/' + imageFile;

        emplImage.mv(path, function (error) {
          return console.log(error)
        });
      }
    });

    res.redirect('/admin/employees')
  } catch (error) {
    next(error);
  }
};

exports.get_updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById({ _id: id });

    // console.log("employee:", employee)
    res.render('admin/employee/edit', {
      id: employee._id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      gender: employee.gender,
      dob: employee.dob.toLocaleDateString(),
      bio: employee.bio,
      position: employee.position,
      contact: employee.contact,
      phone: employee.phone,
      facebook: employee.facebook,
      address_1: employee.address_1,
      address_2: employee.address_2,
      city: employee.city,
      province: employee.province,
      country: employee.country,
      blood: employee.blood,
      mentalStatus: employee.mentalStatus
    })
  } catch (error) {
    next(error)
  }
}

//post update employee
exports.post_updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Employee.update({ _id: id }, req.body);

    res.redirect('/admin/employees')
  } catch (error) {
    next(error)
  }
}


//delete employee
exports.get_deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Employee.findByIdAndRemove(id);

    res.redirect('/admin/employees')
  } catch (error) {
    next(error)
  }
}
