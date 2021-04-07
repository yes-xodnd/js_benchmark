export function setCssVarHeaderHeight() {
  document.documentElement.style.setProperty(
    '--header-height', 
    document.querySelector('header').clientHeight + 'px'
  );
}