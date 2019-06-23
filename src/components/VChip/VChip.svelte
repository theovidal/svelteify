<script>
  import { getContext } from 'svelte'
  import { VIcon } from '../VIcon'

  export let close = false
  export let color = ''
  export let dark = false
  export let disabled = false
  export let label = false
  export let light = false
  export let outline = false
  export let selected = false
  export let small = false

  const { theme } = getContext('svelteify-app')
  let darkTheme = false

  if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = theme.dark
  }

  let default_selected = selected
  let style = ''

  function handleClose() {
    style = 'display: none;'
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
  class="v-chip {color}"
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
