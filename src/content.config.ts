// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Define your collection(s)
const blogSchema = z.object({
    title: z.string(),
    date: z.coerce.date(),
    last_modified_at: z.coerce.date(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    comments: z.coerce.boolean().optional(),
})
const blog = defineCollection({
    loader: glob({ pattern: "**/*{.md,.mdx}", base: "./src/content/blog" }),
    schema: blogSchema
});

const imageSchema = ({ image }) => z.object({
    url: image(),
    date: z.coerce.date(),
    title: z.string().optional(),
    alt: z.string(),
    tags: z.array(z.string()),
    hideGallery: z.boolean().optional()
})
const images = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/images" }),
    schema: imageSchema
})

const gallerySchema = z.object({
    name: z.string(),
    images: z.array(reference("images")),
})
const galleries = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/galleries" }),
    schema: gallerySchema
})

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, images, galleries };
