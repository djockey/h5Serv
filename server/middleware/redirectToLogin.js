'use strict';
/**
 * Created by shenshen on 16/4/24.
 */
//重定向到登录页面
export default function*(next) {
    var token = this.cookies.get("token");
    if (!token) {
        console.log("redirect to login because %s need login", this.url);
        return this.response.redirect("/log/login.html?redirect=" + encodeURIComponent(this.url));
    }
    yield next;
}
