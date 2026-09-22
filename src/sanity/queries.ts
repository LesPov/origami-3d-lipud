// src/sanity/queries.ts

export const PRODUCTOS_QUERY = `*[_type == "producto" && !(_id in path("drafts.**"))] | order(coalesce(orden, 100) asc, _createdAt desc) {
  _id,
  nombre,
  "slug": slug.current,
  categoria,
  dificultad,
  descripcion,
  figuras3D,
  tiempo,
  precioBase,
  precioDIY,
  imagenes[] {
    asset->,
    hotspot,
    crop,
    alt
  },
  colores[] {
    nombre,
    hex,
    cantidad
  },
  orden
}`;