import { DataInitializerNYC } from './utils/parse_nycmta';
import { DataInitializerBART } from './utils/parse_bart';

let dataObject;
const loadMap = selector => {
  $('#modal').attr('class', 'closed');
  $('#modal').removeClass('open');
  $('#overlay').attr('class', 'closed');
  $('#overlay').removeClass('open');
  $(changeCity).text('CHANGE');
  if (selector) {
    dataObject = new DataInitializerBART();
  } else {
    dataObject = new DataInitializerNYC();
  }
};

const selectNYC = $('#ny');
$(selectNYC).on('click', loadMap.bind(null, false));
const selectSF = $('#sf');
$(selectSF).on('click', loadMap.bind(null, true));

const changeCity = $('#change');
$(changeCity).on('click', () => location.reload());

//let dataObject = new DataInitializerNYC();
//let citySelector = true;

const canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.height = 560;
canvasEl.width = 460;
