<script>
  export let dark = false
  export let dense = false
  export let expand = false
  export let light = false
  export let subheader = false
  export let three_line = false
  export let two_line = false
</script>

<div
  class="v-list"
  class:v-list--dense="{dense}"
  class:v-list--subheader="{subheader}"
  class:v-list--three-line="{three_line}"
  class:v-list--two-line="{two_line}"
>
  <slot />
</div>
