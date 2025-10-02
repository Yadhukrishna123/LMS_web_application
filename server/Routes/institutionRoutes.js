const express = require("express");
const { addInstitution, loginInstitute, institutionProfile, getAllInstitutionProfile } = require("../Controllers/institutionController");
const router = express.Router();

router.post("/add_institition", addInstitution)
router.post("/login_institute", loginInstitute)

router.post("/add_institution_profile", institutionProfile)
router.get("/get_profile_details", getAllInstitutionProfile)

module.exports = router