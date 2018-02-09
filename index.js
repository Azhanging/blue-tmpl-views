const BlueTmpl = require('blue-tmpl');

const fs = require('fs');

const path = require('path');

const ROOT_PATH = process.cwd();

module.exports = (opts) => {
  const _opts = Object.assign(opts, {
    ext: 'tmpl'
  });
  //配置express模板
  if (opts.app) {
    opts.app.engine(_opts.ext, (filePath, state, callback) => {
      fs.readFile(filePath, 'utf8', function (err, content) {
        if (err) return callback(new Error(err));
        return callback(null, new BlueTmpl({
          template: content,
        }).render(state).template);
      })
    });
  } else {
    //配置koa2的模板
    return function (ctx, next) {
      if (ctx.render) return next();
      ctx.app.context.render = function (_path = "", data = {}) {
        return new Promise((resolve) => {
          fs.readFile(path.join(ROOT_PATH, opts.path, _path + `.${_opts.ext}`), 'utf8', (err, content) => {
            if (err) {
              this.body = err;
            } else {
              try{
                BlueTmpl.prototype.$ctx = this;
                this.body = new BlueTmpl({
                  template: content,
                }).render(data).template;
              }catch(e){
                this.body = e;
              }
            }
            resolve();
          });
        });
      };
      return next();
    }
  }
};