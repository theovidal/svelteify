<script>
  export let color = "";
  export let dark = false;
  export let large = false;
  export let left = false;
  export let medium = false;
  export let right = false;
  export let small = false;
  export let size = undefined;
  export let xlarge = false;
  let light = dark ? false : true;

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
  class:theme--dark={dark}
  class:theme-light={light}
  style={size === undefined ? '' : `font-size: ${size}px`}>
  <slot />
</i>
