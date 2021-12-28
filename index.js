const express = require("express");
const cors = require("cors");
const getDateRoute = require("./routes/getDateroute");
const getDataRoute = require("./routes/getDataroute");
const getAllDataRoute = require("./routes/getAll");
const getAuthData = require("./routes/getAuthData");
const register = require("./routes/register");
const verifyJwt = require("./routes/verifyJwt");

const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./model/dbService");
const controller = require("./controller/controller");

const app = express();

// middleware

app.use(express.json());
app.use(cors());

//routes

app.use("/getdatedetails", getDateRoute);
app.use("/home/get", getDataRoute);
app.use("/home/getall", getAllDataRoute);
app.use("/home/authdata", getAuthData);
app.use("/home/signup", register);
app.use("/home/auth", verifyJwt);

app.post("/home/insert", async (req, res) => {
    try {
        var data = req.body;
        const db = controller.getDbServiceInstance();
        let users = false;

        users = await db.insertData(data);
        if (users) {
            res.status(200).json({
                message: "Insertion successful",
                status: "SUCCESS",
            });
        } else {
            return res.status(404).json({
                status: "FAILURE",
                message: "insertion failed,not connected to database",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "database object not found",
        });
    }
});

app.listen(process.env.PGSERVERPORT, () => {
    console.log("Running on port 5000");
});
