const bcrypt = require("bcryptjs");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require("../utils/isValidated");

//create user token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.APP_SECRET, {
    expiresIn: maxAge
  })
};

exports.get_signin = async (req, res, next) => {
  res.render("signin");
};

exports.post_signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log(`first req body`, req.body);

    //Check empty fill
    if (!username || !password) {
      res.status(400).json({ message: 'Please Fill all require fields...!' })
    }

    //Query user from database
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: 'Not found this username, Please signup, try again...!' })
    }

    console.log(`user`, user.password);

    //Compare Password
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      res.status(400).json({ message: 'Email or Password incorrect...!' })
    }


    //Create Token
    const token = createToken(user._id);

    //Send Token to frontend
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.redirect('/admin');

  } catch (error) {
    next(error);
  }
};



exports.get_register = async (req, res, next) => {
  res.render("signup");
};


exports.post_register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    //Check if empty fill
    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "Please Fill all require fields...!" });
    }

    //Validation Username
    const isValidUsername = validateUsername(username);
    if (!isValidUsername) {
      res.status(400).json({
        message: "Please Enter a Username between 3 to 20 characters...",
      });
    }

    //Validation Email
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      res.status(400).json({ message: 'Please Enter Valid Email' });
    }

    //Validate Password
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      res.status(400).json({ message: 'Please must be latest at 6 to 60 charecters' })
    }

    //check matched password
    if (password !== confirmPassword) {
      res.status(400).json({ error: 'Password do not match...!' })
    }

    //Check exist username
    const isUsername = await User.findOne({ username });
    if (isUsername) {
      res.status(400).json({ error: 'Username already in used...' })
    }

    //Check Existing Email
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      res.status(400).json({ error: 'Email already in used...' })
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    //Create Token
    const token = createToken(user._id);

    //Send Token to frontend
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.redirect('/admin');

  } catch (error) {
    next(error)
  }
}

exports.get_signout = async (req, res, next) => {
  try {
    // const isUser = res.locals.user;

    // if(!isUser) return res.status(404).json({ message: 'not user to authenticated...!'})

    // const data = await client.query(`SELECT * FROM users WHERE username = $1`, [isUser.username]);

    // const user = data.rows;

    // console.log('loggedout user:', isUser)

    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
