export interface Action<T = void> {
  type: string;
  payload?: T;
}

export type ActionCreator<T> = (payload: T) => Action<T>;
