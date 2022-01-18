const getData = async (callback) => {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  callback(data);
}

function showData(data) {
  RegionSel(data);
  let html = data.map(item => {
    return `
      <div class='card'>
        <div>
        <img class="country" src=${item.flags.svg} alt="${item.name.common}"/>
        </div>
        <h3>${item.name.common}</h3>
        <ul>
          <li>
           <b>Population</b>: ${item.population}
          </li>
          <li>
          <b>Region</b>: ${item.region}
          </li>
          <li>
          <b>Capital</b>: ${item.capital}</li>
        </ul>
      </div>`;
  }).join(" ");
  document.querySelector(".view").innerHTML = html;

}

getData(showData);


let drop = document.querySelector(".fillter");

drop.addEventListener("click", () => {
  document.querySelector(".fillter_res").classList.toggle("open");
})


let darkmodebtn = document.querySelector(".switcher");

let matched = window.matchMedia('prefers-color-scheme: light').matches;

if (matched) {
  document.body.className = "dark";
}
else {
  document.body.className = "light";
}


let mode = document.body.className;


if (mode == "light") {
  darkmodebtn.innerHTML = `<img src="assets/dark_mode_black_24dp.svg" />
        <span>Dark Mode</span>`;
}
else {
  darkmodebtn.innerHTML = `<img src="assets/light_mode_black_24dp.svg" />
        <span>Light Mode</span>`;
}


darkmodebtn.addEventListener("click", () => {
  if (mode == "light") {
    mode = "dark"
    darkmodebtn.innerHTML = `<img src="assets/light_mode_black_24dp.svg" />
        <span>Light Mode</span>`;
  }
  else {
    mode = "light"
    darkmodebtn.innerHTML = `<img src="assets/dark_mode_black_24dp.svg" />
        <span>Dark Mode</span>`;
  }
  changeMode(mode);
})

function changeMode(mode) {
  document.body.className = mode;
  if (mode != "light") {}
}



let filler = document.querySelector('.main_fillter p');
let fillterItems = document.querySelector('.fillter_res ul');


const RegionSel = (data) => {
  let items = data.slice(0, Math.floor(Math.random() * 150)).map(item => {
    return `<li>${item.region}</li>`;
  }).join(' ');
  fillterItems.innerHTML = items;
  let lis = fillterItems.querySelectorAll('li');
  lis.forEach(li => {
    li.addEventListener('click', (e) => {
      filler.textContent = e.target.innerText;
      showDataAndFetch(e.target.innerText);
    })
  })
}


async function showDataAndFetch(item) {
  let res = await fetch(`https://restcountries.com/v3.1/region/${item}`);
  let data = await res.json();
  document.querySelector(".view").innerHTML = '';
  showData(data);
}

async function searchItems(item) {
  if (item == "") {
    document.querySelector('.input_res').classList.remove('show');
    document.querySelector('.input_res ul').innerHTML = '';
    return;
  }
  let res = await fetch(`https://restcountries.com/v3.1/name/${item}`);
  let data = await res.json();
  if (data.length > 10) {
    let html = data.slice(0, 10).map(items => {
      return `<li>${items.name.common}</li>`;
    }).join(" ");
    document.querySelector('.input_res').classList.add('show');
    document.querySelector('.input_res ul').innerHTML = '';
    document.querySelector('.input_res ul').innerHTML = html;
  } else {
    document.querySelector('.input_res').classList.remove('show');
    document.querySelector('.input_res ul').innerHTML = '';
  }
  return data;

}

function suggest(item) {
  document.querySelector(".view").innerHTML = '';
  viewData(item);
  console.log(item);
}


let input = document.querySelector('.input_div input');

input.addEventListener('input', (e) => {
  if (input.value == "") {
    document.querySelector('.input_res').classList.remove('show');
    document.querySelector('.input_res ul').innerHTML = '';
  }
  if (input.value != "") {
    searchItems(e.target.value);
  }
  else {
    document.querySelector('.input_res').classList.remove('show');
    document.querySelector('.input_res ul').innerHTML = '';
  }
})


window.addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    if (input.value != "") {
      suggest(searchItems(input.value));
    }
  }
})


function viewData(data) {
  let html = data.map(item => {
    return `
        <div class='card'>
          <div>
          <img class="country" src=${item.flags.svg} alt="${item.name.common}"/>
          </div>
          <h3>${item.name.common}</h3>
          <ul>
            <li>
             <b>Population</b>: ${item.population}
            </li>
            <li>
            <b>Region</b>: ${item.region}
            </li>
            <li>
            <b>Capital</b>: ${item.capital}</li>
          </ul>
        </div>`;
  }).join(" ");
  document.querySelector(".view").innerHTML = html;

}