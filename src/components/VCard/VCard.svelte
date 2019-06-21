<script>
  export let color = "";
  export let elevation = 2;
  export let flat = false;
  export let hover = false;
  export let raised = false;
</script>

<div class="v-card v-sheet {color} elevation-{elevation}"
		 class:v-card--flat={flat}
		 class:v-card--hover={hover}
		 class:v-card--raised={raised}>
	<slot></slot>
</div>