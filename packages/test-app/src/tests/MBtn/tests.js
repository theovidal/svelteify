import { MIcon } from '../../../../svelteify/dist/svelteify'

const MBtnTests = [
  {
    name: 'Colored button',
    props: {
      color: 'red darken-2',
      dark: true
    }
  },
  {
    name: 'Themed button',
    props: {
      color: 'primary',
      dark: true
    }
  },
  {
    name: 'Theme-colored button',
    props: {
      color: 'primary',
      flat: true
    }
  },
  {
    name: 'Outline button',
    props: {
      color: 'indigo',
      outline: true,
      depressed: true
    }
  },
  {
    name: 'Small button',
    props: {
      small: true
    }
  },
  {
    name: 'Large button',
    props: {
      large: true
    }
  },
  {
    name: 'Normal button',
    props: {}
  },
  {
    name: 'Disabled button',
    props: {
      disabled: true
    }
  },
  {
    name: 'Flat button',
    props: {
      flat: true
    }
  },
  {
    name: 'Depressed button',
    props: {
      depressed: true
    }
  },
  {
    name: 'Block button',
    props: {
      block: true
    }
  },
  {
    name: 'Rounded button',
    props: {
      round: true
    }
  },
  {
    name: 'Button with icon',
    props: {},
    children: [
      {
        component: MIcon,
        slot: 'send',
        props: {
          right: true
        }
      }
    ]
  },
  {
    name: 'Icon button',
    props: {
      icon: true
    },
    default_slot: false,
    children: [
      {
        component: MIcon,
        slot: 'edit',
        props: {}
      }
    ]
  },
  {
    name: 'Themed button',
    props: {
      icon: true,
      color: 'primary',
      flat: true
    },
    default_slot: false,
    children: [
      {
        component: MIcon,
        slot: 'edit',
        props: {}
      }
    ]
  },
  {
    name: 'Floating',
    props: {
      floating: true,
      color: 'red darken-4',
      dark: true
    },
    default_slot: false,
    children: [
      {
        component: MIcon,
        slot: 'edit',
        props: {}
      }
    ]
  },
  {
    name: 'Floating at corner',
    props: {
      floating: true,
      color: 'accent',
      dark: true,
      fixed: true,
      bottom: true,
      right: true
    },
    default_slot: false,
    children: [
      {
        component: MIcon,
        slot: 'edit',
        props: {}
      }
    ]
  }
]

export default MBtnTests
