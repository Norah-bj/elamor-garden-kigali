import { createFileRoute } from '@tanstack/react-router';
import { Experience } from '@/components/garden/Experience';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'El Amor Garden Kigali — Greenery is an Art, Life and Love' },
    { name: 'description', content: 'Discover plants, edible greens, garden design and handmade Made-in-Rwanda decor at El Amor Garden Kigali in Kacyiru.' },
    { property: 'og:title', content: 'El Amor Garden Kigali — Greenery is an Art, Life and Love' },
    { property: 'og:description', content: 'Plants, gardens, edible greens and handmade pieces, grown and created in Kigali.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Experience,
});
