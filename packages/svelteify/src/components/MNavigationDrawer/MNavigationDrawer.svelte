<script>
  import { theme } from '../../stores/theme'
  import { generateTheme } from '../../utils/theme'

  // Component properties
  export let app = false
  export let absolute = false
  export let classes = ''
  export let clipped = false
  export let color = ''
  export let dark = false
  export let fixed = false
  export let floating = false
  export let height = 'auto'
  export let light = false
  export let mini = false
  export let mini_width = '80px'
  export let mobile_breakpoint = 1264
  export let permanent = false
  export let right = false
  export let temporary = false
  export let show = false
  export let width = '300px'

  // Theme-related operations
  let { style, strColors } = generateTheme($theme, color, true)

  let darkTheme

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }

  // Displaying-related operations
  let display
  let drawerWidth
  let permanentShow = true

  $: if (mini) {
    drawerWidth = mini_width
  } else {
    drawerWidth = width
  }

  window.onload = refreshShow
  window.onresize = refreshShow

  show = permanent ? true : show

  $: {
    display = show ? 'block' : 'none'
  }

  function refreshShow() {
    permanentShow = window.innerWidth >= mobile_breakpoint
    if (!permanent && !temporary) {
      show = permanentShow
    }
  }

  function closeDrawer() {
    show = false
  }
</script>

{#if !permanentShow && show}
<div class="v-overlay v-overlay--active" on:click="{closeDrawer}"></div>
{/if}

<aside
  id="{app ? 'app-drawer' : ''}"
  class="v-navigation-drawer {strColors} {classes}"
  class:v-navigation-drawer--absolute="{absolute}"
  class:v-navigation-drawer--clipped="{clipped}"
  class:v-natigation-drawer--close="{!show}"
  class:v-navigation-drawer--fixed="{fixed}"
  class:v-navigation-drawer--floating="{floating}"
  class:v-navigation-drawer--is-mobile="{!permanentShow}"
  class:v-navigation-drawer--mini-variant="{mini}"
  class:v-navigation-drawer--open="{show}"
  class:v-navigation-drawer--right="{right}"
  class:v-navigation-drawer--temporary="{temporary}"
  class:theme--dark="{darkTheme}"
  class:theme--light="{!darkTheme}"
  style="display: {display}; height: {height}; width: {drawerWidth}; {style}"
>
  <slot />
</aside>
