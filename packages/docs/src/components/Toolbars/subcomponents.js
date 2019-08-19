const ToolbarSubcomponents = [
  {
    name: 'MToolbar',
    props: [
      {
        name: 'absolute',
        description: 'Applies an absolute position to the toolbar',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'card',
        description: 'Inherits corner rounding when used within card',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'classes',
        description: 'Applies CSS classes to the toolbar',
        type: 'string',
        default: '""'
      },
      {
        name: 'color',
        description: 'Applies a custom color (text or background)',
        type: 'string',
        default: '""'
      },
      {
        name: 'dark',
        description: 'Applies a dark theme to the toolbar',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'dense',
        description: 'Reduces the height of the toolbar',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'extended',
        description: 'Extends the height of the toolbar',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'fixed',
        description: 'Fixes the toolbar at the top of the page',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'flat',
        description: 'Removes the shadow of the toolbar',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'floating',
        description: 'Applies a floating position to the toolbar',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'light',
        description: 'Applies a light theme to the toolbar',
        type: 'boolean',
        default: 'false'
      },
      {
        name: 'tabs',
        description: 'Adds an extra space for tabs',
        type: 'boolean',
        default: 'false'
      }
    ]
  },
  {
    name: 'MToolbarTitle',
    props: [
      {
        name: 'classes',
        description: 'Applies CSS classes to the toolbar',
        type: 'string',
        default: '""'
      }
    ]
  },
  {
    name: 'MToolbarSideIcon',
    props: [
      {
        name: 'dark',
        description: 'Applies a dark theme to the toolbar',
        type: 'boolean',
        default: 'false'
      }
    ]
  },
  {
    name: 'MToolbarItems',
    props: [
      {
        name: 'classes',
        description: 'Applies CSS classes to the toolbar',
        type: 'string',
        default: '""'
      }
    ]
  }
]

export default ToolbarSubcomponents
