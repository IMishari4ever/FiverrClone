const Gig = require('../models/gig')
const User = require('../models/user')

exports.createGig = async (req,res,next) => {
  const gig = await Gig.create({
    owner: req.user._id,
    title: req.body.gig_title,
    category: req.body.gig_category,
    price: req.body.gig_price,
    about: req.body.gig_about
  })
  await gig.save();
  await User.updateOne(
    {
    _id: req.user._id
  },{
    $push: {gigs: gig._id}
  },
  res.json({message:"sucessfully", gig})
  )
}