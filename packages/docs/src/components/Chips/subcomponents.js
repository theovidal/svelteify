const ChipSubcomponents = [
  {
    name: 'MChip',
    props: [
      {
        name: 'close',
        description: 'Adds a button to close the chip',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'color',
        description: 'Applies a custom color (text or background)',
        type: 'string',
        default: '""'
      },
      {
        name: 'dark',
        description: 'Applies a dark theme to the chip',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'disabled',
        description: "Disables the chip so it can't be clicked",
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'label',
        description: 'Transforms the chip into a little label',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'light',
        description: 'Applies a light theme to the chip',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'outline',
        description: 'Keeps only a border around the chip',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'selected',
        description: 'Checks if the chip is selected',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'small',
        description: "Sets chip's size to small",
        type: 'boolean',
        default: 'false'
      }
    ]
  }
]

export default ChipSubcomponents
