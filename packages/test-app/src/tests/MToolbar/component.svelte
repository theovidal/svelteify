<script>
  import {
    VToolbar,
    VToolbarTitle,
    VToolbarSideIcon,
    VToolbarItems,
    VDivider,
    VBtn
  } from '../../../../svelteify/dist/svelteify'

  export let props

  function handleClick(event) {
    console.log('aa')
  }
</script>

<VToolbar {...props}>
  <VToolbarSideIcon {...props} on:click="{handleClick}" />
  <VToolbarTitle>Toolbar !</VToolbarTitle>
  <div class="spacer" />
  <VToolbarItems>
    <VBtn flat>Link 1</VBtn>
    <VDivider vertical classes="mx-2" />
    <VBtn flat>Link 2</VBtn>
  </VToolbarItems>
  <div slot="extension">Extension !</div>
</VToolbar>
