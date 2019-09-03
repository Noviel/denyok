import * as fs from "fs";
import * as path from "path";

export function createFile<T = any>(filename: string, data: T) {
  return new Promise((resolve, reject) => {
    const fullpath = path.resolve(filename);
    if (fs.existsSync(fullpath)) {
      reject(`File ${filename} already exists.`);
    }

    fs.writeFile(fullpath, data, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
