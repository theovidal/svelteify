const ButtonSubcomponents = [
  {
    name: 'MBtn',
    props: [
      {
        name: 'absolute',
        description: 'Applies an absolute position to the component',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'block',
        description: 'Makes the button full width',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'bottom',
        description: 'Puts the button at the bottom',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'classes',
        description: 'Applies CSS classes to the button',
        type: 'string',
        default: '""'
      },
      {
        name: 'color',
        description:
          'Applies a custom color to the button (text or background)',
        type: 'string',
        default: '""'
      },
      {
        name: 'dark',
        description: 'Applies a dark theme to the button',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'depressed',
        description: 'Removes the button box shadow',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'disabled',
        description: "Disables the button so it's not clickable",
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'fixed',
        description: 'Applies a fixed position to the button',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'flat',
        description: 'Removes the button background color',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'floating',
        description: 'Transforms the button into a floating-action button',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'href',
        description: 'Sets the link associated to the button',
        type: 'string',
        default: '"#!"'
      },
      {
        name: 'target',
        description: "Sets link's target",
        type: 'string',
        default: '""'
      },
      {
        name: 'icon',
        description: 'Makes an icon button',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'large',
        description: "Sets button's size to large",
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'left',
        description: 'Puts the button to the left',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'light',
        description: 'Applies a light theme to the button',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'outline',
        description: 'Keeps only a border around the button',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'right',
        description: 'Puts the button at the right',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'round',
        description: 'Makes the button round',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'small',
        description: "Sets button's size to small",
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'top',
        description: 'Puts the button to the top',
        type: 'boolean',
        default: 'false'
      }
    ]
  }
]

export default ButtonSubcomponents
