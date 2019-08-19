<script>
  import { MChip, MAvatar, MIcon } from 'svelteify'
</script>

<h2>Chip</h2>
<MChip>
  Example chip
</MChip>

<h2>Colored chip</h2>
<MChip color="green white--text">
  Example chip
</MChip>

<h2>Themed chip</h2>
<MChip color="primary">
  Example chip
</MChip>

<h2>Outline chip</h2>
<MChip outline color="purple purple--text">
  Example chips
</MChip>

<h2>Small chip</h2>
<MChip small>
  Example chips
</MChip>

<h2>Closable chip</h2>
<MChip close>
  Example chips
</MChip>

<h2>Avatar chip</h2>
<MChip>
  <MAvatar>
    <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
  </MAvatar>
  Example chip
</MChip>

<h2>Icon chip</h2>
<MChip>
  <MAvatar>
    <MIcon>edit</MIcon>
  </MAvatar>
  Example chip
</MChip>
