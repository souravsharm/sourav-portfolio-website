import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".chrome*/**",
      ".edge-profile*/**",
      "qa-*.png",
      "dev-server.*",
    ],
  },
];

export default eslintConfig;
