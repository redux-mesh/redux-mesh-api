'use strict';

module.exports = Event => {
  Event.track = (req, event, next) => {
    console.log(req.user);
    console.log(event);
    next();
  };

  Event.remoteMethod('track', {
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'event', type: 'object', required: true}
    ],
    isStatic: true,
    returns: {arg: 'event', type: 'object'},
    http: {path: '/', verb: 'post'}
  });
};

