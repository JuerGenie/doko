import chalk from "chalk";
import root, { LogLevelDesc } from "loglevel";
import prefix from "loglevel-plugin-prefix";
import _ from "lodash";

prefix.reg(root);

const colors = {
  trace: chalk.magenta,
  debug: chalk.cyan,
  info: chalk.blue,
  warn: chalk.yellow,
  error: chalk.red,
} as const;

export function getLogger(name: string, level = root.levels.INFO) {
  const res = root.getLogger(name);
  res.setLevel(level);

  return prefix.apply(res, {
    format: (level, name, timestamp) =>
      colors[level.toLowerCase() as keyof typeof colors](
        [
          `[${timestamp}]`,
          `[${level.padEnd(5)}]`,
          `[${_.truncate(name, { length: 10 }).padEnd(10)}]`,
        ].join("")
      ),
  });
}
