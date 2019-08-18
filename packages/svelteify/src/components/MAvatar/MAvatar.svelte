<script>
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  export let color = ''
  export let size = '48px'
  export let tile = false

  let { style, strColors } = generateTheme($theme, color)

  style += `height: ${size}; width: ${size};`
</script>

<div class="v-avatar {strColors}" class:v-avatar--tile="{tile}" {style}>
  <slot />
</div>
