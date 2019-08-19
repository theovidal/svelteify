const AvatarSubcomponents = [
  {
    name: 'MAvatar',
    props: [
      {
        name: 'color',
        description: 'Applies a custom color (text or background)',
        type: 'string',
        default: '""'
      },
      {
        name: 'size',
        description: 'Applies a custom size',
        type: 'string',
        default: '"48px"'
      },
      {
        name: 'tile',
        description: 'Makes the avatar squared',
        type: 'boolean',
        default: 'false'
      }
    ]
  }
]

export default AvatarSubcomponents
