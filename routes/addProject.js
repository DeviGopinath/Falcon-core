const router = require("express").Router();
const controller = require("../controller/controller");
const connection = require("../model/dbService");

router.post("/", async (req, res) => {
    try {
        var pid = req.body.pid;
        var name = req.body.pname;
        var client = req.body.client;
        var estimation = req.body.estimation;
        var budget = req.body.budget;
        // var members = req.body.members;

        const db = controller.getDbServiceInstance();
        let users = false;

        users = await db.addProject(
            pid,
            name,
            client,
            estimation,
            budget
            // members
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
