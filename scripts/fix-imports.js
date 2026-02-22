import fs from "fs";
import path from "path";

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith(".ts")) {
      let content = fs.readFileSync(full, "utf8");

      content = content.replace(
        /import {([^}]+)} from ["'](\.\.\/models.*?)["']/g,
        'import type {$1} from "$2"'
      );

      fs.writeFileSync(full, content);
    }
  }
}

walk("packages/api-stubs");