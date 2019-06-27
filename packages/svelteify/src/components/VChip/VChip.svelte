<script>
  import { VIcon } from '../VIcon'
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  // Component properties
  export let close = false
  export let color = ''
  export let dark = false
  export let disabled = false
  export let label = false
  export let light = false
  export let outline = false
  export let selected = false
  export let small = false

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

  // Events handle
  let default_selected = selected

  function handleClose() {
    style += 'display: none;'
  }

  function handleClick() {
    if (!default_selected) {
      selected = true
    }
  }

  function handleLeave() {
    if (!default_selected) {
      selected = false
    }
  }
</script>

<div
  class="v-chip {strColors}"
  class:v-chip--disabled="{disabled}"
  class:v-chip--label="{label}"
  class:v-chip--outline="{outline}"
  class:v-chip--removable="{close}"
  class:v-chip--selected="{selected}"
  class:v-chip--small="{small}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
  {style}
  on:click="{handleClick}"
  on:mouseleave="{handleLeave}"
>
  <div class="v-chip__content">
    <slot />
    {#if close}
    <div class="v-chip__close" on:click="{handleClose}">
      <VIcon {dark}>cancel</VIcon>
    </div>
    {/if}
  </div>
</div>
