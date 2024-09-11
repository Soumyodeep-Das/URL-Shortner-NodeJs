const express = require("express")
const mongoose = require("mongoose")
const shortid = require("shortid")
const URL = require("../models/url")

async function handleCreateShortId(req, res) {
    const randomShortId = shortid()
    const body = req.body
    if (!body.url) return res.status(400).json({ error: "Enter URL" })
    await URL.create({
        shortId: randomShortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.json({ id: randomShortId })
}

async function handleGetShortId(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOneAndUpdate(
        {
            shortId,
        }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(result.redirectURL)
}

async function handleGetAnalyticsShortId(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleCreateShortId,
    handleGetShortId,
    handleGetAnalyticsShortId,
}