import { tipsContainer } from './tipsContainer.mjs';

export function showTip(tipGenerator, tipGeneratorID) {

  let tipDiv = document.createElement('div');
  tipDiv.classList.add('tip');
  tipDiv.id = tipGeneratorID + "-tip";
  tipDiv.innerHTML = tipsContainer[tipGeneratorID];

  document.body.appendChild(tipDiv);

  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
  let tipGenCoordinates = tipGenerator.getBoundingClientRect();

  tipDiv.style.top = tipGenCoordinates.bottom + 12 + scrollTop + 'px';
  tipDiv.style.left = tipGenCoordinates.left - 5 + scrollLeft + 'px';
}
