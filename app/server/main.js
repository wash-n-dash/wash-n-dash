import '/imports/startup/both';
import '/imports/startup/server';

import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';
import { Machines } from '/imports/api/machine/machine';
import { ObjectId } from 'meteor/mongo';

let bcrypt = require('bcrypt');

function getMachine(req, res, next) {
  let machineID = req.headers.machineid;
  req.machine = Machines.findOne({_id: machineID});

  if (req.machine !== undefined) {
    next();
  } else {
    res.writeHead(404);
    res.end();
  }
}

function authenticate(req, res, next) { 
  let secret = req.headers.secret;
  if (secret === undefined) {
      res.writeHead(400);
      res.end();
      return;
  }

  bcrypt.compare(secret, req.machine.secret, function(err, auth) {
    if (auth) {
      next();
    } else {
      res.writeHead(403);
      res.end("unauthorized");
    }
  });
}

WebApp.connectHandlers.use('/api', bodyParser.json());
WebApp.connectHandlers.use('/api', getMachine);
WebApp.connectHandlers.use('/api', authenticate);

WebApp.connectHandlers.use('/api', (req, res, next) => {
  if (req.method == 'POST') {
    let time = req.headers.time;

    if (time === undefined) {
      res.writeHead(400);
      res.end();
    } else {
      Machines.update({_id: req.machine._id}, { $set: {timeRemaining: parseInt(time)} });
      res.writeHead(200);
      res.end();
    }
  } else {
    res.writeHead(400);
    res.end();
  }
});

Meteor.methods({
    'setSecret': function(machineId, password) {
      if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
        let hash = bcrypt.hashSync(password, 10);
        Machines.update({_id: machineId}, {$set: {secret: hash}});
      }
    }
});
