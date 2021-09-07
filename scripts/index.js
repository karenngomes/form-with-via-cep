let btnSubmit = document.getElementById("btn-submit");
btnSubmit.setAttribute("disabled", true);
const API_URL_BASE = "https://brasilapi.com.br/api/cep/v1";
let data = {};

const cepSearch = document.querySelector("#cep-search");

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
  console.log(data);
}
