<script>
  import { MAvatar } from 'svelteify'

  let examples = [
    `<MAvatar>
  <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
</MAvatar>`,
    `<MAvatar size="75px">
  <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
</MAvatar>`,
    `<MAvatar tile>
  <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
</MAvatar>`
  ]
</script>

<h2>Avatar</h2>
<MAvatar>
  <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
</MAvatar>

<pre>
  <code class="language-html">
    {examples[0]}
  </code>
</pre>

<h2>Custom-sized avatar</h2>
<MAvatar size="75px">
  <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
</MAvatar>

<pre>
  <code class="language-html">
    {examples[1]}
  </code>
</pre>

<h2>Tile avatar</h2>
<MAvatar tile>
  <img src="https://exybore.becauseofprog.fr/img/avatar.jpg" />
</MAvatar>

<pre>
  <code class="language-html">
    {examples[2]}
  </code>
</pre>
