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

  let dark = true

  function changeTheme() {
    dark = !dark
  }
</script>

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
      <MLayout>
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
      </MLayout>
    </MContainer>
  </MContent>
</MApp>
