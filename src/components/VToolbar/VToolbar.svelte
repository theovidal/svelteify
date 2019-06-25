<script>
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  export let absolute = false
  export let card = false
  export let classes = ''
  export let clipped = false
  export let color = ''
  export let dark = false
  export let dense = false
  export let extended = false
  export let fixed = false
  export let flat = false
  export let floating = false
  export let light = false
  export let tabs = false

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

<div
  class="v-toolbar {strColors} {classes}"
  class:v-toolbar--absolute="{absolute}"
  class:v-toolbar--card="{card}"
  class:v-toolbar--clipped="{clipped}"
  class:v-toolbar--dense="{dense}"
  class:v-toolbar--extended="{extended}"
  class:v-toolbar--fixed="{fixed}"
  class:v-toolbar--floating="{floating}"
  class:elevation-0="{flat}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
  {style}
>
  <div class="v-toolbar__content">
    <slot />
  </div>
  {#if extended}
  <div class="v-toolbar__extension" class:v-toolbar--tabs="{tabs}">
    <slot name="extension" />
  </div>
  {/if}
</div>
