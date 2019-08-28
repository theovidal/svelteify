<script>
  import { theme } from '../../stores/theme'

  export let dark = false
  export let inset = false
  export let light = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }
</script>

<div
  class="v-subheader"
  class:v-subheader--inset="{inset}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
>
  <slot />
</div>
