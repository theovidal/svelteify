<script>
  import { MBtn } from 'svelteify'

  export let props
  export let default_slot = true

  function handleClick(event) {
    console.log(event)
    alert('yes')
  }
</script>

<MBtn {...props} on:click="{handleClick}">
  {#if default_slot}Example button{/if}
  <slot />
</MBtn>
