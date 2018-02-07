'use strict';

module.exports = Session => {
  Session.createOptionsFromRemotingContext = function (ctx) {
    let base = this.base.createOptionsFromRemotingContext(ctx);
    base.userId = ctx.req.user.userId;
    base.appId = ctx.req.user.appId;

    return base;
  };

  Session.observe('before save', (ctx, next) => {
    if (ctx.isNewInstance) {
      ctx.instance.userId = ctx.options.userId;
      ctx.instance.appId = ctx.options.appId;
    }
    next();
  });
};

