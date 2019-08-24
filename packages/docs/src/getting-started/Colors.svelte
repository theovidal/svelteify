<script>
  //import Prism from 'prismjs'
  import { MBtn } from 'svelteify'
  let example1 = `<MBtn color="amber lighten-1 white--text">
  Button
</MBtn>`

  let example2 = `<p class="red--text text--darken-2">Hello there !</p>`
</script>

<p>
  Each element can be colored, with the <code>color</code> property or not : in
  fact, colors are just CSS classes.
</p>

<MBtn color="amber lighten-1 white--text">
  Button
</MBtn>

<pre>
  <code class="language-html">
    {example1}
  </code>
</pre>

<p class="red--text text--darken-2">Hello there !</p>

<pre>
  <code class="language-html">
    {example2}
  </code>
</pre>

<p>
  You can see a complete list of the available colors on the
  <a href="https://v15.vuetifyjs.com/en/framework/colors#material-colors"
    >Vuetify documentation</a
  >.
</p>
