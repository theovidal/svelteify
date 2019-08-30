<script>
  import { MChip } from 'svelteify'

  export let props
  export let default_slot = true
</script>

<MChip {...props}>
  {#if default_slot}Example chip{/if}
  <slot />
</MChip>
