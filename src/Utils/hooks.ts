type useOpacityProps = {
  over?: number;
  out?: number;
};

export const useOpacity = ({ over, out }: useOpacityProps) => {
  let opacitySetTimeout: ReturnType<typeof setTimeout>;
  const setOpacity = (opacity: number | undefined) => {
    document.documentElement.style.setProperty("--opacity", `${opacity}`);
  };

  const mouseOver = () => {
    setOpacity(over);
  };
  const mouseOut = () => {
    setOpacity(out);
  };
  const resetOpacityAfterDelay = () => {
    opacitySetTimeout = setTimeout(() => {
      setOpacity(out);
    }, 500);
  };
  const resetOpacityAfterDelayInvalidation = () => {
    clearTimeout(opacitySetTimeout);
  };

  return { mouseOver, mouseOut, resetOpacityAfterDelay, resetOpacityAfterDelayInvalidation };
};
