<script>
  import { theme } from '../../stores/theme'

  export let classes = ''
  export let dark = false
  export let inset = false
  export let light = false
  export let vertical = false

  let darkTheme = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }
</script>

<hr
  class="v-divider {classes}"
  class:v-divider--inset="{inset}"
  class:v-divider--vertical="{vertical}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
/>
