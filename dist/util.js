"use strict";

exports.__esModule = true;
exports.getTempFile = getTempFile;
var _os = require("os");
var _path = require("path");
var _fsExtra = require("fs-extra");
var _v = _interopRequireDefault(require("uuid/v4"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getTempFile(key = (0, _v.default)()) {
  const path = (0, _os.tmpdir)();
  const filename = `${key}.js`;
  const filepath = (0, _path.join)(path, filename);
  const write = async text => {
    await (0, _fsExtra.writeFile)(filepath, text);
  };
  const remove = async () => {
    await (0, _fsExtra.unlink)(filepath);
  };
  return {
    path,
    filename,
    filepath,
    write,
    remove
  };
}