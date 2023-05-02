export const useButtonOpacity = () => {
  let opacitySetTimeout: ReturnType<typeof setTimeout>;

  const setButtonOpacity = (opacity: number) => {
    document.documentElement.style.setProperty("--opacity", `${opacity}`);
  };

  const setButtonOpacityAfterDelay = (opacity: number) => {
    opacitySetTimeout = setTimeout(() => {
      setButtonOpacity(opacity);
    }, 500);
  };

  const setButtonOpacityAfterDelayInvalidation = () => {
    clearTimeout(opacitySetTimeout);
  };

  return { setButtonOpacity, setButtonOpacityAfterDelay, setButtonOpacityAfterDelayInvalidation };
};
