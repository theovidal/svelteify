<script>
  export let primary_title = false
</script>

<div class="v-card__title" class:v-card__title="{primary_title}">
  <slot />
</div>
