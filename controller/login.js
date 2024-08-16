const { userCollection } = require('../mongoDB/collections');
const {jwtSign} = require('./jwtsign');

const login = async(req, res) => {
    const {email} = req.body;
    const user = await userCollection.findOne({email});
    if(!user && user?.status !=="active"){
        return res.status(401).send({message: "Unactive user"})
    }
    const token = jwtSign(email);
    console.log(token);

    res.send({token: token, role: user.role})
}

module.exports = {login};
