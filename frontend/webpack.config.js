const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "../hotel_booking/public/js/react"),
		filename: "bundle.js",
		publicPath: "/assets/hotel_booking/js/react/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	// Set mode explicitly based on environment variable
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	// Enable source maps for development
	devtool: process.env.NODE_ENV === "production" ? false : "source-map",
	// Performance optimization
	performance: {
		hints: process.env.NODE_ENV === "production" ? "warning" : false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	// Add optimization for development and production
	optimization: {
		moduleIds: "named",
		// Enable tree shaking in production
		usedExports: process.env.NODE_ENV === "production",
		// Split chunks in production
		splitChunks:
			process.env.NODE_ENV === "production"
				? {
						chunks: "all",
						name: false,
				  }
				: false,
	},
	// Console output configuration
	stats: {
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false,
	},
};
