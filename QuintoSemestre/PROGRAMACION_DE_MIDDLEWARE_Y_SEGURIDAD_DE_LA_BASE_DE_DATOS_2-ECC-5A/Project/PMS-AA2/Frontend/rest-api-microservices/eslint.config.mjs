import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Define el directorio base para configuraciones relativas
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"), // Extiende configuraciones predeterminadas
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^actionTypes$" }, // Ignorar variables con este patrón
      ],
    },
  },
];
