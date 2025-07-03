import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";
import { parse as htmlParser } from "node-html-parser";

export async function GET(context) {
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
            const src = decodeURIComponent(img.getAttribute("src")).replace("/_image?href=", "").split("?")[0];
            img.setAttribute("src", src);
        }
        content = html.toString();

        items.push({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.excerpt,
            link: `/posts/${post.id}`,
            content: content,
        });
    }

    return rss({
        title: 'My blog',
        description: 'All my thoughts',
        site: context.site,
        items,
    });
}
