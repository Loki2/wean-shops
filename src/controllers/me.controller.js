const Product = require("../models/product");


exports.get_userHome = async (req, res, next) => {
  try {

    const user = res.locals.user;
    const products = await Product.find({}).sort({ createdAt: -1 })


    console.log(`first user home products`, products);

    res.render("user/home", {
      title: "Home",
      user: user,
      products: products
    })
  } catch (error) {
    console.error(`first error`, error)
  }
}


exports.get_addCart = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const productId = req.params.product_id;

    console.log(`first product id`, productId)

    const product = await Product.findById({ _id: productId });

    res.render("user/view", {
      title: "Add Cart",
      user: user,
      product: product
    })


    console.log(`first product view`, product)

  } catch (error) {
    console.error(`first error`, error)
  }
}