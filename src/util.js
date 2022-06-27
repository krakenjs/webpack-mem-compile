/* @flow */

import { tmpdir } from "os";
import { join } from "path";

import { writeFile, unlink } from "fs-extra";
import uuidv4 from "uuid/v4";

type TempFile = {|
  path: string,
  filename: string,
  filepath: string,
  write: (string) => Promise<void>,
  remove: () => Promise<void>,
|};

export function getTempFile(key?: string = uuidv4()): TempFile {
  const path = tmpdir();
  const filename = `${key}.js`;
  const filepath = join(path, filename);

  const write = async (text) => {
    await writeFile(filepath, text);
  };

  const remove = async () => {
    await unlink(filepath);
  };

  return { path, filename, filepath, write, remove };
}
