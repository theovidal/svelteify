<h2>Installation</h2>

<p>
  The installation of the library is pretty simple. First, go into your
  application's folder and download Svelteify from npmjs.org :
</p>

<code>
  npm install --dev svelteify # Using NPM<br />
  yarn add --dev svelteify # Using Yarn
</code>

<h2>Stylesheets</h2>

<p>For stylesheets import, you have two options :</p>

<ul>
  <li>
    <strong>From the web :</strong> import the stylesheet at
    <pre>https://svelteify.exybo.re/svelteify.css</pre>
  </li>
  <li>
    <strong>Using a CSS loader :</strong> include the
    <pre>svelteify/dist/svelteify.css</pre>
    file in your code. Don't forget to add a CSS loader in your bundler, like
    Webpack or Rollup !
  </li>
</ul>

<p>
  Finally, include the Roboto font and the Material Icons from Google Fonts :
</p>
<pre>
https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons</pre
>
