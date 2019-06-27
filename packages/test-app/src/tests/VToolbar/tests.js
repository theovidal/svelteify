const VToolbarTests = [
  {
    name: 'Normal toolbar',
    props: {}
  },
  {
    name: 'Dense toolbar',
    props: {
      dense: true
    }
  },
  {
    name: 'Colored toolbar',
    props: {
      color: 'red darken-4',
      dark: true
    }
  },
  {
    name: 'Themed toolbar',
    props: {
      color: 'primary',
      dark: true
    }
  },
  {
    name: 'Extended toolbar',
    props: {
      extended: true
    }
  },
  {
    name: 'Flat toolbar',
    props: {
      flat: true
    }
  }
]

export default VToolbarTests
