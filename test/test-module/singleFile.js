export function foo(bar) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-plus-operands
  return bar + 1;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.foo = foo(2);
