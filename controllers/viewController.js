const User = require('./../models/user');

exports.getDashboard = async (req, res, next) => {
    res.status(200).send({status: 200, message:"Hi"});
}

exports.getReport = async (req,res,next) =>{
    if(req.session.user!=undefined){
    // {    console.log(req.session)
        let role = req.session.user.designation;
    
        if(role === 'admin'){
            try{
                let users = await User.find({});
                res.status(200).send({status:200, data : {users}});
            }catch(err){
                res.send(403).send({status:403, message: err.message});
            }
        }
        else if(role === 'manager'){
            try{
                let users = await User.find({designation:"staff"});
                res.status(200).send({status:200, data : {users}});
            }catch(err){
                res.send(403).send({status:403, message: err.message});
            }
        }
        else {
            res.status(404).send({status:404, message:"You not authorized to view this page."});
        }
    }
    else{
        res.status(403).send({status:403, message:"Please login to view this page"})
    }
}