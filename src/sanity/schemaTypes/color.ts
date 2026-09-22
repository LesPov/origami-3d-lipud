import { defineType, defineField } from 'sanity';

export const colorType = defineType({
  name: 'colorItem',
  title: 'Color de Módulo',
  type: 'object',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Color',
      type: 'string',
      description: 'Ejemplo: Rojo Carmesí, Negro Azabache, Blanco Puro',
      validation: (Rule) => Rule.required().error('El nombre del color es obligatorio'),
    }),
    defineField({
      name: 'hex',
      title: 'Código Hexadecimal (#RRGGBB)',
      type: 'string',
      description: 'Ejemplo: #ef4444 o #18181b',
      validation: (Rule) =>
        Rule.required()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            name: 'hex',
            invert: false,
          })
          .error('Debe ser un código hexadecimal válido que inicie con #'),
    }),
    defineField({
      name: 'cantidad',
      title: 'Cantidad de Módulos de este color',
      type: 'number',
      description: 'Número exacto de piezas de este color',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .error('La cantidad debe ser un número entero mayor a 0'),
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'cantidad',
      hex: 'hex',
    },
    prepare({ title, subtitle, hex }) {
      return {
        title: title || 'Sin color',
        subtitle: subtitle ? `${subtitle} módulos` : '0 módulos',
      };
    },
  },
});