'use strict';
import fs from 'fs';
import Router from "koa-router";
//特定路由需要使用的middleware
import redirectToLogin from "./middleware/redirectToLogin";
const router = Router();
export default function (parent, options) {
    /*
     *  controller的定义为
     *
     *  {
     *       path: String
     *       needLogin : boolean
     *       method: String get/post...  (default = get)
     *       type: String html/json.....  (default = html)
     *       handler: Function
     *  }
     * */
    fs.readdirSync(__dirname + '/controller').forEach(function (name) {
        var routeModule = require("./controller/" + name);
        if (routeModule.routes) {
            //处理默认首页
            if (name == "index") {
                router.get("/", routeModule.routes[0].handler);
            }
            var perfix = routeModule.perfix || "/" + name;
            for (let i = 0, len = routeModule.routes.length; i < len; i++) {
                //单个路由的配置
                let routeItem = routeModule.routes[i];
                routeItem.type = routeItem.type || ["html"];
                for (var j = 0; j < routeItem.type.length; j++) {
                    var type = routeItem.type[j];
                    if(type){
                        type = "."+type;
                    }
                    var method = routeItem.method || "get";
                    if(routeItem.needLogin){
                        router.use(perfix + routeItem.path + type,redirectToLogin);
                    }
                    router[method](perfix + routeItem.path + type, routeItem.handler);
                    console.log(i,' %s %s%s%s', method, perfix, routeItem.path, type);
                }
            }
        }
    });
    parent.use(router.routes());
};
