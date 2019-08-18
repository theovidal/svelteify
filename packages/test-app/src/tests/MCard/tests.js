const VCardTests = [
  {
    name: 'Normal card',
    props: {}
  },
  {
    name: 'Colored card',
    props: {
      color: 'red darken4 white--text'
    }
  },
  {
    name: 'Themed card',
    props: {
      color: 'primary',
      dark: true
    }
  },
  {
    name: 'No elevation',
    props: {
      elevation: 0
    }
  },
  {
    name: 'Double elevation',
    props: {
      elevation: 4
    }
  },
  {
    name: 'Flat card',
    props: {
      flat: true
    }
  },
  {
    name: 'Hover effect',
    props: {
      hover: true
    }
  },
  {
    name: 'Raised effect',
    props: {
      raised: true
    }
  }
]

export default VCardTests
