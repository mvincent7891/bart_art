import { DataInitializer } from './utils/initialize_data';

const dataObject = new DataInitializer();

const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.height = 540;
canvasEl.width = 490;
