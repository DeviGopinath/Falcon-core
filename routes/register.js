const router = require("express").Router();
const controller = require("../controller/controller");
const jwt = require("jsonwebtoken");


const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const db = controller.getDbServiceInstance();

        //1. destructure the req.body (name,password)

        const { email, password, confirmpassword } = req.body;

        //2.Check if user exists

        const user = await db.userExist(email);

        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }

        //3.Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4.Enter user details into database
        const newUser = await db.insertNewUser(email, bcryptPassword);

        const payload = { user_id: newUser.rows[0].id };

        //5.generating our jwt token

        const access_token = jwt.sign(payload, "qwertyuiop1234567890", {
            expiresIn: "1hr",
        });

        res.json({ access_token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;
