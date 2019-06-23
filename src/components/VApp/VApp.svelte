<script>
  import { setContext} from 'svelte'

  export let id = 'inspire';
  export let dark = false;

  setContext('svelteify-app', {
    theme: {
      dark,
      light: !dark
    }
  })
</script>

<div {id} class="application"
          class:theme--dark={dark}
          class:theme--light={!dark}
          data-app="true">
  <div class="application--wrap">
    <slot />
  </div>
</div>
