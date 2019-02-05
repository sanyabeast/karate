var jsonfile = require("jsonfile");
var colors = require("colors");
var fs = require("fs");
var fsExtra = require("fs-extra");
var rimraf = require("rimraf");
var path = require("path");
var exec = require('child_process').exec;

var targetPackageName = process.argv[2] || null;

var package = jsonfile.readFileSync("package.json");

var tasks = [];

for (var k in package.dependencies){
	if (package.dependencies[k].indexOf("git://") > -1){
		tasks.push({
			gitUrl : package.dependencies[k], 
			rootDirectoryPath : "node_modules", 
			packageName : k
		});
	}
}

for (var k in package.gitDependencies){
	if (package.gitDependencies[k].indexOf("git://") > -1){
		tasks.push({
			gitUrl : package.gitDependencies[k], 
			rootDirectoryPath : "node_modules", 
			packageName : k
		});
	}
}


var count = tasks.length;


function clone(params, onComplete){

	var gitUrl = params.gitUrl;
	var rootDirectoryPath = params.rootDirectoryPath;
	var packageName = params.packageName;

	if (targetPackageName !== null && targetPackageName !== packageName){
		return;
	}

	gitUrl = gitUrl.replace("git://", "https://");
	var targetPath = path.join(rootDirectoryPath, packageName);
	console.log(("[" + (tasks.length + 1) + "/" + count + "]").grey, packageName.cyan, ": removing dir...".gray);
	rimraf(targetPath, function(err, data){
		if (err){
			console.log(("[" + (tasks.length + 1) + "/" + count + "]").grey, "Unable to remove directory `".red + targetPath + "`".red, err);
			onComplete && onComplete();
		} else {
			console.log(("[" + (tasks.length + 1) + "/" + count + "]").grey, packageName.cyan, ": creating dir...".gray);
			fs.mkdirSync(targetPath);
			console.log(("[" + (tasks.length + 1) + "/" + count + "]").grey, packageName.cyan, ": start cloning...".gray);
			exec(["git", "clone", gitUrl, "./"].join(" "), {
				cwd : targetPath
			}, function(err, stdout, stderr){
				if (err){
					console.log(("[" + (tasks.length + 1) + "/" + count + "]").grey, packageName.cyan, ": cloning failed".red);
				} else {
					console.log(("[" + (tasks.length + 1) + "/" + count + "]").grey, packageName.cyan, ": cloned".green);
				}

				onComplete && onComplete();

			});
		}
	});
}

function nextTask(){
	var task = tasks.pop();
	if (task){
		clone(task, nextTask);
	}
}

nextTask();