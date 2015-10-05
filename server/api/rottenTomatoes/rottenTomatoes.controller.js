'use strict';

var _ = require('lodash');
var request = require('request');
var RottenTomatoes = require('./rottenTomatoes.model');

// Get list of rottenTomatoess
exports.index = function(req, res) {
  RottenTomatoes.find(function (err, rottenTomatoess) {
    if(err) { return handleError(res, err); }
    return res.json(200, rottenTomatoess);
  });
};

// Get a single rottenTomatoes
exports.show = function(req, res) {
  RottenTomatoes.findById(req.params.id, function (err, rottenTomatoes) {
    if(err) { return handleError(res, err); }
    if(!rottenTomatoes) { return res.send(404); }
    return res.json(rottenTomatoes);
  });
};

// Creates a new rottenTomatoes in the DB.
exports.create = function(req, res) {
  RottenTomatoes.create(req.body, function(err, rottenTomatoes) {
    if(err) { return handleError(res, err); }
    return res.json(201, rottenTomatoes);
  });
};

// Updates an existing rottenTomatoes in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  RottenTomatoes.findById(req.params.id, function (err, rottenTomatoes) {
    if (err) { return handleError(res, err); }
    if(!rottenTomatoes) { return res.send(404); }
    var updated = _.merge(rottenTomatoes, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, rottenTomatoes);
    });
  });
};

// Deletes a rottenTomatoes from the DB.
exports.destroy = function(req, res) {
  RottenTomatoes.findById(req.params.id, function (err, rottenTomatoes) {
    if(err) { return handleError(res, err); }
    if(!rottenTomatoes) { return res.send(404); }
    rottenTomatoes.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
