import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import license from 'rollup-plugin-license';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      plugins: [terser()],
      name: 'Exifly',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      license({
        banner: {
          content: {
            file: path.resolve(__dirname, './LICENSE'),
          },
        },
      }),
      typescript({
        clean: true,
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
      }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [
      license({
        banner: {
          content: {
            file: path.resolve(__dirname, './LICENSE'),
          },
        },
      }),
      typescript({
        clean: true,
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
      }),
      resolve(),
      commonjs(),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
