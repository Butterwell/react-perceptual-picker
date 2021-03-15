import { toOklab, rgbString } from "@butterwell/oklab";

export const extremes = {
  red: toOklab("rgb(255,0,0)"),
  green: toOklab("rgb(0,255,0)"),
  yellow: toOklab("rgb(255,255,0)"),
  blue: toOklab("rgb(0,0,255)"),
  white: toOklab("rgb(255,255,255)"),
  black: toOklab("rgb(0,0,0)"),
};

export const lRange = {
  start: extremes.black,
  end: extremes.white,
};

export const aRange = {
  start: extremes.red,
  end: extremes.green,
};

export const bRange = {
  start: extremes.yellow,
  end: extremes.blue,
};

const lin = (a: number, d: number) => (t: number) => a + t * d;
const con = (x: number) => () => x;

function linear(a: number, b: number) {
  const d = b - a;
  return d ? lin(a, d) : con(isNaN(a) ? b : a);
}

export const chunks = (start: number, end: number, count: number): number[] => {
  const f = linear(start, end);
  const ts = Array.from({ length: count }, (_, i) => i / (count - 1));
  const values = ts.map(f);
  return values;
};

export const vec = (
  n: number,
  start: number,
  end: number,
  spread: number,
): number[] => {
  const o = chunks(start, n, spread + 1);
  const p = chunks(n, end, spread + 1);
  return [...o, ...p.slice(1)];
};

// Build three grids, holding b, a, and L constant in order.
// Fields are named by what varies:: La, Lb, and ab
export const grid = (
  centerColor: string,
  spread: number,
): {
  La: string[][];
  Lb: string[][];
  ab: string[][];
} => {
  const lab = toOklab(centerColor);

  // Acting as L, a, and b are independent and can be just used
  // everywhere on the grid
  const as = vec(lab.a, aRange.start.a, aRange.end.a, spread);
  const bs = vec(lab.b, bRange.start.b, bRange.end.b, spread);
  const ls = vec(lab.L, lRange.start.L, lRange.end.L, spread);

  const LaResult: string[][] = [
    ...ls.map((l) =>
      as.map((a) =>
        rgbString({
          L: l,
          a: a,
          b: lab.b,
        }),
      ),
    ),
  ];

  const LbResult: string[][] = [
    ...ls.map((l) =>
      bs.map((b) =>
        rgbString({
          L: l,
          a: lab.a,
          b: b,
        }),
      ),
    ),
  ];

  const abResult: string[][] = [
    ...as.map((a) =>
      bs.map((b) =>
        rgbString({
          L: lab.L,
          a: a,
          b: b,
        }),
      ),
    ),
  ];

  return {
    La: LaResult,
    Lb: LbResult,
    ab: abResult,
  };
};
