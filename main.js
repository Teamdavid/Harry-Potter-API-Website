const hpAPI = async () => {
  return await fetch('https://hp-api.onrender.com/api/characters')
    .then(res => res.json())
    .then(data => {
      return data;
    });
}

hpAPI().then(data => {
  createUI(data);
});

let gryffindorCounter = 0;
let ravenclawCounter = 0;
let hufflepuffCounter = 0;
let slytherinCounter = 0;
const mainBoard = document.getElementById('characterBoard');
const favsBoard = document.getElementById('favoritesBoard');

function createUI(data) {
  addCharacterCards(data)

  const allCharacters = document.getElementsByClassName('character-card');
  const sortBtn = document.getElementsByClassName('sortBtn');

  addListenersToCards(allCharacters);
  addListenersToSortBtns(sortBtn);
  addCountersValues();
}

function addCharacterCards(charactersArray) {
  for (let i = 0; i < 20; i++) {
    if (charactersArray[i].house === 'Gryffindor') {
      gryffindorCounter ++;
    } else if (charactersArray[i].house === 'Ravenclaw') {
      ravenclawCounter ++;
    } else if (charactersArray[i].house === 'Hufflepuff') {
      hufflepuffCounter ++;
    } else if (charactersArray[i].house === 'Slytherin') {
      slytherinCounter ++;
    }

    const characterCard = document.createElement('div');
    characterCard.setAttribute('class', charactersArray[i].house ? 'character-card notFav ' + charactersArray[i].house.toLowerCase() : 'character-card notFav no-house')
    characterCard.setAttribute('id', 'characterCard' + i)
    characterCard.setAttribute('name', charactersArray[i].name);
  
    document.getElementById('characterBoard').append(characterCard);

    const characterIMG = document.createElement('img');
    characterIMG.setAttribute('src', charactersArray[i].image);
    characterIMG.setAttribute('alt', charactersArray[i].name);

    document.getElementById('characterCard' + i).append(characterIMG);

    const characterText = document.createElement('div');
    characterText.setAttribute('class', 'card-text');
    characterText.setAttribute('id', 'characterText' + i);

    document.getElementById('characterCard' + i).append(characterText);

    const characterName = document.createElement('p');
    characterName.textContent = charactersArray[i].name;

    document.getElementById('characterText' + i).append(characterName);

    const characterHouse = document.createElement('p');
    characterHouse.textContent = `House: ${charactersArray[i].house}`;

    if (charactersArray[i].house) {
      document.getElementById('characterText' + i).append(characterHouse);
    }
    
    const characterPatronus = document.createElement('p');
    characterPatronus.textContent = `Patronus: ${charactersArray[i].patronus}`;

    if (charactersArray[i].patronus && charactersArray[i].patronus.length < 12) {
      document.getElementById('characterText' + i).append(characterPatronus);
    }
    
    const characterHogwartsPosition = document.createElement('p');

    if (charactersArray[i].hogwartsStudent || charactersArray[i].hogwartsStaff) {
      const type = charactersArray[i].hogwartsStudent ? 'Student' : 'Staff';
      characterHogwartsPosition.textContent = `Hogwarts ${type}`;
      document.getElementById('characterText' + i).append(characterHogwartsPosition);
    }
  }
}

function addHouseCounters(id, house, counter) {
  const listElement = document.getElementById(id);
  listElement.textContent = house + ': ' + counter;
}

function updateCollections(id, direction) {
  const card = document.getElementById(id);
  const classesArr = ['notFav', 'isFav'];
  const paramsArr = direction === 'toMain'
    ? [mainBoard, classesArr]
    : [favsBoard, classesArr.reverse()];
    
  paramsArr[0].appendChild(card)
  card.classList.add(paramsArr[1][0]);
  card.classList.remove(paramsArr[1][1]);
}

function sortData(id, direction, favClass) {
  const container = document.getElementById(id);
  const cardsArray = Array.from(document.getElementsByClassName(favClass));

  const sortCards = (a, b) => {
    if (a.attributes.name.nodeValue < b.attributes.name.nodeValue) return direction === 'asc' ?  -1 : 1;
    else if(a.attributes.name.nodeValue > b.attributes.name.nodeValue) return direction === 'asc' ? 1 : -1;
    else return 0;
  }

  cardsArray.sort(sortCards);
  cardsArray.forEach((card) => {
    container.append(card);
  });
}

function addListenersToCards(cards) {
  for (let card of cards) {
    card.addEventListener('click', () => {
      const parentId = card.parentElement.id;
      let direction;
      if (parentId === 'characterBoard') {  direction = 'toFavs' } else {  direction = 'toMain' };
      updateCollections(card.id, direction);
    })
  }
}

function addListenersToSortBtns(btns) {
  for (let btn of btns) {
    btn.addEventListener('click', () => {
      const type = btn.id === 'characterBtn' ? ['characterBoard', 'notFav'] : ['favoritesBoard', 'isFav'];
      sortData(type[0], btn.getAttribute('data-sortdir'), type[1]);
    })
  }
}

function addCountersValues() {
  const counterObj = {
    'Gryffindor' : ['gryffindorCount', gryffindorCounter],
    'Ravenclaw' : ['ravenclawCount', ravenclawCounter],
    'Hufflepuff' : ['hufflepuffCount', hufflepuffCounter],
    'Slytherin' : ['slytherinCount', slytherinCounter]
  }

  Object.entries(counterObj).forEach(([key, value]) => {
  addHouseCounters(value[0], key, value[1]);
  })
}

// setTimeout(() => addCharacterCards(charactersArray), 2000);

// setTimeout(() => {
//   addListenersToCards(charactersArray);
//   addListenersToSortBtns(sortBtn);
//   addCountersValues();
// }, 2050)

