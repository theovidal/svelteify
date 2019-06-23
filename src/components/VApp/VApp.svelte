<script>
  import { theme } from '../../stores/theme'

  export let id = 'inspire'
  export let dark = false

  $: theme.set({
    dark,
    light: !dark
  })
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
