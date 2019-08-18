<script>
  import {
    MCard,
    MContainer,
    MLayout,
    MFlex,
    MDivider,
    MList,
    MListTile,
    MListTileAction,
    MListTileContent,
    MListTileTitle,
    MListTileSubTitle,
    MListTileAvatar,
    MAvatar,
    MIcon
  } from '../../../../svelteify/dist/svelteify'

  export let props

  let users = [
    {
      name: 'Exybore',
      avatar: 'https://avatars0.githubusercontent.com/u/12774204?s=180&v=4',
      description: 'French student and web developer :)'
    },
    {
      name: 'Gildas GH',
      avatar: 'https://avatars1.githubusercontent.com/u/25692645?s=180&v=4',
      description: 'the bg of the becauseofprog'
    },
    {
      name: 'kernoeb',
      avatar: 'https://avatars2.githubusercontent.com/u/24623168?s=180&v=4',
      description:
        'this guy is really funny yes hahaha AHHHAHAHAHAHAHHA hjkbqervguyz'
    }
  ]
</script>

<MContainer grid_list="md">
  <MLayout column>
    <MFlex size="xs12">
      <MCard>
        <MList {...props}>
          {#each users as user}
          <MListTile>
            <MListTileAction>
              <MIcon color="primary">star</MIcon>
            </MListTileAction>

            <MListTileContent>
              <MListTileTitle>{user.name}</MListTileTitle>
            </MListTileContent>

            <MListTileAvatar>
              <img src="{user.avatar}" alt="{user.name}" />
            </MListTileAvatar>
          </MListTile>
          <MDivider />
          {/each}
        </MList>
      </MCard>
    </MFlex>

    <MFlex size="xs12">
      <MCard>
        <MList two_line>
          {#each users as user}
          <MListTile>
            <MListTileAvatar>
              <img src="{user.avatar}" alt="{user.name}" />
            </MListTileAvatar>

            <MListTileContent>
              <MListTileTitle>{user.name}</MListTileTitle>
              <MListTileSubTitle>{user.description}</MListTileSubTitle>
            </MListTileContent>
          </MListTile>
          {/each}
        </MList>
      </MCard>
    </MFlex>
  </MLayout>
</MContainer>
