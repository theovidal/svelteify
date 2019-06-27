<script>
  import { VFooter } from '../../../../sveltify/dist/svelteify'

  export let props
  export let default_slot = true
</script>

<VFooter {...props}>
  <slot />
  {#if default_slot}
  <div class="spacer"></div>
  <div>© 2019</div>
  {/if}
</VFooter>
