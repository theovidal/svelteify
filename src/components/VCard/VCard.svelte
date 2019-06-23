<script>
  import { getContext } from 'svelte'

  export let color = '';
  export let dark = false;
  export let elevation = 2;
  export let flat = false;
  export let height = '';
  export let hover = false;
  export let light = false;
  export let max_height = '';
  export let max_width = '';
  export let min_height = '';
  export let min_width = '';
  export let raised = false;
  export let tile = false;
  export let width = '';

  const { theme } = getContext('svelteify-app')
  let darkTheme = false

  if (dark) {
    darkTheme = true
  }
  else if (light) {
    darkTheme = false
  }
  else {
    darkTheme = theme.dark
  }
</script>

<div class="v-card v-sheet {color} elevation-{elevation}"
     class:v-card--flat={flat}
     class:v-card--hover={hover}
	 class:v-card--raised={raised}
	 class:v-sheet--tile={tile}
	 class:theme--dark={darkTheme}
	 class:theme--light={!darkTheme}>
	<slot></slot>
</div>