// src/data/productos.ts
import type { Producto, ColorData } from '../types/producto';

export type { Producto, ColorData };

// PRODUCTOS LOCALES DE FALLBACK (Garantizan que la web jamás quede vacía ante fallos de Sanity)
export const productosFallback: Producto[] = [
  {
    id: 'fallback-spiderman',
    nombre: 'Spider-Man',
    slug: 'spider-man',
    categoria: 'Personajes',
    dificultad: 'Experto',
    descripcion:
      'El trepamuros esculpido en papel. Más de 800 módulos ensamblados a mano para recrear su icónico traje rojo y azul, destacando los detalles en negro de la red y el blanco puro de sus grandes ojos.',
    figuras3D: 850,
    tiempo: '18 horas',
    precioBase: 45000,
    precioDIY: 25000,
    imagenes: ['https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=1200&auto=format&fit=crop&q=80'],
    colores: [
      { nombre: 'Rojo', hex: '#ef4444', cantidad: 682 },
      { nombre: 'Azul', hex: '#3b82f6', cantidad: 100 },
      { nombre: 'Negro', hex: '#18181b', cantidad: 50 },
      { nombre: 'Blanco', hex: '#ffffff', cantidad: 18 },
    ],
    orden: 1,
  },
  {
    id: 'fallback-hulk',
    nombre: 'Hulk',
    slug: 'hulk',
    categoria: 'Personajes',
    dificultad: 'Maestro',
    descripcion:
      'El gigante esmeralda en toda su gloria. Una escultura masiva que supera las 1000 piezas, estructurada para resaltar su imponente musculatura verde, sus clásicos pantalones morados y los detalles de su cabello oscuro.',
    figuras3D: 1050,
    tiempo: '22 horas',
    precioBase: 50000,
    precioDIY: 30000,
    imagenes: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80'],
    colores: [
      { nombre: 'Verde', hex: '#22c55e', cantidad: 600 },
      { nombre: 'Morado', hex: '#a855f7', cantidad: 250 },
      { nombre: 'Negro', hex: '#18181b', cantidad: 200 },
    ],
    orden: 2,
  },
  {
    id: 'fallback-venom',
    nombre: 'Venom',
    slug: 'venom',
    categoria: 'Personajes',
    dificultad: 'Experto',
    descripcion:
      'El simbionte más letal cobra vida. Una obra imponente dominada por módulos negros, con detalles precisos en blanco para los ojos y el emblema, coronada por el amenazante rojo carmesí de su lengua.',
    figuras3D: 900,
    tiempo: '20 horas',
    precioBase: 45000,
    precioDIY: 25000,
    imagenes: ['https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80'],
    colores: [
      { nombre: 'Negro', hex: '#000000', cantidad: 700 },
      { nombre: 'Blanco', hex: '#ffffff', cantidad: 150 },
      { nombre: 'Rojo', hex: '#ef4444', cantidad: 50 },
    ],
    orden: 3,
  },
];

// Compatibilidad con imports históricos
export const productos = productosFallback;
export const loroTropical = productosFallback[0];