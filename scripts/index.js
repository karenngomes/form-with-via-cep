let btnSubmit = document.getElementById("btn-submit");
btnSubmit.setAttribute("disabled", true);
const API_URL_BASE = "https://brasilapi.com.br/api/cep/v1";
let data = {};

const cepSearch = document.querySelector("#cep-search");
const divRowSearch = document.querySelector("#div-row-search");

function onChangeInputCep() {
  if (cepSearch.value.length === 9) {
    console.log();
    btnSubmit.removeAttribute("disabled");
  } else {
    btnSubmit.setAttribute("disabled", true);
  }
}

function handleClickSearch() {
  const apiUrlWithQuery = `${API_URL_BASE}/${cepSearch.value}`;

  fetchData(apiUrlWithQuery);
}

async function fetchData(API_URL) {
  try {
    btnSubmit.textContent = "Pesquisando...";
    const response = await fetch(API_URL);
    data = await response.json();

    if (!response.ok) {
      cepSearch.classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[0].textContent =
        data.message;
    } else {
      cepSearch.classList.remove("is-invalid");
      renderCepData();
    }
  } catch (err) {
    console.error("algo deu errado", err);
  } finally {
    btnSubmit.textContent = "Consultar";
  }
}

function renderCepData() {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("id", "card-cep-data");

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  cardBody.innerHTML = `
    <div id="container-cep-data">
      <div class="flex">
        <p class="bold">CEP: </p>
        <p>${data.cep}</p>
      </div>
      <div class="flex">
        <p class="bold">Rua: </p>
        <p> ${data.street}</p>
      </div>
      <div class="flex">
        <p class="bold">Bairro: </p>
        <p> ${data.neighborhood}</p>
      </div>
      <div class="flex">
        <p class="bold">Cidade: </p>
        <p> ${data.city}</p>
      </div>
      <div class="flex">
        <p class="bold">Estado: </p>
        <p> ${data.state}</p>
      </div>
      <div class="flex">
        <p class="bold">Serviço: </p>
        <p> ${data.service}</p>
      </div>
    </div>
  `;

  card.appendChild(cardBody);
  divRowSearch.appendChild(card);
}
