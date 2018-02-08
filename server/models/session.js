'use strict';

let useragent = require('express-useragent');

module.exports = Session => {
  Session.createOptionsFromRemotingContext = function (ctx) {
    let base = this.base.createOptionsFromRemotingContext(ctx);
    base.userId = ctx.req.user.userId;
    base.appId = ctx.req.user.appId;

    // User agent parsing
    let source = ctx.req.headers['user-agent'];
    base.ua = useragent.parse(source);

    return base;
  };

  Session.observe('before save', (ctx, next) => {
    if (ctx.isNewInstance) {
      ctx.instance.userId = ctx.options.userId;
      ctx.instance.appId = ctx.options.appId;
      ctx.instance.ua = ctx.options.ua;
    }
    next();
  });
};

