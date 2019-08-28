<script>
  import {
    MToolbar,
    MToolbarTitle,
    MNavigationDrawer,
    MList,
    MListTile,
    MListTileTitle,
    MListTileAvatar,
    MDivider,
    MIcon
  } from '../../../../svelteify/dist/svelteify'

  export let props
</script>

<MNavigationDrawer {...props} width="40%">
  <MToolbar flat>
    <MToolbarTitle>Navigation</MToolbarTitle>
  </MToolbar>
  <MDivider />
  <MList>
    <MListTile>
      <MListTileAvatar>
        <MIcon>home</MIcon>
      </MListTileAvatar>
      <MListTileTitle>Home</MListTileTitle>
    </MListTile>
    <MListTile>
      <MListTileAvatar>
        <MIcon>book</MIcon>
      </MListTileAvatar>
      <MListTileTitle>Documentation</MListTileTitle>
    </MListTile>
    <MListTile>
      <MListTileAvatar>
        <MIcon>star</MIcon>
      </MListTileAvatar>
      <MListTileTitle>About</MListTileTitle>
    </MListTile>
  </MList>
</MNavigationDrawer>
