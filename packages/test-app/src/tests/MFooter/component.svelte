<script>
  import { MFooter } from 'svelteify'

  export let props
  export let default_slot = true
</script>

<MFooter {...props}>
  <slot />
  {#if default_slot}
  <div class="spacer"></div>
  <div>© 2019</div>
  {/if}
</MFooter>
