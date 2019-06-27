import { VBtn } from '../../../../sveltify/dist/svelteify'

const VFooterTests = [
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
        component: VBtn,
        slot: 'Home',
        props: {
          flat: true
        }
      },
      {
        component: VBtn,
        slot: 'Download',
        props: {
          flat: true
        }
      },
      {
        component: VBtn,
        slot: 'About',
        props: {
          flat: true
        }
      }
    ]
  }
]

export default VFooterTests
