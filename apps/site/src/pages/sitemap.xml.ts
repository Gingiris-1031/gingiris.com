import { getCollection } from "astro:content";
import { supportedLocales } from "@yipei/site-content";

export const prerender = true;

const origin = "https://gingiris.com";

function urlEntry(path: string, zhPath: string, enPath: string, priority: string, changefreq: string) {
  return `  <url>
    <loc>${origin}${path}</loc>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${origin}${zhPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${origin}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${enPath}" />
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function zhOnlyUrlEntry(path: string, priority: string, changefreq: string) {
  return `  <url>
    <loc>${origin}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const entries = await getCollection("insights");
  const articleSlugs = [...new Set(entries.map((entry) => entry.data.slug))].sort();
  const urls = [
    ...supportedLocales.map((locale) => urlEntry(`/${locale}`, "/zh", "/en", "1.0", "weekly")),
    ...supportedLocales.map((locale) => urlEntry(`/${locale}/services`, "/zh/services", "/en/services", "0.9", "monthly")),
    zhOnlyUrlEntry("/zh/learning", "0.8", "monthly"),
    ...supportedLocales.map((locale) => urlEntry(`/${locale}/insights`, "/zh/insights", "/en/insights", "0.9", "weekly")),
    ...articleSlugs.flatMap((slug) => supportedLocales.map((locale) =>
      urlEntry(`/${locale}/insights/${slug}`, `/zh/insights/${slug}`, `/en/insights/${slug}`, "0.8", "monthly"),
    )),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>\n`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
