const express = require("express")
const { handleCreateShortId, handleGetShortId, handleGetAnalyticsShortId } = require("../controllers/url")
const router = express.Router()

router.post('/', handleCreateShortId)
router.get('/:shortId', handleGetShortId)
router.get('/analytics/:shortId', handleGetAnalyticsShortId)

module.exports = router