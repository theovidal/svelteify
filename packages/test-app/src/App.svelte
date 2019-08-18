<script>
  import {
    MApp,
    MAvatar,
    MFooter,
    MChip,
    MIcon,
    MCard,
    MCardTitle,
    MCardActions,
    MContainer,
    MToolbar,
    MToolbarTitle,
    MToolbarItems,
    MContent,
    MFlex,
    MLayout,
    MBtn
  } from '../../svelteify/dist/svelteify.js'
  import tests from './tests'

  let dark = true

  function changeTheme() {
    dark = !dark
  }
</script>

<MApp {dark}>
  <MToolbar fixed dense>
    <MToolbarTitle>Svelteify test</MToolbarTitle>
    <MToolbarItems>
      <MBtn icon on:click="{changeTheme}">
        <MIcon>invert_colors</MIcon>
      </MBtn>
    </MToolbarItems>
  </MToolbar>

  <MContent>
    <MContainer grid_list="md" classes="mt-5">
      <MLayout>
        <MFlex size="xs12">
          <MCard>
            <MCardTitle primary_title>
              <h3 class="headline mb-0">Svelteify tests</h3>
              <div>
                Welcome to the official test platform of the Svelteify library !
                Here, each component is displayed with different options in
                order to test a maximum of them and see if there are bugs.
              </div>
            </MCardTitle>
            <MCardActions>
              {#each tests as test}
              <MBtn flat color="primary" href="#{test.name}">{test.name}</MBtn>
              {/each}
            </MCardActions>
          </MCard>
        </MFlex>
      </MLayout>
    </MContainer>
    <MContainer grid_list="md" fluid>
      {#each tests as componentTest}
      <MLayout row wrap>
        <MFlex size="xs12">
          <h1 id="{componentTest.name}">{componentTest.name}</h1>
        </MFlex>
        {#each componentTest.tests as test}
        <MFlex size="xs5 offset-xs1">
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
        </MFlex>
        {/each}
      </MLayout>
      {/each}
    </MContainer>

    <MContainer grid_list="md">
      <MLayout row wrap>
        <MFlex size="xs12" classes="red lighten-2">12</MFlex>
        <MFlex size="xs6" classes="red darken-2">6</MFlex>
        <MFlex size="xs6" classes="red darken-2">6</MFlex>
      </MLayout>
    </MContainer>
  </MContent>

  <MFooter fixed>
    <MBtn flat>
      Home
    </MBtn>
    <MBtn flat>
      Download
    </MBtn>
    <MBtn flat>
      About
    </MBtn>
    <div class="spacer"></div>
    <div>© 2019</div>
  </MFooter>
</MApp>
