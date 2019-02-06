const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const JsDocPlugin = require('jsdoc-webpack4-plugin');
const jsonfile = require("jsonfile");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJSON = jsonfile.readFileSync("package.json");

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';

env == "production" && increaseVersionBuildNumber();


let webpackConfig = {
    devtool: sourceMap ? 'cheap-module-eval-source-map' : undefined,
    mode: env,
  	output: {
  	  filename: '[name].min.js',
  	  path: path.resolve(__dirname, 'dist'),
  	  libraryTarget: 'umd',
  	  auxiliaryComment: 'Test Comment'
  	},
  	module : {
  		rules : [
  			  {
	            test: /\.(js$)/,
              // exclude: /(node_modules)/,
	            use: [{
	                loader: "babel-loader",
                  options : {
                      exclude: /node_modules/,
                  }
	            }]
	        },
          {
              test: /\.(json)/,
              type: "javascript/auto",
              use: [{
                  loader : path.resolve(__dirname, "scripts/unexportize.js")
              }],
          },
          {
              test: /\.(png|jpg|gif|svg)$/,
              loader: "file-loader",
              options: {
                  name: "[name].[ext]?[hash]"
              }
          },
          /** yaml */
          { test: /\.yaml$/, include: [path.join(__dirname, "res")], use: ["json-loader", "yaml-loader"] },
          /** xml */
          { test: /\.xml$/, include: [path.join(__dirname, "res")], loader: "xml-loader" },
          /** coffee */
          /** json */
          // { test: /\.json$/, loader: "json-loader" }
  		]
  	},
  	resolve : {
  		modules: ["src", "node_modules", "res"],
  		alias : {
  		    "postal"                      : "postal/postal",
          "unicycle"                  : "unicycle/unicycle",
          "tweener"                   : "tweener/tweener",
          "todo"                      : "todojs/todo",
          "three"                     : "three.js",
          "three-effectcomposer"                     : "three-effectcomposer",
          "file"                      : "requirejs-text/text",
          "dollaclass"                : "dollaclass/dollaclass",
          "hotkeys-js"                : "hotkeys-js/dist/hotkeys.min",
          "resize-observer-polyfill"  : "resize-observer-polyfill/dist/ResizeObserver",
          "statsjs"                   : "stats.js/build/stats.min",
          "lodash"                    : "lodash/index",
  		}
  	},
  	resolveLoader : {
        alias: {
            "txt" : "raw-loader"
        }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.join(__dirname, 'dist', 'index.html'),
        template: path.join(__dirname, 'static', 'index.html'),
        inject: env == "development",
      }),
      new BundleAnalyzerPlugin()
    ],
};

webpackConfig.entry = {
    "main" : "main.esnext",
}

function increaseVersionBuildNumber(){
    var splittedVersion = packageJSON.version.split(".");
    var splittedMinorBuild = splittedVersion[2].split("-");
    splittedMinorBuild[0]++;
    var newVersion = [splittedVersion[0], splittedVersion[1], splittedMinorBuild.join("-")].join(".");
    packageJSON.version = newVersion;

    jsonfile.writeFileSync("package.json", packageJSON, { spaces : 4 });
}

module.exports = webpackConfig