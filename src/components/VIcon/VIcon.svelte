<script>
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  export let color = ''
  export let dark = false
  export let large = false
  export let left = false
  export let light = false
  export let medium = false
  export let right = false
  export let small = false
  export let size = undefined
  export let xlarge = false

  // Theme-related operations
  let { style, strColors } = generateTheme($theme, color, false)

  let darkTheme = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }

  if (size === undefined) {
    if (small) {
      size = 16
    } else if (medium) {
      size = 28
    } else if (large) {
      size = 36
    } else if (xlarge) {
      size = 40
    }

    style += `font-size: ${size}px;`
  }
</script>

<i
  class="v-icon material-icons {strColors}"
  aria-hidden="true"
  class:v-icon--left="{left}"
  class:v-icon--right="{right}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
  {style}
>
  <slot />
</i>
