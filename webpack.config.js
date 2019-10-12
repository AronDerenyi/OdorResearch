const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	// mode: "production",
	mode: "development",
	devtool: "inline-source-map",
	target: "electron-renderer",
	node: {
		__dirname: false,
		__filename: false
	},
	entry: {
		run: Path.resolve(__dirname, "app/run.ts"),
		index: Path.resolve(__dirname, "app/index.ts"),
	},
	output: {
		path: Path.resolve(__dirname, "build"),
		filename: "[name].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: "body",
			chunks: ["index"],
			fileName: "index.html",
			title: "Odor Research"
		}),
		new CopyPlugin([{
			from: "app/package.json",
			to: "package.json",
		}, {
			from: "assets",
			to: "assets",
			ignore: [".DS_Store"]
		}]),
		new VueLoaderPlugin()
	],
	resolve: {
		extensions: [".js", ".ts"],
		alias: {
			"src": Path.resolve(__dirname, "app/src"),
			"res": Path.resolve(__dirname, "app/res")
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: [
					"vue-style-loader",
					"style-loader",
					"css-loader"
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: "file-loader"
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader"
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					transpileOnly: true,
					preserveWhitespace: false
				}
			}
		]
	}
};