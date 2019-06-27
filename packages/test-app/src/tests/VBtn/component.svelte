<script>
  import { VBtn } from '../../../../svelteify/dist/svelteify'

  export let props
  export let default_slot = true

  function handleClick(event) {
    console.log(event)
    alert('yes')
  }
</script>

<VBtn {...props} on:click="{handleClick}">
  {#if default_slot}Example button{/if}
  <slot />
</VBtn>
