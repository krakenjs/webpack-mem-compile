"use strict";

exports.__esModule = true;
var _webpack = require("./webpack");
Object.keys(_webpack).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _webpack[key]) return;
  exports[key] = _webpack[key];
});