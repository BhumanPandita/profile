import { MetadataRoute } from 'next'
export const dynamic = "force-static";
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bhumanpandita.github.io',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
