// import typescript from 'rollup-plugin-typescript2';
// import del from 'rollup-plugin-delete';
// import svg from 'rollup-plugin-svg';
// import pkg from './package.json';
//
// export default [
//   {
//     input: 'index.ts',
//     output: [
//       {
//         file: 'lib/index.js',
//         format: 'esm',
//         banner: '/* eslint-disable */',
//       },
//       { file: pkg.main, format: 'cjs' },
//       { file: pkg.module, format: 'esm' },
//     ],
//     plugins: [
//       del({ targets: ['dist', 'lib'] }),
//       svg(),
//       typescript(),
//     ],
//     external: Object.keys(pkg.peerDependencies || {}),
//   },
// ];

import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import svg from 'rollup-plugin-svg';

import packageJson from "./package.json";

export default {
  input: "./index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: false
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: false
    }
  ],
  plugins: [del({targets: ["dist"]}), peerDepsExternal(), resolve(), commonjs(), svg(), typescript()]
};
