import { tmpdir } from "os";
import { join } from "path";

import { writeFile, unlink } from "fs-extra";
// @ts-expect-error - we do not import from the root of uuid
import uuidv4 from "uuid/v4";

type TempFile = {
  path: string;
  filename: string;
  filepath: string;
  write: (arg0: string) => Promise<void>;
  remove: () => Promise<void>;
};

// uuidv4 types arent coming in
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export function getTempFile(key: string = uuidv4()): TempFile {
  const path = tmpdir();
  const filename = `${key}.js`;
  const filepath = join(path, filename);

  const write = async (text: string): Promise<void> => {
    await writeFile(filepath, text);
  };

  const remove = async (): Promise<void> => {
    await unlink(filepath);
  };

  return {
    path,
    filename,
    filepath,
    write,
    remove,
  };
}
