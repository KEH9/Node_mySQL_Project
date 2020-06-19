import { showTip } from './showTip.mjs';
import { removeTip } from './removeTip.mjs';

export function addTipsEvents() {
  let tipsGeneratorsLeft = document.getElementsByClassName("tip-generator-left");
  addTipsToFocus(tipsGeneratorsLeft, 'left');
  let tipsGeneratorsDown = document.getElementsByClassName("tip-generator-down");
  addTipsToFocus(tipsGeneratorsDown, 'down');  
}

function addTipsToFocus (tipsGenerators, tipType) {
  for (let i = 0; i < tipsGenerators.length; i++) {
    let tipGeneratorID = tipsGenerators[i].id;
    tipsGenerators[i].addEventListener('focus', (e) => {
      showTip(tipsGenerators[i], tipGeneratorID, tipType);
    });
    tipsGenerators[i].addEventListener('blur', (e) => {
      removeTip(tipGeneratorID);
    });
  }  
}
