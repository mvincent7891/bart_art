import { DataInitializerNYC } from './utils/parse_nycmta';
import { DataInitializerBART } from './utils/parse_bart';


const switchCity = () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (citySelector) {
    dataObject = new DataInitializerBART();
  } else {
    dataObject = new DataInitializerNYC();
  }
};

const changeLink = $('#change');
$(changeLink).on('click', switchCity);

let dataObject = new DataInitializerNYC();
let citySelector = true;

const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.height = 560;
canvasEl.width = 460;
