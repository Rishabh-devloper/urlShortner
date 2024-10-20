const express = require("express");
const router = express.Router(); // Initialize router correctly
const URL = require("../models/url");
const shortid = require("shortid");

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        if (!body.url) return res.status(404).json({ error: "url is required" });
        const shortId = shortid.generate(); // Use generate() method to generate a short ID
        await URL.create({
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: []
        });
        return res.render("home" ,
            { locals: { id: shortId } }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/analytics/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });
        if (!result) return res.status(404).json({ error: "URL not found" });
        return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timeStamp: Date.now()
                    }
                }
            },
            { new: true } // This option returns the updated document
        );

        // Check if entry exists
        if (!entry) {
            return res.status(404).send("URL not found");
        }

        // Redirect to the correct URL field
        res.redirect(entry.redirectUrl); // Assuming the field is named 'redirectUrl'
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;