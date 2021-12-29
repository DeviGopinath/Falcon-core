const router = require("express").Router();
const controller = require("../controller/controller");
const connection = require("../model/dbService");

router.get("/", async (req, res) => {
    try {
        const db = controller.getDbServiceInstance();
        const unit = req.query.unit;
        const fromdate = req.query.from;
        const todate = req.query.to;

        let datedata = [];
        datedata = await db.getDateData(unit, fromdate, todate);
        if (datedata !== undefined && datedata !== false) {
            res.status(200).json({
                datedata: datedata,
                status: "SUCCESS",
            });
        } else {
            res.status(200).json({
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
