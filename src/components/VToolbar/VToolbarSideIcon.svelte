<script>
  import { createEventDispatcher } from 'svelte'
  import { VBtn } from '../VBtn'

  export let dark = false

  const dispatch = createEventDispatcher()

  function dispatchClick(event) {
    dispatch('click', {
      event
    })
  }
</script>

<VBtn {dark} classes="v-toolbar__side-icon" icon on:click="{dispatchClick}">
  <i aria-hidden="true" class="v-icon material-icons theme--light">menu</i>
</VBtn>
