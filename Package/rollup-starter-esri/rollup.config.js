import alias from "rollup-plugin-alias";
import commonjs from "rollup-plugin-commonjs";
import css from "rollup-plugin-css-only";
import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import terser from "rollup-plugin-terser";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: "./src/main.ts",
    output: {
        format: "iife",
        file: "./dist/bundle.js",
        sourcemap: !production,
    },
    treeshake: production,
    external: [],
    plugins: [
        typescript({
            tsconfig: "tsconfig.json",
            cacheRoot: "./dist",
            clean: true,
        }),
        css({ output: "./dist/bundle.css" }),
        alias({}),
        nodeResolve({ mainFields: ["module", "jsnext:main", "main"] }),
        commonjs({
            include: [],
        }),

        production && terser.terser({}),
    ],
};

/*
import replace from 'rollup-plugin-replace'

replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VUE_ENV': JSON.stringify('browser')
  }),

  */
