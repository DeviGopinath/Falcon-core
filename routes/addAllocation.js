const router = require("express").Router();
const controller = require("../controller/controller");
const connection = require("../model/dbService");

router.post("/", async (req, res) => {
    try {
        var eid = req.body.eid;
        var pid = req.body.pid;
        var rate = req.body.rate;
        var allocation = req.body.allocation;
        var month = req.body.month;
        var revenue = req.body.revenue;

        console.log(eid, pid, rate, allocation, month, revenue);

        const db = controller.getDbServiceInstance();
        let users = false;

        users = await db.addAllocation(
            eid,
            pid,
            rate,
            allocation,
            month,
            revenue
        );
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
