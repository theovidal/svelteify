<script>
  import { MChip, MAvatar, MIcon } from 'svelteify'

  let examples = [
    `<MChip>
  Example chip
</MChip>`,
    `<MChip color="green white--text">
  Example chip
</MChip>`,
    `<MChip color="primary">
  Example chip
</MChip>`,
    `<MChip outline color="purple purple--text">
  Example chips
</MChip>`,
    `<MChip small>
  Example chips
</MChip>`,
    `<MChip close>
  Example chips
</MChip>`,
    `<MChip>
  <MAvatar>
    <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
  </MAvatar>
  Example chip
</MChip>`,
    `<MChip>
  <MAvatar>
    <MIcon>edit</MIcon>
  </MAvatar>
  Example chip
</MChip>`
  ]
</script>

<h2>Chip</h2>
<MChip>
  Example chip
</MChip>

<pre>
  <code class="language-html">
    {examples[0]}
  </code>
</pre>

<h2>Colored chip</h2>
<MChip color="green white--text">
  Example chip
</MChip>

<pre>
  <code class="language-html">
    {examples[1]}
  </code>
</pre>

<h2>Themed chip</h2>
<MChip color="primary">
  Example chip
</MChip>

<pre>
  <code class="language-html">
    {examples[2]}
  </code>
</pre>

<h2>Outline chip</h2>
<MChip outline color="purple purple--text">
  Example chips
</MChip>

<pre>
  <code class="language-html">
    {examples[3]}
  </code>
</pre>

<h2>Small chip</h2>
<MChip small>
  Example chips
</MChip>

<pre>
  <code class="language-html">
    {examples[4]}
  </code>
</pre>

<h2>Closable chip</h2>
<MChip close>
  Example chips
</MChip>

<pre>
  <code class="language-html">
    {examples[5]}
  </code>
</pre>

<h2>Avatar chip</h2>
<MChip>
  <MAvatar>
    <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
  </MAvatar>
  Example chip
</MChip>

<pre>
  <code class="language-html">
    {examples[6]}
  </code>
</pre>

<h2>Icon chip</h2>
<MChip>
  <MAvatar>
    <MIcon>edit</MIcon>
  </MAvatar>
  Example chip
</MChip>

<pre>
  <code class="language-html">
    {examples[7]}
  </code>
</pre>
