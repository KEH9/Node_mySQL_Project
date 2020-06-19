import { tipsContainer } from './tipsContainer.mjs';

export function showTip(tipGenerator, tipGeneratorID, tipDirection, tipText) {

  let tipDiv = document.createElement('div');
  tipDiv.classList.add('tip-' + tipDirection);
  tipDiv.id = tipGeneratorID + "-tip";
  if (tipText) {
    tipDiv.innerHTML = tipText;  
  } else {
    tipDiv.innerHTML = tipsContainer[tipGeneratorID];
  }


  document.body.appendChild(tipDiv);

  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
  let tipGenCoordinates = tipGenerator.getBoundingClientRect();
  let tipCoordinates = tipDiv.getBoundingClientRect();

  if (tipDirection == 'left') {
    tipDiv.style.top = tipGenCoordinates.top - 5 + scrollTop + 'px';
    tipDiv.style.left = tipGenCoordinates.left - tipCoordinates.width - 20 + scrollLeft + 'px';
  } else if (tipDirection == 'down') {
    tipDiv.style.top = tipGenCoordinates.bottom + 20 + scrollTop + 'px';
    tipDiv.style.left = tipGenCoordinates.left + 5 + scrollLeft + 'px';
  }

}
