<script>
  export let align = ''
  export let classes = ''
  export let justify = ''
  export let grid_list = ''
  export let d = ''
  export let fill_height = false
  export let fluid = false

  let alignClass = align === '' ? '' : `align-${align}`
  let justifyClass = justify === '' ? '' : `justify-${justify}`
  let gridListClass = grid_list === '' ? '' : `grid-list-${grid_list}`
  let dClass = d === '' ? '' : `d-${d}`
</script>

<div
  class="container {alignClass}
  {justifyClass}
  {gridListClass}
  {dClass}
  {classes}"
  class:fluid
  class:fill-height="{fill_height}"
>
  <slot />
</div>
