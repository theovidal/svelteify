<script>
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  // Component properties
  export let app = false
  export let absolute = false
  export let classes = ''
  export let clipped = false
  export let color = ''
  export let dark = false
  export let fixed = false
  export let floating = false
  export let height = 'auto'
  export let light = false
  export let mini = false
  export let right = false
  export let width = '300px'

  if (mini) {
    width = '80px'
  }

  // Theme-related operations
  let { style, strColors } = generateTheme($theme, color, true)

  let darkTheme = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }
</script>

<style>
  :global(#app-drawer.v-navigation-drawer ~ .v-content) {
    margin-left: 300px;
  }
  :global(#app-drawer.v-navigation-drawer.v-navigation-drawer--right
      ~ .v-content) {
    margin-right: 300px;
  }
</style>

<aside
  id="{app ? 'app-drawer' : ''}"
  class="v-navigation-drawer {strColors} {classes}"
  class:v-navigation-drawer--absolute="{absolute}"
  class:v-navigation-drawer--clipped="{clipped}"
  class:v-navigation-drawer--fixed="{fixed}"
  class:v-navigation-drawer--floating="{floating}"
  class:v-navigation-drawer--mini-variant="{mini}"
  class:v-navigation-drawer--right="{right}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
  style="width: {width}; height: {height}; {style}"
>
  <slot />
</aside>
