<script>
  import { theme as defaultTheme } from '../../stores/theme'

  export let id = 'inspire'
  export let dark = false
  export let theme = {}

  $: defaultTheme.set(
    Object.assign({}, $defaultTheme, theme, {
      dark,
      light: !dark
    })
  )
</script>

<div
  {id}
  class="application"
  class:theme--dark="{dark}"
  class:theme--light="{!dark}"
  data-app="true"
>
  <div class="application--wrap">
    <slot />
  </div>
</div>
