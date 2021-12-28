const router = require('express').Router();
const controller = require('../controller/controller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
	try {
		const db = controller.getDbServiceInstance();

		//1.destructure
		const { email, password } = req.body;
		//2.check user exists

		const user = await db.getAuth(email);

		if (user.rows.length === 0) {
			return res.status(401).json('Username or password incorrect');
		}

		//3.check passowrd
		const validPassword = await bcrypt.compare(password, user.rows[0].pwd);

		if (!validPassword) {
			return res.status(401).json('Username or password incorrect');
		}

		const payload = { user_id: user.rows[0].id };
		//4.give them the jwt token
		const access_token = jwt.sign(payload, 'qwertyuiop1234567890', {
			expiresIn: '1hr',
		});

		res.json({ access_token });
	} catch (error) {
		console.log(error.message);

		res.status(500).json('Server Error');
	}
});

module.exports = router;
