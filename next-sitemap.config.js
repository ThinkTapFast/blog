/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://thinktapfast-blog.vercel.app',
    generateRobotsTxt: true, // generate also robots.txt 
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ['/admin/*', '/api/*'], // exclude URLs
};
