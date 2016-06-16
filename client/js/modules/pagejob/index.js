/**
 * Created by shenshen on 15/9/21.
 */
define(function () {
	var jobs = [];
	var initJobs = [];
	var execJobs = [];
	var checkErrorJobs = [];
	var initErrorJobs = [];
	return {
		add: function (job) {
			if (job._jobName) {
				jobs.push(job);
			} else {
				return null;
			}
		},
		start: function () {
			// check job
			for (var i = 0; i < jobs.length; i++) {
				var job = jobs[i];
				try {
					var passed = job.check();
					if (passed) {
						initJobs.push(job);
					} else {
						console.log(job._jobName + "check is  false,not exec ");
					}
				} catch (e) {
					checkErrorJobs.push(job);
					console.log(e);
					throw new Error(job._jobName + ':job check error');
				}
			}
			//job init start
			for (var i = 0; i < initJobs.length; i++) {
				var job = initJobs[i];
				if (job.init) {
					//try {
					job.init();
					execJobs.push(job);
					/*                    } catch (e) {
					 initErrorJobs.push(job);
					 throw new Error(job._jobName + ':job init error');
					 }*/
				} else {
					execJobs.push(job);
					console.log(job._jobName + "don't have init function");
				}

			}
			//job exec start
			for (var i = 0; i < execJobs.length; i++) {
				var job = execJobs[i];
				if (job.exec) {
					try {
						job.exec();
					} catch (e) {
						console.log(e);
						throw new Error(job._jobName + ':job exec error');
					}
				}
			}
		}
	}
});