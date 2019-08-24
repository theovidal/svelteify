<script>
  let example = `<MApp>
  <MToolbar></Mtoolbar>
  <MContent>
    <MContainer fluid>
    </MContainer>
  </MContent>
  <MFooter></MFooter>
</MApp>`
</script>

<h2>The MApp component</h2>

<p>
  An <code>MApp</code> component is <strong>required</strong> at the root of
  your application. It registers the theme as well as some components logic. If
  you don't do so, it'll not be working as expected.
</p>

<h2>Other layout components</h2>

<p>
  The <code>MToolbar</code> component helps you have a navigation bar at the top
  of your app, and the <code>MFooter</code> component to have a footer at its
  end.
</p>

<p>
  The <code>MContent</code> component contains the main page and all of its
  content. It's essential for the grid system to work properly, but not vital
  for the app.
</p>

<h2>Example</h2>

<p>Here you can see a basic layout for a starter app :</p>

<pre>
  <code class="language-html">
    {example}
</code>
</pre>
