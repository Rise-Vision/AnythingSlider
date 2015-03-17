/* jshint node: true */

(function (console) {
  "use strict";

  var gulp = require("gulp");
  var bump = require("gulp-bump");
  var runSequence = require("run-sequence");
  var factory = require("widget-tester").gulpTaskFactory;
  var path = require("path");
  var bower = require("gulp-bower");
  var del = require("del");
  var colors = require("colors");

  gulp.task("clean-bower", function(cb){
    del(["./components/**"], cb);
  });

  gulp.task("metrics", factory.metrics());

  // ***** Primary Tasks ***** //
  gulp.task("bower-clean-install", ["clean-bower"], function(cb){
    return bower().on("error", function(err) {
      console.log(err);
      cb();
    });
  });

  gulp.task("bump", function(){
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task("test", function(cb) {
    runSequence("metrics", cb);
  });

  gulp.task("default", [], function() {
    console.log("********************************************************************".yellow);
    console.log("  gulp bower-clean-install: delete and re-install bower components".yellow);
    console.log("  gulp bump: apply new version number".yellow);
    console.log("********************************************************************".yellow);
    return true;
  });

})(console);
