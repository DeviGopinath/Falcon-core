const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

	


    try {

        const jwtToken = req.headers.token;

        if (!jwtToken) {

            return res.status(403).json("Not authorized");
        }
        

        const payload=jwt.verify(jwtToken,"qwertyuiop1234567890");

        req.user = payload.user_id;


		next();
	} catch (err) {
		console.log(err.message);
		return res.status(403).json('Not authorized');
	}
};
