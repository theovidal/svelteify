<script>
  export let align = "";
  export let column = false;
  export let d = "";
  export let fill_height = false;
  export let justify = "";
  export let reverse = false;
  export let row = false;
  export let wrap = false;

  let alignClass = align === "" ? "" : `align-${align}`;
  let justifyClass = justify === "" ? "" : `justify-${justify}`;
  let dClass = d === "" ? "" : `d-${d}`;
</script>

<div
  class="layout {alignClass}
  {justifyClass}
  {dClass}"
  class:column
  class:fill-height={fill_height}
  class:reverse
  class:row
  class:wrap>
  <slot />
</div>
