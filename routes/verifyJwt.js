const router = require('express').Router();
const authorization = require('../middleware/authorization');

router.get('/is-verify', authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.log(err.message);
		res.status(500).json('Server Error');
	}
});

module.exports = router;
