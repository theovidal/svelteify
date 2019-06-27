import { VIcon, VAvatar } from '../../../../sveltify/dist/svelteify'

const VChipTests = [
  {
    name: 'Basic chip',
    props: {}
  },
  {
    name: 'Colored chip',
    props: {
      color: 'red darken-4',
      dark: true
    }
  },
  {
    name: 'Themed chip',
    props: {
      color: 'primary',
      dark: true
    }
  },
  {
    name: 'Label chip',
    props: {
      label: true
    }
  },
  {
    name: 'Outline chip',
    props: {
      outline: true,
      color: 'green ligthen-2 green--text text--lighten-2'
    }
  },
  {
    name: 'Closable chip',
    props: {
      close: true
    }
  },
  {
    name: 'Icon chip',
    props: {},
    children: [
      {
        component: VIcon,
        slot: 'edit',
        props: {
          right: true
        }
      }
    ]
  },
  {
    name: 'Avatar chip',
    props: {},
    default_slot: false,
    children: [
      {
        component: VAvatar,
        slot: 'A',
        props: {
          color: 'teal'
        }
      }
    ]
  }
]

export default VChipTests
