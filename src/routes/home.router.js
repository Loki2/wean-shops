const express = require("express");
const {
  get_home,
  get_org,
  get_teams,
  get_service,
  get_clientsProj,
  get_service_electrical,
  get_home_agriculture,
  get_home_products,
  get_home_volentears,
  get_home_jobs,
  get_home_about,
  get_home_contact,
  post_home_contact,
  get_home_term
} = require("../controllers/home.controller");

const router = express.Router();

router.get("/", get_home);

router.get("/org", get_org);

router.get("/teams", get_teams);

router.get("/clientpro", get_clientsProj);

router.get("/services", get_service);

router.get("/electrical-consult", get_service_electrical);

router.get("/agriculture", get_home_agriculture);

router.get("/products", get_home_products);

router.get("/volunteers", get_home_volentears);

router.get("/jobs", get_home_jobs);

router.get("/about", get_home_about);

router.get("/contact", get_home_contact);

router.post("/contact", post_home_contact);

router.get("/term", get_home_term);

module.exports = router;
