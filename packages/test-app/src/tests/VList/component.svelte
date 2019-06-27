<script>
  import {
    VCard,
    VContainer,
    VLayout,
    VFlex,
    VDivider,
    VList,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle,
    VListTileSubTitle,
    VListTileAvatar,
    VAvatar,
    VIcon
  } from '../../../../sveltify/dist/svelteify'

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

<VContainer grid_list="md">
  <VLayout column>
    <VFlex size="xs12">
      <VCard>
        <VList {...props}>
          {#each users as user}
          <VListTile>
            <VListTileAction>
              <VIcon color="primary">star</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>{user.name}</VListTileTitle>
            </VListTileContent>

            <VListTileAvatar>
              <img src="{user.avatar}" alt="{user.name}" />
            </VListTileAvatar>
          </VListTile>
          <VDivider />
          {/each}
        </VList>
      </VCard>
    </VFlex>

    <VFlex size="xs12">
      <VCard>
        <VList two_line>
          {#each users as user}
          <VListTile>
            <VListTileAvatar>
              <img src="{user.avatar}" alt="{user.name}" />
            </VListTileAvatar>

            <VListTileContent>
              <VListTileTitle>{user.name}</VListTileTitle>
              <VListTileSubTitle>{user.description}</VListTileSubTitle>
            </VListTileContent>
          </VListTile>
          {/each}
        </VList>
      </VCard>
    </VFlex>
  </VLayout>
</VContainer>
