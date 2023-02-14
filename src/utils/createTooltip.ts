const createTooltip = (html: string) => () => {
  if (!html) return null;
  return { html };
};

export default createTooltip;
