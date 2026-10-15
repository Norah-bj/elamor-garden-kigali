import hero from '@/assets/garden-hero.jpg';
import plants from '@/assets/plants-editorial.jpg';
import greens from '@/assets/greens-editorial.jpg';
import craft from '@/assets/craft-editorial.jpg';
import landscape from '@/assets/landscape-editorial.jpg';
import work from '@/assets/garden-work.jpg';
import leaf from '@/assets/leaf-study.jpg';
import final from '@/assets/final-botanical.jpg';
import plantOne from '@/assets/plant-collection-1.jpg';
import plantTwo from '@/assets/plant-collection-2.jpg';
import culinary from '@/assets/culinary-detail.jpg';
import craftDetail from '@/assets/craft-detail.jpg';

export const images = { hero, plants, greens, craft, landscape, work, leaf, final, plantOne, plantTwo, culinary, craftDetail };
export const whatsapp = 'https://wa.me/250785211604';
export const messageLink = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;
export const worlds = [
  { number: '01', name: 'Plants', line: 'Bring living architecture indoors.', image: plants, anchor: 'plants' },
  { number: '02', name: 'Edible greens', line: 'Grown for kitchens, tables and curious palates.', image: greens, anchor: 'greens' },
  { number: '03', name: 'Garden services', line: 'From an empty space to a garden with character.', image: landscape, anchor: 'services' },
  { number: '04', name: 'Decor & gifts', line: 'Handmade pieces with a little more meaning.', image: craft, anchor: 'gifts' },
];
export const collection = [
  { name: 'Statement foliage', kind: 'Indoor plants', image: plantOne, description: 'A little living architecture for your space.' },
  { name: 'Sculptural greens', kind: 'Home & office plants', image: plantTwo, description: 'Form, texture and everyday green.' },
  { name: 'The garden edit', kind: 'Plant collection', image: plants, description: 'Plants to live with and grow with.' },
];
export const gallery = [
  { name: 'Gardens', image: landscape },
  { name: 'Plants', image: plantOne },
  { name: 'Plant bar', image: plants },
  { name: 'Microgreens', image: culinary },
  { name: 'Pots', image: craftDetail },
  { name: 'Decor', image: craft },
];
