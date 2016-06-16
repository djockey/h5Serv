'use strict';

import _ from "lodash";
import Koa from "koa";
import jade from "jade";
import myRoutes from "./server/routes";
import urlConfig from "./server/config/url";
import Debug from "debug";
//middleware
import logger from "koa-logger";


const PORT = process.env.PORT || 8880;
const env = process.env.NODE_ENV || 'development';
const app = new Koa();
var debug = Debug("server:app");
//Jade
//todo Jade has renamed tu Pug
app.pugVars = {
    urlConfig: urlConfig
};
app.render = function (path, locals) {
    var options = {
        pretty: true,
        //debug: true, //线上环境 false
        cache: false //线上环境true
    };
    if (env == "production") {
        options.cache = true;
    }

    return jade.compileFile(path, options)(_.assign(app.pugVars, locals));
};
app.use(logger());
//加载路由
myRoutes(app, {});
//start server
app.listen(PORT);
console.log("listening on port &s", PORT);
debug("starting server");
