const hpAPI = async () => {
  return await fetch('https://hp-api.onrender.com/api/characters')
    .then(res => res.json())
    .then(data => {
      return data;
    });
}

let charactersArray = [];
hpAPI().then(data => {
  return charactersArray = data;
});

let gryffindorCounter = 0;
let ravenclawCounter = 0;
let hufflepuffCounter = 0;
let slytherinCounter = 0;

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
    if (charactersArray[i].hogwartsStudent) {
      characterHogwartsPosition.textContent = 'Hogwarts Student';
      document.getElementById('characterText' + i).append(characterHogwartsPosition);
    } else if (charactersArray[i].hogwartsStaff) {
      characterHogwartsPosition.textContent = 'Hogwarts Staff';
      document.getElementById('characterText' + i).append(characterHogwartsPosition);
    }
  }
}

function addHouseCounters(id, house, counter) {
  const listElement = document.getElementById(id);
  listElement.textContent = house + ': ' + counter;
}

// Moving Cards between sections
const mainBoard = document.getElementById('characterBoard');
const favsBoard = document.getElementById('favoritesBoard');
const allCharacters = document.getElementsByClassName('character-card');

function updateCollections(id, direction) {
  const card = document.getElementById(id);
  if (direction === 'toMain') {
    mainBoard.appendChild(card);
    card.classList.add('notFav');
    card.classList.remove('isFav');
  } else {
    favsBoard.appendChild(card);
    card.classList.add('isFav');
    card.classList.remove('notFav');
  }
}

const sortBtn = document.getElementsByClassName('sortBtn');

function sortData(id, direction, favClass) {
  const container = document.getElementById(id);
  const cardsArray = Array.from(document.getElementsByClassName(favClass));
  const sortAsc = (a, b) => {
    if (a.attributes.name.nodeValue < b.attributes.name.nodeValue) return -1;
    else if(a.attributes.name.nodeValue > b.attributes.name.nodeValue) return 1;
    else return 0;
  }
  const sortDesc = (a, b) => {
    if (a.attributes.name.nodeValue < b.attributes.name.nodeValue) return 1;
    else if(a.attributes.name.nodeValue > b.attributes.name.nodeValue) return -1;
    else return 0;
  }

  if (direction === 'asc') {
    cardsArray.sort(sortAsc);
    cardsArray.forEach((card) => {
      container.append(card);
    });
  } else if (direction === 'desc') {
    cardsArray.sort(sortDesc);
    cardsArray.forEach((card) => {
      container.append(card);
    });
  }
}

setTimeout(() => addCharacterCards(charactersArray), 2000);

setTimeout(() => {
  for (let card of allCharacters) {
    card.addEventListener('click', () => {
      const parentId = card.parentElement.id;
      let direction;
      if (parentId === 'characterBoard') {  direction = 'toFavs' } else {  direction = 'toMain' };
      updateCollections(card.id, direction);
    })
  }
  for (let btn of sortBtn) {
    btn.addEventListener('click', () => {
      if (btn.id === 'characterBtn') {
        sortData('characterBoard', btn.getAttribute('data-sortdir'), 'notFav');
      } else {
        sortData('favoritesBoard', btn.getAttribute('data-sortdir'), 'isFav');
      }
    })
  }
  addHouseCounters('gryffindorCount', 'Gryffindor', gryffindorCounter);
  addHouseCounters('ravenclawCount', 'Ravenclaw', ravenclawCounter);
  addHouseCounters('hufflepuffCount', 'Hufflepuff', hufflepuffCounter);
  addHouseCounters('slytherinCount', 'Slytherin', slytherinCounter);
}, 2050)

