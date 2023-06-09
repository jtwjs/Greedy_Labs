export const getOneDepthPath = (path = ""): string => {
  const p = path?.split("/").filter(Boolean)[0] ?? "";
  return `/${p}`;
};

export const isMatchRoute = (comparePath = "", path = ""): boolean =>
  getOneDepthPath(comparePath) === getOneDepthPath(path);
