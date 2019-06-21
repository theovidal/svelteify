<script>
  export let size = "";
  export let shrink = false;
</script>

<div class="flex {size}" class:shrink>
  <slot />
</div>
