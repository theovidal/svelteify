<script>
  export let absolute = false;
  export let card = false;
  export let classes = '';
  export let clipped = false;
  export let color = false;
  export let dark = false;
  export let dense = false;
  export let extended = false;
  export let fixed = false;
  export let flat = false;
  export let floating = false;
  export let tabs = false;

  let light = !dark;
</script>

<div
  class="v-toolbar {color} {classes}"
  class:v-toolbar--absolute={absolute}
  class:v-toolbar--card={card}
  class:v-toolbar--clipped={clipped}
  class:v-toolbar--dense={dense}
  class:v-toolbar--extended={extended}
  class:v-toolbar--fixed={fixed}
  class:v-toolbar--floating={floating}
  class:elevation-0={flat}
  class:theme--dark={dark}
  class:theme--light={light}>
  <div class="v-toolbar__content">
    <slot />
  </div>
  {#if extended}
  <div class="v-toolbar__extension"
       class:v-toolbar--tabs={tabs}>
    <slot name="extension"/>
  </div>
  {/if}
</div>
