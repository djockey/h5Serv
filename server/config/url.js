var jsversion = "local";
var cssversion = "local";
// !!!!上面这个不要动,是上线时,程度自动修改的版本号!!!!

var jsStaticServer = process.env.STATIC || "static";
var cssStaticServer = process.env.STATIC_CSS || "static";

export default {
    js: "http://" + jsStaticServer + ".gongsibao.com/h5js/" + jsversion + "/",
    css: "http://" + cssStaticServer + ".gongsibao.com/css/" + cssversion + "/",
    img: "http://" + cssStaticServer + ".gongsibao.com/css/" + cssversion + "/images/h5-3.0/",
    server: "http://app.gongsibao.com",
    //server: "http://192.168.16.52:9210",
    serverImg: "http://app.gongsibao.com"
};

