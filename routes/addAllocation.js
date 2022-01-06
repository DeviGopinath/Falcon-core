const router = require("express").Router();
const controller = require("../controller/controller");
const connection = require("../model/dbService");

router.post("/", async (req, res) => {
    try {
        var eid = req.query.eid;
        var pid = req.query.pid;
        var rate = req.query.rate;
        var allocation = req.query.allocation;
        var month = req.query.month;
        var revenue = req.query.revenue;

        const db = controller.getDbServiceInstance();
        let users = false;

        users = await db.addAllocation(eid, pid, rate, allocation, month, revenue);
        if (users) {
            res.status(200).json({
                message: "Retrieval successful",
                status: "SUCCESS",
                data: users,
            });
        } else {
            return res.status(404).json({
                status: "FAILURE",
                message: "data not found or not connected to database",
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
