var express = require('express');
var router = express.Router();

var unirest = require('unirest');
var project_id = process.env.PROJECT_ID;

/* GET home page. */
router.get('/', function(req, res, next) {


unirest.get('https://www.pivotaltracker.com/services/v5/projects/' + project_id + '/stories')

  .headers('X-TrackerToken', process.env.TRACKER_TOKEN)
  .end(function (response) {
    res.render('index', { title: 'Express', response: response.body });
  });
});

router.post('/', function(req, res, next){
  unirest.post('https://www.pivotaltracker.com/services/v5/projects/' + project_id + '/stories')
    .headers('X-TrackerToken', process.env.TRACKER_TOKEN)
    .headers("Content-Type", "application/json")
    .send({"name": req.body.add_story})
    .end(function(response){
      console.log(req.body.add_story);
      res.redirect('/');
  });
});

module.exports = router;
