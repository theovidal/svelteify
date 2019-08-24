<script>
  import { MIcon, MLayout } from 'svelteify'

  let examples = [
    `<MLayout row>
  <MIcon small>home</MIcon>
  <MIcon small>event</MIcon>
  <MIcon small>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon>home</MIcon>
  <MIcon>event</MIcon>
  <MIcon>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon medium>home</MIcon>
  <MIcon medium>event</MIcon>
  <MIcon medium>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon large>home</MIcon>
  <MIcon large>event</MIcon>
  <MIcon large>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon xlarge>home</MIcon>
  <MIcon xlarge>event</MIcon>
  <MIcon xlarge>info</MIcon>
</MLayout>`,
    `<MLayout row>
  <MIcon color="green--text">home</MIcon>
  <MIcon color="amber--text">event</MIcon>
  <MIcon color="light-blue--text">info</MIcon>
</MLayout>`
  ]
</script>

Check out the
<a href="https://material.io/icons/" target="_blank">Material Icons page</a> for
a full list of icons.

<h2>Icon sizes</h2>

<p>You can set the icon size of your choice according to your needs.</p>

<MLayout row>
  <MIcon small>home</MIcon>
  <MIcon small>event</MIcon>
  <MIcon small>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon>home</MIcon>
  <MIcon>event</MIcon>
  <MIcon>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon medium>home</MIcon>
  <MIcon medium>event</MIcon>
  <MIcon medium>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon large>home</MIcon>
  <MIcon large>event</MIcon>
  <MIcon large>info</MIcon>
</MLayout>
<MLayout row>
  <MIcon xlarge>home</MIcon>
  <MIcon xlarge>event</MIcon>
  <MIcon xlarge>info</MIcon>
</MLayout>

<pre>
  <code class="language-html">
    {examples[0]}
  </code>
</pre>

<h2>Colored icons</h2>

<p>
  The icons are colorable using the helpers. If you want to color the icon
  itself, use the text mode.
</p>

<MLayout row>
  <MIcon color="green--text">home</MIcon>
  <MIcon color="amber--text">event</MIcon>
  <MIcon color="light-blue--text">info</MIcon>
</MLayout>

<pre>
  <code class="language-html">
    {examples[1]}
  </code>
</pre>
