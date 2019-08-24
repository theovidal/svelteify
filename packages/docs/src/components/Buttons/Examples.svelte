<script>
  import { MBtn, MIcon } from 'svelteify'

  const examples = [
    `<MBtn>Button</MBtn>`,
    `<MBtn color="pink white--text">Button</MBtn>`,
    `<MBtn outline color="green">Button</MBtn>`,
    `<MBtn flat>Button</MBtn>`,
    `<MBtn round>Button</MBtn>`,
    `<MBtn block>Button</MBtn>`,
    `<MBtn small>Button</MBtn>`,
    `<MBtn large>Button</MBtn>`,
    `<MBtn floating icon color="red">
  <MIcon>edit</MIcon>
</MBtn>`
  ]
</script>

<h2>Button</h2>
<MBtn>Button</MBtn>

<pre>
  <code class="language-html">
    {examples[0]}
  </code>
</pre>

<h2>Colored button</h2>
<MBtn color="pink white--text">Button</MBtn>

<pre>
  <code class="language-html">
    {examples[1]}
  </code>
</pre>

<h2>Outline button</h2>
<MBtn outline color="green">Button</MBtn>

<pre>
  <code class="language-html">
    {examples[2]}
  </code>
</pre>

<h2>Flat button</h2>
<MBtn flat>Button</MBtn>

<pre>
  <code class="language-html">
    {examples[3]}
  </code>
</pre>

<h2>Round button</h2>
<MBtn round>Button</MBtn>

<pre>
  <code class="language-html">
    {examples[4]}
  </code>
</pre>

<h2>Block button</h2>
<MBtn block>Button</MBtn>

<pre>
  <code class="language-html">
    {examples[5]}
  </code>
</pre>

<h2>Small button</h2>
<MBtn small>Button</MBtn>

<pre>
  <code class="language-html">
   {examples[6]}
  </code>
</pre>

<h2>Large button</h2>
<MBtn large>Button</MBtn>

<pre>
  <code class="language-html">
    {examples[7]}
  </code>
</pre>

<h2>Floating action button</h2>
<MBtn floating icon color="red">
  <MIcon>edit</MIcon>
</MBtn>

<pre>
  <code class="language-html">
    {examples[8]}
  </code>
</pre>
