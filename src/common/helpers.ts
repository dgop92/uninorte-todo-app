export function getURLSearchParamsFromObject(
  obj?: Record<string, number | string | boolean | undefined>
): URLSearchParams {
  const urlSearchParams = new URLSearchParams();
  if (obj) {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value) {
        urlSearchParams.set(key, value.toString());
      }
    });
  }
  return urlSearchParams;
}

export function getOrderingObject(
  obj?: Record<string, "asc" | "desc">
): Record<string, string> {
  const orderingFields: string[] = [];
  const orderingDirections: string[] = [];
  if (obj) {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value) {
        orderingFields.push(key);
        orderingDirections.push(value);
      }
    });
  }

  if (orderingFields.length > 0) {
    return {
      _sort: orderingFields.join(","),
      _order: orderingDirections.join(","),
    };
  }
  return {};
}

export function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
