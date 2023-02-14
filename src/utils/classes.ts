import { identity, join, keys, map, partial, pickBy, pipe } from "ramda";

type Modifiers = Record<string, boolean | null | undefined>;

const compact = <T>(obj: T): Partial<T> => pickBy(identity, obj);

const modifier = (key: string): string => `--${key}`;

const modifiersPipe = pipe(
  compact,
  keys,
  partial(map, [modifier]),
  partial(join, [" "])
);

const classes =
  (styles: { readonly [key: string]: string }) =>
  (base: string, modifiers?: Modifiers) => {
    return `${styles[base]} ${styles[base + modifiersPipe(modifiers)]}`;
  };
export default classes;
