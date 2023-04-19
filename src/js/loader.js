import 'animate-loading/dist/main.css';
import AnimateLoading from 'animate-loading';

const option = { thickness: '8px', color: 'red', startDuration: '1500' };
const target = document.body;
const loading = new AnimateLoading(target, option);

export { loading };

// loading.start(); add before fetch
// loading.finish(); add after fetch
// import { loading } from './loader'; add import
