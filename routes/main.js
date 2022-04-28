const router = require('express').Router();
const Gig = require('../models/gig')
const async = require('async')
const createGig = require('../controller/createGig')
const User = require('../routes/userRoute')
const authController = require('../controller/authController')


router.use(authController.middleware)


router.get('/', (req, res, next) => {

    Gig.find({}, function(err, gigs) {
      res.status(201).json({gigs})
    })
});

router.get('/my-gigs', (req, res, next) => {
  Gig.find({ owner: req.user._id }, function(err, gigs) {
    res.status(201).json({ gigs});
  })
});

router.route('/add-new-gig')
  .post(createGig.createGig)

router.get('/service_detail/:id', (req,res,next) => {
  Gig.findOne({_id: req.params.id}).populate('owner').exec((err, gig) => {
    res.render('main/service_detail', {gig: gig})
  })
})

module.exports = router;
