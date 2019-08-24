<script>
  import {
    MApp,
    MToolbar,
    MToolbarTitle,
    MToolbarItems,
    MBtn,
    MIcon,
    MContent,
    MContainer,
    MLayout,
    MFlex,
    MCard,
    MCardText,
    MCardActions
  } from 'svelteify'
  import components from './components'
  import gettingStarted from './getting-started'

  let dark = false

  function changeTheme() {
    dark = !dark
  }
</script>

<MApp {dark}>
  <MToolbar fixed color="primary white--text">
    <MToolbarTitle>Svelteify</MToolbarTitle>
    <div class="spacer"></div>
    <MToolbarItems>
      <MBtn
        flat
        color="white--text"
        href="https://github.com/exybore/svelteify/releases"
        classes="hidden-sm-and-down"
        target="_blank"
        >v1.0.0-beta3</MBtn
      >
      <MBtn color="white--text" icon on:click="{changeTheme}">
        <MIcon>invert_colors</MIcon>
      </MBtn>
      <MBtn
        color="white--text"
        icon
        href="https://github.com/exybore/svelteify"
        target="_blank"
      >
        <MIcon>code</MIcon>
      </MBtn>
    </MToolbarItems>
  </MToolbar>

  <MContent>
    <MContainer grid_list="md" classes="mt-5">
      <MLayout column>
        <MFlex size="xs12" classes="text-xs-center">
          <img src="/img/logo.png" height="200px" alt="Svelteify logo" />
          <h1 class="display-3">Svelteify</h1>
          <h3 class="display-1">Material components framework for Svelte</h3>
        </MFlex>
        <MFlex size="xs12">
          <MContainer>
            <MLayout row wrap>
              <MFlex size="xs12 md4" classes="text-xs-center">
                <MIcon xlarge color="primary">color_lens</MIcon>
                <h3 class="display-1">Beautiful</h3>
                <p>
                  The framework works with the stylesheet of
                  <a href="https://github.com/vuetifyjs/vuetify">Vuetify</a>,
                  which provides clean and nice-looking components.
                </p>
              </MFlex>
              <MFlex size="xs12 md4" classes="text-xs-center">
                <MIcon xlarge color="primary">widgets</MIcon>
                <h3 class="display-1">Customizable</h3>
                <p>
                  You can configure colors used across the application, and a
                  dark mode. Moreover, you can precisely choose which component
                  to use.
                </p>
              </MFlex>
              <MFlex size="xs12 md4" classes="text-xs-center">
                <MIcon xlarge color="primary">layers_clear</MIcon>
                <h3 class="display-1">Dependencies-less</h3>
                <p>
                  The library includes all the compiled JavaScript and CSS, so
                  you don't have to install anything or setup additional tools.
                </p>
              </MFlex>
              <MFlex size="xs12" classes="text-xs-center">
                <MBtn
                  color="primary white--text"
                  href="https://github.com/exybore/svelteify"
                  target="_blank"
                  >Github repository</MBtn
                ><br />
                <a
                  class="github-button"
                  href="https://github.com/exybore/svelteify"
                  target="_blank"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star exybore/svelteify on GitHub"
                  >Star</a
                >
              </MFlex>
            </MLayout>
          </MContainer>
        </MFlex>
        <MFlex size="xs12">
          <h2 class="display-2">Getting started</h2>
          <span class="headline">Base guidelines for the framework</span>
        </MFlex>
        {#each gettingStarted as part}
        <MFlex size="xs12">
          <h3 class="display-1">{part.name}</h3>
          <svelte:component this="{part}" />
        </MFlex>
        {/each}
        <MFlex size="xs12">
          <h2 class="display-2">UI Components</h2>
          <span class="headline">All you need to create your app</span>
        </MFlex>
        {#each components as component}
        <MFlex size="xs12">
          <h3 class="display-1">{component.name}</h3>
          <p>{component.description}</p>
          {#each component.subcomponents as subcomponent}
          <h2>
            Properties for component {subcomponent.name}
          </h2>
          <MCard>
            <div class="v-table__overflow">
              <table
                class="v-datatable v-table"
                class:theme--light="{!dark}"
                class:theme--dark="{dark}"
              >
                <thead>
                  <tr>
                    <th class="text-xs-left">Name</th>
                    <th class="text-xs-left">Type</th>
                    <th class="text-xs-left">Description</th>
                    <th class="text-xs-left">Default value</th>
                  </tr>
                </thead>
                <tbody>
                  {#each subcomponent.props as prop}
                  <tr>
                    <td>{prop.name}</td>
                    <td>{prop.type}</td>
                    <td>{prop.description}</td>
                    <td>{prop.default}</td>
                  </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </MCard>
          {/each}
          <h3 class="display-1">Examples</h3>
          <svelte:component this="{component.examples}" />
        </MFlex>
        {/each}
      </MLayout>
    </MContainer>
  </MContent>
</MApp>
