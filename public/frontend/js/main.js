import { addTipsEvents } from './sharedFunctions/tips/addTipsEvents.mjs';

console.log('Client-side code running');

//------------- NAVIGATION -------------
// toggle customer / goods / orders managing pages (hide /show)
let customersContainer = document.getElementById('customersContainer');
let goodsContainer = document.getElementById('goodsContainer');
let ordersContainer = document.getElementById('ordersContainer');

document.getElementById('customersButton').addEventListener("click", function(e){
  customersContainer.classList.remove('hidden');
  goodsContainer.classList.add('hidden');
  ordersContainer.classList.add('hidden');
})

document.getElementById('goodsButton').addEventListener("click", function(e){
  customersContainer.classList.add('hidden');
  goodsContainer.classList.remove('hidden');
  ordersContainer.classList.add('hidden');
})

document.getElementById('ordersButton').addEventListener("click", function(e){
  customersContainer.classList.add('hidden');
  goodsContainer.classList.add('hidden');
  ordersContainer.classList.remove('hidden');
})
//------------- NAVIGATION (end) -------------



//------------- TIPS -------------

addTipsEvents();

