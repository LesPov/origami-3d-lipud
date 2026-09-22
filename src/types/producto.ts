// src/types/producto.ts

export interface ColorData {
  nombre: string;
  hex: string;
  cantidad: number;
}

export interface Producto {
  id: string | number;
  nombre: string;
  slug?: string;
  categoria: string;
  dificultad: string;
  descripcion: string;
  figuras3D: number;
  tiempo: string;
  precioBase: number;
  precioDIY: number;
  imagenes: string[];
  colores: ColorData[];
  orden?: number;
}

// Interfaz para la respuesta directa (RAW) desde Sanity
export interface SanityProductoRaw {
  _id: string;
  nombre?: string;
  slug?: string;
  categoria?: string;
  dificultad?: string;
  descripcion?: string;
  figuras3D?: number;
  tiempo?: string;
  precioBase?: number;
  precioDIY?: number;
  imagenes?: any[];
  colores?: Array<{
    nombre?: string;
    hex?: string;
    cantidad?: number;
  }>;
  orden?: number;
}