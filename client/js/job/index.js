/**
 * Created by jockey on 16/1/14.
 */
define(function(){
	var pagejob = require("../modules/pagejob/index");
	var jobs = [];
    jobs.push(require("../units/index/pagefun"));                           // 微信分享
	for (var i = 0; i < jobs.length; i++) {
		var job = jobs[i];
		pagejob.add(job);
	}
	pagejob.start();
});
