//this validates email on the backend
module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  if (req.path === "/add-company") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } 
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } 
  }
  next();
};