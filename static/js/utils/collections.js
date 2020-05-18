export const fromEntries = entries => {
  return entries.reduce((acc, cur) => {
    const key = Object.keys(cur)[0];
    const values = Object.values(cur)[0];

    return { ...acc, [key]: values };
  }, {});
};
