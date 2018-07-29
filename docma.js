"use strict";

const Docma = require("docma");

const buildConfig = {
	src: [
		{
			core: './index.js'
		},
		'./LICENSE.md',
		{
			guide: './README.md'
		}
	],
	dest: './output/docs',
	app: {
		title: 'WebSuite Documentation',
		routing: 'path',
		entrance: 'content:guide',
		base: '/docs'
	},
	template: {
		path: 'zebra',
		options: {
			title: {
				label: 'WebSuite Documentation',
				href: '/docs/?'
			},
			navbar: true,
			sidebar: {
				enabled: true,
				outline: 'tree',
				collapsed: true,
				toolbar: true
			}
		}
	},
	clean: "true"
};

Docma.create()
	.build(buildConfig)
	.catch(error => {
		console.log(error);
	});