var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var JobPostingSchema = require('../schemas/job-posting');
var JobPosting = mongoose.model('posting', JobPostingSchema);

/* POST create posting */
router.post('/', function (req, res, next) {
  JobPosting.create(req.body, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json({posting: posting._id});
    }
  });
});

/* GET list all job postings */
router.get('/', function (req, res, next) {
  JobPosting.find({}, function (err, postings) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(postings);
    }
  });
});

/* GET show job posting */
router.get('/:_postingId', function (req, res, next) {
  JobPosting.find({postingId:req.params._postingId}, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(posting);
    }
  });
});

/* POST update a posting */
router.post('/:_postingId', function (req, res, next) {
  JobPosting.updateOne({postingId:req.params._postingId}, req.body, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(posting);
    }
  });
});

/* DELETE remove a posting */
router.post('/delete/:_postingId', function (req, res, next) {
  JobPosting.remove({postingId:req.params._postingId}, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(posting);
    }
  });
});

/* GET remove all postings */
/* This is useful for testing purposes */
router.get('/nuke', function (req, res, next) {
  JobPosting.remove({}, function (err) {
    if (err) {
      res.redirect('/postings');
    } else {
      res.redirect('/postings');
    }
  });
});

module.exports = router;
