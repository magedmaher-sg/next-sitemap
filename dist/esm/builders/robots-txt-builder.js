import { toArray } from '../utils/array.js';
export class RobotsTxtBuilder {
    /**
     * Normalize robots.txt policies
     * @param policies
     * @returns
     */
    normalizePolicy(policies) {
        return policies.map((x) => ({
            ...x,
            allow: toArray(x.allow ?? []),
            disallow: toArray(x.disallow ?? []),
        }));
    }
    /**
     * Add new policy
     * @param key
     * @param rules
     * @returns
     */
    addPolicies(key, rules) {
        return rules.reduce((prev, curr) => `${prev}${key}: ${curr}\n`, '');
    }
    /**
     * Generates robots.txt content
     * @param config
     * @returns
     */
    generateRobotsTxt(config) {
        const { additionalSitemaps, policies } = config.robotsTxtOptions;
        const normalizedPolices = this.normalizePolicy(policies);
        let content = '';
        normalizedPolices.forEach((x) => {
            content += `# ${x.userAgent}\nUser-agent: ${x.userAgent}\n`;
            if (x.allow) {
                content += `${this.addPolicies('Allow', x.allow)}`;
            }
            if (x.disallow) {
                content += `${this.addPolicies('Disallow', x.disallow)}`;
            }
            if (x.crawlDelay) {
                content += `Crawl-delay: ${x.crawlDelay}\n`;
            }
            content += '\n';
        });
        // Append host
        content += `# Host\nHost: ${config.siteUrl}\n`;
        if (additionalSitemaps && additionalSitemaps.length > 0) {
            content += `\n# Sitemaps\n`;
            additionalSitemaps.forEach((x) => {
                content += `Sitemap: ${x}\n`;
            });
        }
        return content;
    }
}
