const AvatarSubcomponents = [
  {
    name: 'MIcon',
    props: [
      {
        name: 'color',
        description: 'Applies a custom color (text or background)',
        type: 'string',
        default: '""'
      },
      {
        name: 'dark',
        description: 'Applies a dark theme to the icon',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'large',
        description: "Sets icon's size to large",
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'left',
        description: 'Places the icon at the left',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'light',
        description: 'Applies a light theme to the icon',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'medium',
        description: "Sets icon's size to medium",
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'right',
        description: 'Places the icon at the right',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'small',
        description: "Sets icon's size to small",
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'size',
        description: 'Applies a custom size for the icon',
        type: 'integer',
        default: 'undefined'
      },
      {
        name: 'xlarge',
        description: "Sets icon's size to xlarge",
        type: 'boolean',
        default: 'false'
      }
    ]
  }
]

export default AvatarSubcomponents
