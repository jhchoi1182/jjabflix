export const useOpacity = () => {
  let opacitySetTimeout: ReturnType<typeof setTimeout>;

  const setOpacity = (opacity: number) => {
    document.documentElement.style.setProperty("--opacity", `${opacity}`);
  };

  const setOpacityAfterDelay = (opacity: number) => {
    opacitySetTimeout = setTimeout(() => {
      setOpacity(opacity);
    }, 500);
  };
  
  const setOpacityAfterDelayInvalidation = () => {
    clearTimeout(opacitySetTimeout);
  };

  return { setOpacity, setOpacityAfterDelay, setOpacityAfterDelayInvalidation };
};
