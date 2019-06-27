<script>
  import {
    VApp,
    VAvatar,
    VFooter,
    VChip,
    VIcon,
    VCard,
    VCardTitle,
    VCardActions,
    VContainer,
    VToolbar,
    VToolbarTitle,
    VToolbarItems,
    VContent,
    VFlex,
    VLayout,
    VBtn
  } from '../../svelteify/dist/svelteify.js'
  import tests from './tests'

  let dark = true

  function changeTheme() {
    dark = !dark
  }
</script>

<VApp {dark}>
  <VToolbar fixed dense>
    <VToolbarTitle>Svelteify test</VToolbarTitle>
    <VToolbarItems>
      <VBtn icon on:click="{changeTheme}">
        <VIcon>invert_colors</VIcon>
      </VBtn>
    </VToolbarItems>
  </VToolbar>

  <VContent>
    <VContainer grid_list="md" classes="mt-5">
      <VLayout>
        <VFlex size="xs12">
          <VCard>
            <VCardTitle primary_title>
              <h3 class="headline mb-0">Svelteify tests</h3>
              <div>
                Welcome to the official test platform of the Svelteify library !
                Here, each component is displayed with different options in
                order to test a maximum of them and see if there are bugs.
              </div>
            </VCardTitle>
            <VCardActions>
              {#each tests as test}
              <VBtn flat color="primary" href="#{test.name}">{test.name}</VBtn>
              {/each}
            </VCardActions>
          </VCard>
        </VFlex>
      </VLayout>
    </VContainer>
    <VContainer grid_list="md" fluid>
      {#each tests as componentTest}
      <VLayout row wrap>
        <VFlex size="xs12">
          <h1 id="{componentTest.name}">{componentTest.name}</h1>
        </VFlex>
        {#each componentTest.tests as test}
        <VFlex size="xs5 offset-xs1">
          <h2>{test.name}</h2>
          <svelte:component
            this="{componentTest.component}"
            props="{test.props}"
            default_slot="{test.default_slot}"
          >
            {#if test.children !== undefined} {#each test.children as child}
            <svelte:component this="{child.component}" {...child.props}>
              {child.slot}
            </svelte:component>
            {/each} {/if}
          </svelte:component>
        </VFlex>
        {/each}
      </VLayout>
      {/each}
    </VContainer>

    <VContainer grid_list="md">
      <VLayout row wrap>
        <VFlex size="xs12" classes="red lighten-2">12</VFlex>
        <VFlex size="xs6" classes="red darken-2">6</VFlex>
        <VFlex size="xs6" classes="red darken-2">6</VFlex>
      </VLayout>
    </VContainer>
  </VContent>

  <VFooter fixed>
    <VBtn flat>
      Home
    </VBtn>
    <VBtn flat>
      Download
    </VBtn>
    <VBtn flat>
      About
    </VBtn>
    <div class="spacer"></div>
    <div>© 2019</div>
  </VFooter>
</VApp>
