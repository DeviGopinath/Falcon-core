const router = require("express").Router();
const controller = require("../controller/controller");
const connection = require("../model/dbService");

router.get("/", async (req, res) => {
    try {
        const db = controller.getDbServiceInstance();
        var month = req.body.month;
        let users = false;

        users = await db.totalMembers(month);
        if (users) {
            res.status(200).json({
                message: "Retrieval successful",
                status: "SUCCESS",
                data: users,
            });
        } else {
            return res.status(404).json({
                status: "FAILURE",
                message: "user not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "database object not found",
        });
    }
});

module.exports = router;
