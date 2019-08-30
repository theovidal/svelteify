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
      dev: false,
      css: css => {
        css.write('dist/svelteify.css')
      }
    }),
    postcss({
      plugins: [],
      extract: true,
      minimize: true
    }),
    resolve({ browser: true }),
    commonjs(),
    terser()
  ],
  watch: {
    clearScreen: false
  }
}
