export function getExt(name: string) {
  return name.split('.').at(-1);
}