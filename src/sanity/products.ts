// src/sanity/products.ts
import { createClient } from '@sanity/client';
import { PRODUCTOS_QUERY } from './queries';
import { urlForImage } from './image';
import type { Producto, SanityProductoRaw } from '../types/producto';
import { productosFallback } from '../data/productos';

const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'xc9qh5w3',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // En SSG build-time garantiza siempre datos frescos
});

const DEFAULT_IMAGE_PLACEHOLDER = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80';

/**
 * ADAPTADOR: Transforma un documento SanityRaw al contrato universal 'Producto'
 */
function normalizeSanityProduct(raw: SanityProductoRaw): Producto {
  const imagenesUrls: string[] = [];
  
  if (Array.isArray(raw.imagenes) && raw.imagenes.length > 0) {
    raw.imagenes.forEach((imgObj) => {
      const url = urlForImage(imgObj, 1200);
      if (url && url.trim() !== '') {
        imagenesUrls.push(url);
      }
    });
  }

  // Fallback si no hay imágenes cargadas
  if (imagenesUrls.length === 0) {
    imagenesUrls.push(DEFAULT_IMAGE_PLACEHOLDER);
  }

  // Normalización de colores
  const colores = Array.isArray(raw.colores)
    ? raw.colores.map((c) => ({
        nombre: c.nombre || 'Genérico',
        hex: c.hex && c.hex.startsWith('#') ? c.hex : '#10b981',
        cantidad: Number(c.cantidad) || 0,
      }))
    : [];

  return {
    id: raw._id,
    nombre: raw.nombre || 'Figura Origami 3D',
    slug: raw.slug || '',
    categoria: raw.categoria || 'Colección',
    dificultad: raw.dificultad || 'Intermedio',
    descripcion: raw.descripcion || 'Escultura de origami 3D hecha con módulos de papel ensamblados a mano.',
    figuras3D: Number(raw.figuras3D) || 0,
    tiempo: raw.tiempo || 'Consultar tiempo',
    precioBase: Number(raw.precioBase) || 0,
    precioDIY: Number(raw.precioDIY) || 0,
    imagenes: imagenesUrls,
    colores: colores,
    orden: typeof raw.orden === 'number' ? raw.orden : 99,
  };
}

/**
 * FUNCIÓN CENTRAL: Obtiene los productos desde Sanity con fallback de seguridad
 */
export async function getProductos(): Promise<Producto[]> {
  try {
    const rawProducts = await client.fetch<SanityProductoRaw[]>(PRODUCTOS_QUERY);

    if (Array.isArray(rawProducts) && rawProducts.length > 0) {
      const productosNormalizados = rawProducts.map(normalizeSanityProduct);
      
      const productosValidos = productosNormalizados.filter(
        (p) => p.precioBase > 0 && p.nombre && p.nombre.trim() !== ''
      );

      if (productosValidos.length > 0) {
        return productosValidos;
      }
    }

    console.warn('[Sanity] No se obtuvieron productos válidos desde Sanity. Activando fallback local.');
    return productosFallback;
  } catch (error) {
    console.error('[Sanity Error] Fallo al consultar Sanity CMS. Se recurre al fallback local:', error);
    return productosFallback;
  }
}