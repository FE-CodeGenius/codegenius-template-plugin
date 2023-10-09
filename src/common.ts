import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { blue, green, yellow } from "kolorist";

export type ColorFunc = (str: string | number) => string;

export interface FrameworkVariant {
  framework: string;
  name: string;
  display: string;
  color: ColorFunc;
  customCommand?: string;
}

export interface Framework {
  name: string;
  display: string;
  color: ColorFunc;
  variants: FrameworkVariant[];
}

export const FRAMEWORKS: Framework[] = [
  {
    name: "vue",
    display: "Vue",
    color: green,
    variants: [
      {
        framework: "vue",
        name: "vue",
        display: "JavaScript",
        color: yellow,
      },
      {
        framework: "vue",
        name: "vue-ts",
        display: "TypeScript",
        color: blue,
      },
      {
        framework: "vue",
        name: "vue-ts-codeg",
        display: "TypeScriptForCodeG",
        color: yellow,
      },
    ],
  },
];

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), []);

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

export function isEmptyDir(projectName: string) {
  const targetDir = path.join(process.cwd(), projectName);
  return !fs.existsSync(targetDir) || isEmpty(targetDir);
}

export function isValidFramework(framework: string) {
  return typeof framework === "string" && TEMPLATES.includes(framework);
}

export function getVariantByFramework(framework: string) {
  return FRAMEWORKS.find((v) => v.name === framework)?.variants || [];
}

export function isValidVariant(framework: string) {
  const variants = getVariantByFramework(framework);
  return variants.length > 0;
}

/**
 * 生成随机串
 * @param length
 * @returns
 */
export function generateRandom(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName,
  );
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export interface TemplateOptions {
  projectName: string;
  framework: string;
}

export const fileIgnore = ["package.json", "_gitignore"];
