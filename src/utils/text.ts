export const buildRequestId = (data: object) => Object.entries({ ...data })
    .map(([key, value]) => `${key}:${value}`)
    .join('||');
