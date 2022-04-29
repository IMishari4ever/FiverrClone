const router = require('express').Router();
const Gig = require('../models/gig')

const fee = 3.15;


router.get('/checkout/single_package/:id', (req, res,next) => {
 Gig.findOne({_id: req.params.id}, function(err, gig){
  const totalPrice = gig.price + fee
  req.user.gig = gig;
  req.user.price = totalPrice;
  res.status(201).json({
   gig: gig,
   totalPrice: totalPrice
  })
 })
})


module.exports = router