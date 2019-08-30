<script>
  import {
    MToolbar,
    MToolbarTitle,
    MToolbarSideIcon,
    MToolbarItems,
    MDivider,
    MBtn
  } from 'svelteify'

  export let props

  function handleClick(event) {
    console.log('aa')
  }
</script>

<MToolbar {...props}>
  <MToolbarSideIcon {...props} on:click="{handleClick}" />
  <MToolbarTitle>Toolbar !</MToolbarTitle>
  <div class="spacer" />
  <MToolbarItems>
    <MBtn flat>Link 1</MBtn>
    <MDivider vertical classes="mx-2" />
    <MBtn flat>Link 2</MBtn>
  </MToolbarItems>
  <div slot="extension">Extension !</div>
</MToolbar>
