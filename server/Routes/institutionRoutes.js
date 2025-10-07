const express = require("express");
const { addInstitution, loginInstitute, institutionProfile, getAllInstitutionProfile, getInstitute, updataeInstitutionDetails } = require("../Controllers/institutionController");
const router = express.Router();

router.post("/add_institition", addInstitution)
router.post("/login_institute", loginInstitute)

router.post("/add_institution_profile", institutionProfile)
router.get("/get_profile_details", getAllInstitutionProfile)
router.route("/get_institute/:id").get(getInstitute).put(updataeInstitutionDetails)

module.exports = router