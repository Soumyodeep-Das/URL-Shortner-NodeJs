const express = require("express")
const router = express.Router()

const { handleStaticHomePage } = require('../controllers/staticPageController')
router.get('/', handleStaticHomePage)

module.exports = router