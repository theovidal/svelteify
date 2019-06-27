<script>
  import { VChip } from '../../../../svelteify/dist/svelteify.js'

  export let props
  export let default_slot = true
</script>

<VChip {...props}>
  {#if default_slot}Example chip{/if}
  <slot />
</VChip>
