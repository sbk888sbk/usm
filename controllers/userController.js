const User = require('./../models/user');

exports.delete = async (req, res, next) => {
    try{
        if(req.session.user!=undefined && req.session.user.designation !== 'admin'){
     
        emailId = req.body.emailId;
        let user = await User.findOneAndDelete({emailId : emailId});

            if(user){
                res.status(200).send({
                    status:200,
                    message:"Deleted User successfully"
                })
            }
            else{
                res.status(404).send({
                    status:404,
                    message:"User not foud"
                })
            }
        }
        else{
            res.status(403).send({ status:403, message:"You are not logged in as admin...!"})
        }
    }catch(err){
        res.status(403).send({
            status:403,
            message:err.message
        })
    }
}