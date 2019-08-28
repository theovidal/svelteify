<script>
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  // Component properties
  export let avatar = false
  export let classes = ''
  export let color = ''
  export let dark = false
  export let href = '#!'
  export let light = false

  // Theme-related operations
  let { style, strColors } = generateTheme($theme, color)

  let darkTheme = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }
</script>

<div role="listitem" class="{classes} {strColors}" {style}>
  <a
    class="v-list__tile"
    class:v-list__tile--avatar="{avatar}"
    class:theme--dark="{darkTheme}"
    class:theme--light="{!darkTheme}"
    {href}
  >
    <slot />
  </a>
</div>
