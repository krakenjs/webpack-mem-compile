import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import { tmpdir } from "os";
import { join } from "path";
import { writeFile, unlink } from "fs-extra";
// @ts-expect-error - we do not import from the root of uuid
import uuidv4 from "uuid/v4";
// uuidv4 types arent coming in
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export function getTempFile(key) {
  if (key === void 0) {
    key = uuidv4();
  }
  var path = tmpdir();
  var filename = key + ".js";
  var filepath = join(path, filename);
  var write = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (text) {
      yield writeFile(filepath, text);
    });
    return function write(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var remove = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      yield unlink(filepath);
    });
    return function remove() {
      return _ref2.apply(this, arguments);
    };
  }();
  return {
    path: path,
    filename: filename,
    filepath: filepath,
    write: write,
    remove: remove
  };
}