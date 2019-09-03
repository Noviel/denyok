import * as fs from "fs";
import * as path from "path";

export function createFile<T = any>(filename: string, dir: string, data: T) {
  return new Promise((resolve, reject) => {
    const fullpath = path.resolve(dir, filename);
    if (fs.existsSync(fullpath)) {
      reject(`File ${filename} already exists in directory ${dir}.`);
    }

    fs.writeFile(fullpath, data, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
