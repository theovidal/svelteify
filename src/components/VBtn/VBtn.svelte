<script>
  import { createEventDispatcher } from 'svelte'
  import { theme } from '../../stores/theme'

  export let absolute = false
  export let block = false
  export let bottom = false
  export let classes = ''
  export let column = false
  export let color = ''
  export let dark = false
  export let depressed = false
  export let disabled = false
  export let fixed = false
  export let flat = false
  export let floating = false
  export let href = '#!'
  export let target = ''
  export let icon = false
  export let large = false
  export let left = false
  export let light = false
  export let outline = false
  export let right = false
  export let round = false
  export let small = false
  export let top = false

  let darkTheme = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }

  const dispatch = createEventDispatcher()

  function dispatchClick(event) {
    dispatch('click', {
      event
    })
  }
</script>

<a
  class="v-btn {color} {classes}"
  class:v-btn--absolute="{absolute}"
  class:v-btn--block="{block}"
  class:v-btn--bottom="{bottom}"
  class:v-btn--column="{column}"
  class:v-btn--depressed="{depressed}"
  class:v-btn--disabled="{disabled}"
  class:v-btn--fixed="{fixed}"
  class:v-btn--flat="{flat}"
  class:v-btn--floating="{floating}"
  class:v-btn--icon="{icon}"
  class:v-btn--large="{large}"
  class:v-btn--left="{left}"
  class:v-btn--outline="{outline}"
  class:v-btn--right="{right}"
  class:v-btn--round="{round}"
  class:v-btn--small="{small}"
  class:v-btn--top="{top}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
  {href}
  {target}
  on:click="{dispatchClick}"
>
  <div class="v-btn__content">
    <slot />
  </div>
</a>
