import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bhuman Pandita | Data Scientist & AI Engineer',
    short_name: 'Bhuman',
    description: 'Portfolio of Bhuman Pandita - Data Scientist, Agentic AI, and Machine Learning Enthusiast',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/swot_analysis_real_1770478345192.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
