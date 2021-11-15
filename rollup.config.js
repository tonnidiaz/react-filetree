import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import React from "react"
import ReactDOM from "react-dom";
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: "./components/Filetree.jsx",
    output: [
      { file: "dist/index.js", format: "cjs" },
      {
        file: "dist/index.es.js",
        format: "es",
     exports: "default",
      },
    ],
    externals: {
      'react': React
  },
    plugins: [
        commonjs({
            include: /node_modules/,
            namedExports: {
                'react': Object.keys(React),
                'react-dom': Object.keys(ReactDOM),
            }
        }),
      babel(
        { exclude: ["node_modules/**", ".storybook/**", ".next"],
        presets: ["@babel/preset-react"] }
      ),
      external(),
      resolve(),
      postcss({plugins:[],
    minimize: true,}),
    terser()
    ],
  },
];
