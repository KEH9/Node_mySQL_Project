import { showTip } from './showTip.mjs';
import { removeTip } from './removeTip.mjs';

export function addTipsEventsToNewlyGeneratedElements () {
  let tipsGeneratorsMouse = document.getElementsByClassName("click-me");
  addTipsToMouseEnter(tipsGeneratorsMouse, 'down');
}

function addTipsToMouseEnter (tipsGenerators, tipType) {
  for (let i = 0; i < tipsGenerators.length; i++) {
    let tipGeneratorID = tipsGenerators[i].id;
    tipsGenerators[i].addEventListener('mouseenter', (e) => {
      showTip(tipsGenerators[i], tipGeneratorID, tipType, 'Click me!');
    });
    tipsGenerators[i].addEventListener('mouseleave', (e) => {
      removeTip(tipGeneratorID);
    });
  }  
}
