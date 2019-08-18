import { MBtn } from '../../../../svelteify/dist/svelteify'

const MFooterTests = [
  {
    name: 'Normal footer',
    props: {
      classes: 'pa-3'
    }
  },
  {
    name: 'Colored footer',
    props: {
      color: 'red darken-4',
      dark: true,
      classes: 'pa-3'
    }
  },
  {
    name: 'Themed footer',
    props: {
      color: 'primary',
      dark: true,
      classes: 'pa-3'
    }
  },
  {
    name: 'Footer with widgets',
    props: {},
    children: [
      {
        component: MBtn,
        slot: 'Home',
        props: {
          flat: true
        }
      },
      {
        component: MBtn,
        slot: 'Download',
        props: {
          flat: true
        }
      },
      {
        component: MBtn,
        slot: 'About',
        props: {
          flat: true
        }
      }
    ]
  }
]

export default MFooterTests
