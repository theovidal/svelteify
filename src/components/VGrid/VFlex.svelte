<script>
  export let classes = "";
  export let size = "";
  export let shrink = false;
</script>

<div class="flex {size} {classes}" class:shrink>
  <slot />
</div>
