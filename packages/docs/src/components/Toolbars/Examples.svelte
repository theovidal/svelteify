<script>
  import {
    MToolbar,
    MToolbarItems,
    MToolbarSideIcon,
    MToolbarTitle,
    MBtn,
    MIcon,
    MFlex,
    MDivider
  } from 'svelteify'
</script>

<MFlex size="xs12 sm6">
  <h2>Classic toolbar</h2>

  <MToolbar>
    <MToolbarSideIcon />
    <MToolbarTitle>Toolbar</MToolbarTitle>
    <div class="spacer" />
    <MToolbarItems>
      <MBtn flat>Link</MBtn>
      <MBtn flat>Link</MBtn>
      <MBtn flat>Link</MBtn>
    </MToolbarItems>
  </MToolbar>

  <h2>Colored toolbar</h2>

  <MToolbar color="green">
    <MToolbarSideIcon dark />
    <MToolbarTitle classes="white--text">Toolbar</MToolbarTitle>
    <div class="spacer" />
    <MToolbarItems>
      <MBtn flat color="white--text">Link</MBtn>
      <MBtn flat color="white--text">Link</MBtn>
      <MBtn flat color="white--text">Link</MBtn>
    </MToolbarItems>
  </MToolbar>

  <h2>Themed toolbar</h2>

  <MToolbar color="primary">
    <MToolbarSideIcon dark />
    <MToolbarTitle classes="white--text">Toolbar</MToolbarTitle>
    <div class="spacer" />
    <MToolbarItems>
      <MBtn flat color="white--text">Link</MBtn>
      <MBtn flat color="white--text">Link</MBtn>
      <MBtn flat color="white--text">Link</MBtn>
    </MToolbarItems>
  </MToolbar>

  <h2>Dense toolbar</h2>

  <MToolbar dense>
    <MToolbarSideIcon />
    <MToolbarTitle>Toolbar</MToolbarTitle>
    <div class="spacer" />
    <MToolbarItems>
      <MBtn flat>Link</MBtn>
      <MBtn flat>Link</MBtn>
      <MBtn flat>Link</MBtn>
    </MToolbarItems>
  </MToolbar>

  <h2>Extended toolbar</h2>

  <MToolbar>
    <MToolbarSideIcon />
    <MToolbarTitle>Toolbar</MToolbarTitle>
    <div class="spacer" />
    <MToolbarItems>
      <MBtn flat>Link</MBtn>
      <MBtn flat>Link</MBtn>
      <MBtn flat>Link</MBtn>
    </MToolbarItems>
  </MToolbar>

  <h2>Toolbar with dividers</h2>
  <MToolbar>
    <MToolbarSideIcon />
    <MToolbarTitle>Toolbar</MToolbarTitle>
    <div class="spacer" />
    <MToolbarItems>
      <MBtn flat>Link 1</MBtn>
      <MDivider vertical classes="mx-2" />
      <MBtn flat>Link 2</MBtn>
    </MToolbarItems>
  </MToolbar>

  <h2>Search bar</h2>

  <MToolbar dense>
    <!-- TODO : remove when MInput component is made -->
    <div class="v-input v-text-field v-text-field--single-line">
      <div class="v-input__prepend-outer">
        <div class="v-input__icon--prepend">
          <MIcon>search</MIcon>
        </div>
      </div>
      <div class="v-input__control">
        <div class="v-input__slot">
          <div class="v-text-field__slot">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
    <MBtn icon>
      <MIcon>my_location</MIcon>
    </MBtn>
    <MBtn icon>
      <MIcon>more_vert</MIcon>
    </MBtn>
  </MToolbar>
</MFlex>
