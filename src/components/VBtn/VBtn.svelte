<script>
	export let color;
	export let absolute = false;
	export let href = '';
	
	let tag = href === '' ? 'div' : 'a'
</script>

<div class="v-btn {color}"
		 class:v-btn--absolute={absolute}
		 {href}>
	<div class="v-btn__content">
		<slot></slot>
	</div>
</div>