const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error: "Invalid Authentication Token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user.id;
        next();
    } catch (error) {
        res.status(401).send({error: "Invalid Authentication Token"})
    }
}

module.exports = fetchuser;