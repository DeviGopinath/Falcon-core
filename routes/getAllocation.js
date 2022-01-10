const router = require("express").Router();
const controller = require("../controller/controller");
const connection = require("../model/dbService");

router.get("/", async (req, res) => {
    try {
        const db = controller.getDbServiceInstance();
        let users = false;
        var data1 = req.query.month;
        users = await db.getAllocation(data1);
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
