import App from './components/App.js';
import About from './components/About.js';
import { setCssVarHeaderHeight } from './lib/setCssVar.js';

setCssVarHeaderHeight();
window.addEventListener('resize', setCssVarHeaderHeight);

App();
About();


