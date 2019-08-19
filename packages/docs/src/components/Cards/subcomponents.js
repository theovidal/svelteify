const AvatarSubcomponents = [
  {
    name: 'MCard',
    props: [
      {
        name: 'color',
        description: 'Applies a custom color (text or background)',
        type: 'string',
        default: '""'
      },
      {
        name: 'dark',
        description: 'Applies a dark theme to the card',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'elevation',
        description: 'Specifies a custom elevation of the card',
        type: 'integer',
        default: '2'
      },
      {
        name: 'flat',
        description: 'Removes the shadow of the card',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'hover',
        description: 'Applies an additional shadow effect on hover',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'light',
        description: 'Applies a light theme to the card',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'raised',
        description: 'Adds a higher default elevation',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'tile',
        description: 'Makes the card squared',
        type: 'boolean',
        default: 'false'
      }
    ]
  },
  {
    name: 'MCardTitle',
    props: [
      {
        name: 'primary_title',
        description: 'Specifies if the title is primary',
        type: 'boolean',
        default: 'false'
      }
    ]
  }
]

export default AvatarSubcomponents
