import dotenv, { DotenvConfigOutput } from "dotenv";

function load(waitForFilter: DotenvConfigOutput, prefix = "") {
  const { parsed } = waitForFilter;
  if (typeof parsed === "object") {
    Object.keys(parsed).forEach((key) => {
      if (key.startsWith(prefix)) {
        process.env[key] = parsed[key];
      } else {
        delete process.env[key];
      }
    });
  }
}

export interface LoadEnvOptions {
  prefix?: string;
}
export function loadEnv(options: LoadEnvOptions = {}) {
  const { prefix = "" } = options;
  const baseDir = process.cwd();
  // .env
  load(dotenv.config({ path: `${baseDir}/.env` }), prefix);
  // .env.local
  load(dotenv.config({ path: `${baseDir}/.env.local` }), prefix);
  // .env.[mode]
  load(
    dotenv.config({ path: `${baseDir}/.env.${process.env.NODE_ENV}` }),
    prefix
  );
  // .env.[mode].local
  load(
    dotenv.config({ path: `${baseDir}/.env.${process.env.NODE_ENV}.local` }),
    prefix
  );
}
