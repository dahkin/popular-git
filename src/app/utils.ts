export function repeat<T>(cb: (i: number) => T, times = 1): T[] {
  const res = [];
  for (let i = 0; i < times; i++) {
    res.push(cb(i));
  }
  return res;
}

export function readableURL(url: string): string {
  return url.replace(/\/$/, '').replace(/^https?:\/\//, '');
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getTranslateXValue(element: HTMLDivElement): number {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.transform);
  return -matrix.m41;
}

export function percentage(partialValue: number, totalValue: number): number {
  return (100 * partialValue) / totalValue;
}
