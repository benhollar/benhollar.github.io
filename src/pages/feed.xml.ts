import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import type { AstroGlobal } from "astro";
import rss from "@astrojs/rss";

import { parse as htmlParser } from "node-html-parser";

// Adapted from https://blog.damato.design/posts/astro-rss-mdx/ for modern MDX support
//  I had to shoehorn in support for Astro's dynamic image optimization, replacing the "src" attribute of all images in
//  each post.
export async function GET(context: AstroGlobal) {
    const renderers = await loadRenderers([getMDXRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const posts = await getCollection('blog');

    const items = [];
    for (const post of posts) {
        const { Content } = await render(post);
        let content = await container.renderToString(Content); 
        const html = htmlParser.parse(content);
        const images = html.querySelectorAll("img");
        for (const img of images) {
            const src = decodeURIComponent(img.getAttribute("src")!).replace("/_image?href=", "").split("?")[0];
            img.setAttribute("src", src);
        }
        content = html.toString();

        post.data.date.setTime(post.data.date.getTime() + -getTimezoneOffset("America/New_York") * 60 * 1000);
        items.push({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.excerpt,
            link: `/posts/${post.id}`,
            content: content,
        });
    }

    return rss({
        title: 'Ben Hollar - Blog',
        description: 'The personal blog of Ben Hollar, a full-stack developer and hobbyist nature photographer.',
        site: context.site ?? "https://www.benhollar.com",
        items,
    });
}

function getTimezoneOffset(timeZone: string) {
  const str = new Date().toLocaleString('en', {timeZone, timeZoneName: 'longOffset'});
  const [_, hours, minutes] = str.match(/([+-]\d+):(\d+)$/) || [, '+00', '00'];
  return Number(hours) * 60 + (Number(hours) > 0 ? +minutes : -minutes);
}
