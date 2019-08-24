<h2>Installation</h2>

<p>
  The installation of the library is pretty simple. First, go into your
  application's folder and download Svelteify from npmjs.org :
</p>

<pre>
  npm install --dev svelteify # Using NPM<br />
  yarn add --dev svelteify # Using Yarn
</pre>

<h2>Stylesheets</h2>

<p>For stylesheets import, you have two options :</p>

<ul>
  <li>
    <strong>From the web :</strong> import the stylesheet at
    <code>https://svelteify.exybo.re/svelteify.css</code>
  </li>
  <li>
    <strong>Using a CSS loader :</strong> include the
    <code>svelteify/dist/svelteify.css</code>
    file in your code. Don't forget to add a CSS loader in your bundler, like
    Webpack or Rollup !
  </li>
</ul>

<p>
  Finally, include the Roboto font and the Material Icons from Google Fonts :
  <code>
    https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons</code
  >
</p>
