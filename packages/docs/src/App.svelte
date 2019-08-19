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

  let dark = true

  function changeTheme() {
    dark = !dark
  }
</script>

<style>
  html {
    font-size: 16px;
  }
</style>

<MApp {dark}>
  <MToolbar fixed dense>
    <img src="/img/logo.png" height="35px" alt="Svelteify logo" />
    <MToolbarTitle>Svelteify</MToolbarTitle>
    <MToolbarItems>
      <MBtn icon on:click="{changeTheme}">
        <MIcon>invert_colors</MIcon>
      </MBtn>
    </MToolbarItems>
  </MToolbar>

  <MContent>
    <MContainer grid_list="md" classes="mt-5">
      <MLayout column>
        <MFlex size="xs12">
          <MCard>
            <MCardText>
              <h3 class="headline mb-0">Svelteify - Documentation</h3>
              <p>
                Welcome to Svelteify ! It's a young framework which provides
                Material components using the Svelte framework. It is :
              </p>
              <ul>
                <li>
                  <strong>Beautiful :</strong>
                  the framework works with the stylesheet of
                  <a href="https://github.com/vuetifyjs/vuetify">Vuetify</a>,
                  which provides clean components.
                </li>
                <li>
                  <strong>Customizable :</strong>
                  you can configure colors used across the application, and a
                  dark mode. Moreover, you can choose which component to use.
                </li>
                <li>
                  <strong>Dependencies-less :</strong>
                  the library includes all the compiled JavaScript and CSS, so
                  you don't have to install anything.
                </li>
              </ul>
            </MCardText>
            <MCardActions>
              <MBtn
                flat
                color="primary"
                href="https://github.com/exybore/svelteify"
              >
                GitHub repository
              </MBtn>
            </MCardActions>
          </MCard>
        </MFlex>
        <MFlex size="xs12">
          <h1 class="display-3">UI Components</h1>
          <span class="headline">All you need to create your app</span>
        </MFlex>
        {#each components as component}
        <MFlex size="xs12">
          <h2 class="display-3">{component.name}</h2>
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
          <h3 class="display-2">Examples</h3>
          <svelte:component this="{component.examples}" />
        </MFlex>
        {/each}
      </MLayout>
    </MContainer>
  </MContent>
</MApp>
