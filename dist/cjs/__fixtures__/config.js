"use strict";
exports.__esModule = true;
exports.sampleConfig = void 0;
var defaults_js_1 = require("../utils/defaults.js");
exports.sampleConfig = (0, defaults_js_1.withDefaultConfig)({
    siteUrl: 'https://example.com',
    sourceDir: 'public',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    trailingSlash: false,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/'
            },
            {
                userAgent: 'black-listed-bot',
                disallow: ['/sub-path-1', '/path-2']
            },
            {
                userAgent: 'friendly-bot',
                allow: '/',
                crawlDelay: 10
            },
        ],
        additionalSitemaps: [
            'https://example.com/my-custom-sitemap-1.xml',
            'https://example.com/my-custom-sitemap-2.xml',
            'https://example.com/my-custom-sitemap-3.xml',
        ]
    }
});
