import svelte from 'rollup-plugin-svelte'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'cjs',
    name: 'app',
    file: 'dist/svelteify.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: false,
      // we'll extract any component CSS out into
      // a separate file  better for performance
      css: css => {
        css.write('dist/svelteify.css')
      }
    }),
    postcss({
      plugins: [],
      extract: true,
      minimize: true
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration 
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({ browser: true }),
    commonjs(),
    terser()
  ],
  watch: {
    clearScreen: false
  }
}
