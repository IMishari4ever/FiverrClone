const User = require('../models/user');
const bcrypt = require('bcrypt')


exports.signup = async (req,res,next) => {
   const {email, password} = req.body;

  let user = await User.findOne({email})
  if(user){
    return res.json({message: 'user is existed'})
  }
  const hashedPsw = await bcrypt.hash(password, 12)
  user = new User({
    email,
    password: hashedPsw,
  })

  await user.save();
}

exports.middleware = async (req, res,next) => {

   next();
}

exports.login = async (req,res,next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.json({message:"You can't log in"})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  console.log(isMatch)
  if(!isMatch){
    return res.json({message:"Incorrect username or password"})
  }
  res.status(200).json({user})
  console.log(req.user)
}

exports.getUser = async (req,res,next) => {
   const getUser = await User.findById(req.params.id);
  res.status(201).json({getUser})
  console.log(req.user)
}