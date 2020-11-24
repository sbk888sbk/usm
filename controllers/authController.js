const crypto = require('crypto');


const User = require('./../models/user');


exports.signup = async (req, res, next) => {

    try{
        const newUser = await User.create({
        name: req.body.name,
        emailId: req.body.emailId,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        designation: req.body.designation.toLowerCase(),
        })

        if(newUser){
            newUser.password = '****';
            res.status(200).send({
                status: 200,
                message:"User created",
                date:{
                    newUser
                }
            })
        }
    } catch(err){
        res.status(400).send({
            status:400,
            message:err.message
        })
    }
};
  

exports.login = async (req, res, next) => {
    const emailId = req.body.emailId;
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
  
    // 1) Check if email/number and password exist
    if ((!emailId && !mobileNumber) ||!password ) {
      return res.status(400).send({
          status: 404, 
          message: 'Please provide email/mobileNumber and password!'
        });
    }

    // 2) Check if user exists && password is correct
    const user = emailId != undefined ? await User.findOne({ emailId }).select('+password') :  await User.findOne({ mobileNumber }).select('+password')
  
    if (!user || !(await user.correctPassword(password, user.password))) {
        
      return res.status(401).send({
          status: 401,
          message: 'Invalid Email/Mobile Number or Password'
      });
    }
  
    // 3) If everything ok, 
    user.password = undefined;
    req.session.user = user;
    res.status(200).json({
      status: 200,
      data: {
        user
      }
    });
  };

  exports.logout = async (req, res, next) => {
    if(req.session){ 
        // console.log(req.session)
        req.session= null;
         res.status(200).send({
          status: 200,
          message:"Logged out successfully"
      })
    } else{
        res.status(400).send({
            status: 400,
            message:"No user logged in"
        })
    }
  }