<script>
  export let color = "";
  export let elevation = 2;
  export let flat = false;
  export let hover = false;
  export let raised = false;
</script>

<div class="v-card {color} elevation-{elevation}"
		 class:v-card--flat={flat}
		 class:v-card--hover={hover}>
	<slot></slot>
</div>