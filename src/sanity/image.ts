// src/sanity/image.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'xc9qh5w3',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Genera URLs optimizadas compatibles con hotspot y crop de Sanity.
 * Formato automático WebP con compresión balanceada.
 */
export function urlForImage(source: any, width = 1200): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  
  try {
    return builder
      .image(source)
      .width(width)
      .auto('format')
      .quality(85)
      .fit('max')
      .url();
  } catch (err) {
    console.warn('Advertencia: No se pudo generar la URL para la imagen de Sanity:', err);
    return '';
  }
}