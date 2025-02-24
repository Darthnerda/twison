var fs = require("fs");
var Uglify = require("uglify-js");

var package = JSON.parse(fs.readFileSync("package.json", "utf-8"));
var html = fs.readFileSync("src/storyFormat.html", "utf-8");
var js1 = Uglify.minify("src/twison.js");
// var js2 = Uglify.minify("src/henryscroll.js");

html = html.replace("{{SCRIPT1}}", js1.code);
//html = html.replace("{{SCRIPT2}}", js2.code);

var outputJSON = {
  name: package.name,
  version: package.version,
  author: package.author,
  description: package.description,
  proofing: false,
  source: html,
};

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

var outputString =
  "window.storyFormat(" + JSON.stringify(outputJSON, null, 2) + ");";
fs.writeFile("dist/format.js", outputString, function (err) {
  if (err) {
    console.log("Error building story format:", err);
  } else {
    console.log("Successfully built story format to dist/format.js");
  }
});
