<script>
  import { createEventDispatcher } from 'svelte'
  import { theme } from '../../stores/theme'
  import { MBtn } from '../MBtn'

  export let classes = ''
  export let dark = false
  export let light = false

  // Theme-related operations
  let darkTheme = false

  $: if (dark) {
    darkTheme = true
  } else if (light) {
    darkTheme = false
  } else {
    darkTheme = $theme.dark
  }
</script>

<MBtn {dark} classes="v-toolbar__side-icon {classes}" icon on:click>
  <i aria-hidden="true" class="v-icon material-icons theme--light">menu</i>
</MBtn>
