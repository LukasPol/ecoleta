function populatesUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (state of states) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
      }
    });
}

populatesUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  citySelect.innerHTML = `<option value="">Seleciona a cidade</option>`
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (city of cities) {
        citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
      }
      citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]")
  .addEventListener("change", getCities);


// Items de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li');

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []
const collectedItems = document.querySelector('input[name=items');

function handleSelectedItem(event) {
  const itemLi = event.target
  const itemId = itemLi.dataset.id

  // add or rem uma class
  itemLi.classList.toggle("selected")

  const alreadySelected = selectedItems.findIndex(item => item === itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => item != itemId)

    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  }


  collectedItems.value = selectedItems
}
