const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization")

//register user
router.post("/register", validInfo, async (req, res) => {
	try {
		//1. destructure the req.body(name, email, password)
		const { email, password } = req.body;
		// 2. check if user exist (if user exist then throw error)
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		if (user.rows.length !== 0) {
			return res.status(401).send("email already exist");
		}
		if (password.length < 7) {
			return res
				.status(401)
				.send("Passwords need to be greater than 6 characters");
		}
		//3. Bcrypt the user password
		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);
		const bcryptPassword = await bcrypt.hash(password, salt);
		//4. enter the new user inside our database
		const newUser = await pool.query(
			"INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
			[email, bcryptPassword]
		);

		return res.json(newUser.rows[0]);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;