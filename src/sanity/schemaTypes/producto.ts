import { defineField, defineType } from 'sanity';

export const productoType = defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre de la Figura',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre es obligatorio'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Identificador',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('El slug es obligatorio para identificar la figura'),
    }),
    defineField({
      name: 'orden',
      title: 'Orden de Prioridad (Hero y Catálogo)',
      type: 'number',
      description: 'Menor número aparece primero (ej: 1 para Spider-Man, 2 para Hulk, 3 para Venom).',
      initialValue: 10,
    }),
    defineField({
      name: 'categoria',
      title: 'Colección / Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Animales', value: 'Animales' },
          { title: 'Personajes', value: 'Personajes' },
          { title: 'Geométricos', value: 'Geométricos' },
          { title: 'Anime', value: 'Anime' },
        ],
      },
      validation: (rule) => rule.required().error('La categoría es obligatoria'),
    }),
    defineField({
      name: 'dificultad',
      title: 'Nivel de Dificultad',
      type: 'string',
      options: {
        list: [
          { title: 'Fácil', value: 'Fácil' },
          { title: 'Intermedio', value: 'Intermedio' },
          { title: 'Avanzado', value: 'Avanzado' },
          { title: 'Experto', value: 'Experto' },
          { title: 'Maestro', value: 'Maestro' },
        ],
      },
      initialValue: 'Intermedio',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción Detallada',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'figuras3D',
      title: 'Cantidad de Módulos (Piezas 3D)',
      type: 'number',
      validation: (rule) => rule.min(1).error('Debe tener al menos 1 pieza'),
    }),
    defineField({
      name: 'tiempo',
      title: 'Tiempo de Ensamblaje Estimado (ej: 18 horas)',
      type: 'string',
    }),
    defineField({
      name: 'precioBase',
      title: 'Precio Figura Terminada (COP)',
      type: 'number',
      validation: (rule) => rule.required().min(0).error('El precio base es requerido'),
    }),
    defineField({
      name: 'precioDIY',
      title: 'Precio Kit DIY (COP)',
      type: 'number',
      validation: (rule) => rule.required().min(0).error('El precio DIY es requerido'),
    }),
    defineField({
      name: 'imagenes',
      title: 'Galería de Imágenes',
      description: 'La primera imagen será la portada. Puedes cargar 1, 2, 4 o más imágenes y ordenarlas arrastrando.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo (accesibilidad)',
            },
          ],
        },
      ],
      validation: (rule) => rule.min(1).error('Debes incluir al menos una imagen'),
    }),
    defineField({
      name: 'colores',
      title: 'Composición de Colores',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'colorDetalle',
          title: 'Color',
          fields: [
            defineField({
              name: 'nombre',
              title: 'Nombre del Color',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'hex',
              title: 'Código Hexadecimal (ej: #ef4444)',
              type: 'string',
              validation: (rule) =>
                rule.required().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                  name: 'hex color',
                  invert: false,
                }),
            }),
            defineField({
              name: 'cantidad',
              title: 'Cantidad de Módulos de este Color',
              type: 'number',
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'nombre',
              hex: 'hex',
              qty: 'cantidad',
            },
            prepare(selection) {
              const { title, hex, qty } = selection;
              return {
                title: `${title} (${qty} piezas)`,
                subtitle: hex,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria',
      media: 'imagenes.0',
    },
  },
});