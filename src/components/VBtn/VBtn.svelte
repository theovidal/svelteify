<script>
  export let absolute = false;
  export let block = false;
  export let bottom = false;
  export let column = false;
  export let color = "";
  export let dark = false;
  export let depressed = false;
  export let disabled = false;
  export let flat = false;
  export let floating = false;
  export let href = "";
  export let icon = false;
  export let large = false;
  export let left = false;
  export let outline = false;
  export let right = false;
  export let round = false;
  export let small = false;
  export let top = false;

  let tag = href === "" ? "div" : "a";
</script>

<div
  class="v-btn {color}"
  class:v-btn--absolute={absolute}
  class:v-btn--block={block}
  class:v-btn--bottom={bottom}
  class:v-btn--column={column}
  class:v-btn--depressed={depressed}
  class:v-btn--disabled={disabled}
  class:v-btn--flat={flat}
  class:v-btn--floating={floating}
  class:v-btn--icon={icon}
  class:v-btn--large={large}
  class:v-btn--left={left}
  class:v-btn--outline={outline}
  class:v-btn--right={right}
  class:v-btn--round={round}
  class:v-btn--small={small}
  class:v-btn--top={top}
  class:theme--dark={dark}
  {href}>
  <div class="v-btn__content">
    <slot />
  </div>
</div>
