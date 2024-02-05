export function foo(bar) {
  return bar + 1;
}

global.foo = foo(2);
