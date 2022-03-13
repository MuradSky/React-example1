/**
 * Check window size
 *
 * @param {number} maxWidthPixel max width in pixel
 */
export const checkWindow = (maxWidthPixel: number): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia(`(max-width: ${maxWidthPixel}px)`).matches;

export const isNotebook: boolean = checkWindow(1919);
export const isPad: boolean = checkWindow(1024);
export const isMobile: boolean = checkWindow(768);

export const windowResize = (setMobile: (state?: boolean | undefined )=> void, width: number) => {
  window.addEventListener("resize", () => {
    setMobile(checkWindow(width));
    return window.removeEventListener("resize", () =>
      setMobile(checkWindow(width))
    );
  });
};
