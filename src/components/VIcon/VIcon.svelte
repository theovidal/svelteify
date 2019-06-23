<script>
  import { getContext } from 'svelte'

  export let color = '';
  export let dark = false;
  export let large = false;
  export let left = false;
  export let light = false;
  export let medium = false;
  export let right = false;
  export let small = false;
  export let size = undefined;
  export let xlarge = false;

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

  if (size === undefined) {
    if (small) {
      size = 16;
    } else if (medium) {
      size = 28;
    } else if (large) {
      size = 36;
    } else if (xlarge) {
      size = 40;
    }
  }
</script>

<i
  class="v-icon material-icons {color}"
  aria-hidden="true"
  class:v-icon--left={left}
  class:v-icon--right={right}
  class:theme--dark={darkTheme}
  class:theme--light={!darkTheme}
  style={size === undefined ? '' : `font-size: ${size}px`}>
  <slot />
</i>
