import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    terser()
  ]
};