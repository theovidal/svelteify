<script>
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  // Component properties
  export let absolute = false
  export let classes = ''
  export let color = ''
  export let dark = false
  export let fixed = false
  export let height = '32px'
  export let inset = false
  export let light = false

  // Theme-related operations
  let { style, strColors } = generateTheme($theme, color)

  style += `height: {height};`

  let darkTheme = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }
</script>

<footer
  class="v-footer {classes} {strColors}"
  class:v-footer--absolute="{absolute}"
  class:v-footer--fixed="{fixed}"
  class:v-footer--inset="{inset}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
  {style}
>
  <slot />
</footer>
