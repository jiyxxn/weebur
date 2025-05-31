export const local = {
  get<T>(k: string): T | undefined {
    try {
      return JSON.parse(localStorage.getItem(k) ?? 'null');
    } catch {
      return undefined;
    }
  },
  set(k: string, v: unknown) {
    localStorage.setItem(k, JSON.stringify(v));
  },
};
