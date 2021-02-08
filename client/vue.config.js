const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	configureWebpack: {
		plugins: [
			new CopyPlugin([
				{ from: 'src/config/appConfig.json', to: 'assets' }
			]),
		]
	},
	chainWebpack: (config) => {
		config.module
		  .rule("images")
		  .use("url-loader")
		  .loader("url-loader")
		  .tap((options) => {
			options.fallback.options.name = "assets/[name].[ext]"
			return options
		  });

		const svgRule = config.module.rule('svg');
		svgRule.uses.clear();

		// now make it use the url-loader for svg files
		svgRule
			.use('url-loader')
			.loader('url-loader');
	}
};
