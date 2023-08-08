const router = require("express").Router();

router.get("*", (req, res) => {
    res.status(404).json({ "message": "nothing to see here, please go back to homepage" });
});

module.exports = router;