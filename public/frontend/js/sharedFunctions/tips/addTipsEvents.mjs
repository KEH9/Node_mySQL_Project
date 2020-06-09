import { showTip } from './showTip.mjs';
import { removeTip } from './removeTip.mjs';

export function addTipsEvents() {
  let tipsGenerators = document.getElementsByClassName("tip-generator");
  for (let i = 0; i < tipsGenerators.length; i++) {
    tipsGenerators[i].addEventListener('focus', (e) => {
      let tipGeneratorID = tipsGenerators[i].id;
      showTip(tipsGenerators[i], tipGeneratorID);
    });
    tipsGenerators[i].addEventListener('blur', (e) => {
      let tipGeneratorID = tipsGenerators[i].id;
      removeTip(tipGeneratorID);
    });
  }
}
