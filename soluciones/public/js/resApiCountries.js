/*----constantes, variables---------*/
var dataGeneral = [];
var regionGeneral = "";
var searchGeneral = "";

const cboFilter = document.getElementById("cbo-filter");
const body = document.getElementById("body");
const btnDarkMode = document.getElementById("btn-mode");
const search = document.getElementById("search");
const btnBack = document.getElementById("btn-back");
const regions = [
  {
    value: "",
    text: "--Todos--",
  },
  {
    value: "africa",
    text: "Africa",
  },
  {
    value: "americas",
    text: "Americas",
  },
  {
    value: "asia",
    text: "Asia",
  },
  {
    value: "europe",
    text: "Europe",
  },
  {
    value: "oceania",
    text: "Oceania",
  },
];
const contentCard = document.getElementById("content-card");
const contentDetail = document.getElementById("content-detail");

/*------eventos---------------*/
btnDarkMode.addEventListener("change", (e) => {
  var clasMode = body.className;
  var text = e.target.parentElement.children[1];

  if (clasMode.includes("mode-dark")) {
    body.classList.remove("mode-dark");
    text.innerText = "Dark Mode";
  } else {
    body.classList.add("mode-dark");
    text.innerText = "Ligth Mode";
  }
});
cboFilter.addEventListener("click", (e) => {
  var miCbo = e.currentTarget;
  if (miCbo.className.includes("cbo-active")) {
    miCbo.classList.remove("cbo-active");
  } else {
    miCbo.classList.add("cbo-active");
  }
});
search.addEventListener("input", (e) => {
  var value = e.target.value.trim();
  searchGeneral = value.toLowerCase();
  searchCountries(searchGeneral);
});
btnBack.addEventListener("click", (e) => {
  contentCard.classList.add("content-card-active");
  contentDetail.classList.remove("detail-active");
});

/*-------------------------------------------------------------------------------*/
/*----------------funciones principales------------------------------------------*/
/*-------------------------------------------------------------------------------*/
//conexion con API
function queryCountries(region = "") {
  let url = "https://restcountries.eu/rest/v2/";
  if (region.trim() != "") {
    url = url + "region/" + region;
  } else {
    url = url + "all";
  }

  fetch(url, {
    method: "GET",
  })
    .then((status) => status.json())
    .then((dataApi) => {
      dataGeneral = dataApi;
      console.log(dataApi);
      if (searchGeneral.trim() != "") {
        searchCountries(searchGeneral);
      } else {
        listCountries(dataApi);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function queryDetailCountry(code = "") {
  limpiarDetails();
  if (code != "") {
    let url = "https://restcountries.eu/rest/v2/alpha/" + code;
    fetch(url, {
      method: "GET",
    })
      .then((status) => status.json())
      .then((dataApi) => {
        var topLevelDomain = "";
        var currency = "";
        var languages = "";
        var borderCountries = [];
        dataApi.topLevelDomain.forEach((element) => {
          topLevelDomain = topLevelDomain + " " + element + " ";
        });
        dataApi.currencies.forEach((element) => {
          currency = currency + " " + element.name + " ";
        });
        dataApi.languages.forEach((element) => {
          languages = languages + " " + element.name + " ";
        });
        dataApi.borders.forEach((element) => {
          borderCountries.push(element);
        });

        var miData = {
          flag: dataApi.flag,
          name: dataApi.name,
          nativeName: dataApi.nativeName,
          population: dataApi.population,
          region: dataApi.region,
          subregion: dataApi.subregion,
          capital: dataApi.capital,
          topLevelDomain: topLevelDomain,
          currencies: currency,
          languages: languages,
          borders: borderCountries,
        };
        createDetailCountry(miData);
      });
  }
}
/*-------------------------------------------------------------------------------*/
/*----------------funciones secundarias------------------------------------------*/
/*-------------------------------------------------------------------------------*/
function listRegions() {
  let contentOption = cboFilter.children[1];
  contentOption.innerHTML = "";
  regions.forEach((element) => {
    let option = document.createElement("li");
    let textOption = document.createElement("label");
    let valueOption = document.createElement("input");
    valueOption.type = "hidden";

    textOption.innerText = element.text;
    valueOption.value = element.value;
    option.append(textOption);
    option.append(valueOption);
    option.addEventListener("click", (e) => {
      selectedOption(e);
    });
    contentOption.append(option);
  });
}
function listCountries(data = []) {
  contentCard.innerHTML = "";
  if (data.length > 0) {
    data.forEach((element) => {
      var codeCountry = element.alpha3Code;
      // var nameCountry = element.translations.es;
      var nameCountry = element.name;
      var population = element.population;
      var capital = element.capital;
      var region = element.region;
      var flag = element.flag;

      createCardCountries(
        codeCountry,
        nameCountry,
        population,
        capital,
        region,
        flag
      );
    });
  } else {
    let divNotFound = document.createElement("div");
    divNotFound.classList.add("not-found");
    let h2Text = document.createElement("h2");
    h2Text.append("Sorry, data not found");

    divNotFound.append(h2Text);
    contentCard.append(divNotFound);
  }
}
function searchCountries(value = "") {
  if (value.trim() != "") {
    var countryRegion = [];
    dataGeneral.forEach((element) => {
      let name = element.name;
      let region = element.region;
      if (name != "" && name != null && name != undefined) {
        if (name.toLowerCase().includes(value.toLowerCase())) {
          if (region.toLowerCase().includes(regionGeneral) != "") {
            if (region.toLowerCase().includes(regionGeneral.toLowerCase())) {
              countryRegion.push(element);
            }
          } else {
            countryRegion.push(element);
          }
        }
      }
    });

    listCountries(countryRegion);
  } else {
    listCountries(dataGeneral);
  }
}
/*-------------------------------------------------------------------------------*/
/*----------------funciones tercearias------------------------------------------*/
/*-------------------------------------------------------------------------------*/
function createCardCountries(
  code = -1,
  name = "",
  population = "",
  capital = "",
  region = "",
  flag = ""
) {
  let divCardItem = document.createElement("div");
  divCardItem.classList.add("card-item");
  divCardItem.id = code;

  let divItemImg = document.createElement("div");
  divItemImg.classList.add("item-img");
  divItemImg.style.backgroundImage = "url('" + flag + "')";

  let divItemInformation = document.createElement("div");
  divItemInformation.classList.add("item-information");
  var h3NameCountry = document.createElement("h3");
  h3NameCountry.innerText = name;

  let ulInformation = document.createElement("ul");

  var liPopulation = document.createElement("li");
  var bPopulation = document.createElement("b");
  bPopulation.append("Population : ");
  liPopulation.append(bPopulation);
  liPopulation.append(population);

  var liRegion = document.createElement("li");
  var bRegion = document.createElement("b");
  bRegion.append("Region : ");
  liRegion.append(bRegion);
  liRegion.append(region);

  var liCapital = document.createElement("li");
  var bCapital = document.createElement("b");
  bCapital.append("Capital : ");
  liCapital.append(bCapital);
  liCapital.append(capital);

  ulInformation.append(liPopulation);
  ulInformation.append(liRegion);
  ulInformation.append(liCapital);

  divItemInformation.append(h3NameCountry);
  divItemInformation.append(ulInformation);
  divCardItem.append(divItemImg);
  divCardItem.append(divItemInformation);
  divCardItem.addEventListener("click", (e) => {
    clickCard(e);
  });

  contentCard.append(divCardItem);
}
function createDetailCountry(data = []) {
  let imgFlag = document.getElementById("img-flag-details");
  let nameCountry = document.getElementById("name-country-detail");
  let nativeName = document.getElementById("native-name");
  let population = document.getElementById("population");
  let region = document.getElementById("region");
  let subRegion = document.getElementById("sub-region");
  let capital = document.getElementById("capital");
  let levelDomain = document.getElementById("top-level-domain");
  let currencies = document.getElementById("currencies");
  let languages = document.getElementById("languages");
  let borderCountries = document.getElementById("border-countries");

  /*-----asignamos-----*/
  imgFlag.src = data.flag;
  nameCountry.innerText = data.name;
  nativeName.innerText = data.nativeName;
  population.innerText = data.population;
  region.innerText = data.region;
  subRegion.innerText = data.subregion;
  capital.innerText = data.capital;
  levelDomain.innerText = data.topLevelDomain;
  currencies.innerText = data.currencies;
  languages.innerText = data.languages;

  // console.log(data.borders)
  borderCountries.innerHTML = "";
  data.borders.forEach((element) => {
    let li = document.createElement("li");
    li.append(element);
    borderCountries.append(li);
  });
}
function limpiarDetails() {
  let imgFlag = document.getElementById("img-flag-details");
  let nameCountry = document.getElementById("name-country-detail");
  let nativeName = document.getElementById("native-name");
  let population = document.getElementById("population");
  let region = document.getElementById("region");
  let subRegion = document.getElementById("sub-region");
  let capital = document.getElementById("capital");
  let levelDomain = document.getElementById("top-level-domain");
  let currencies = document.getElementById("currencies");
  let languages = document.getElementById("languages");
  let borderCountries = document.getElementById("border-countries");

  /*---limpiamos --*/
  imgFlag.src =
    "https://extyseg.com/wp-content/uploads/2019/04/EXTYSEG-imagen-no-disponible.jpg";
  nameCountry.innerText = "-- -- --";
  nativeName.innerText = "-- -- --";
  population.innerText = "-- -- --";
  region.innerText = "-- -- --";
  subRegion.innerText = "-- -- --";
  capital.innerText = "-- -- --";
  levelDomain.innerText = "-- -- --";
  currencies.innerText = "-- -- --";
  languages.innerText = "-- -- --";
  borderCountries.innerHTML = "-- -- --";
}
/*-----------------------------------------------------------------------------------*/
/*-----------------crear eventos-----------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
const selectedOption = (e) => {
  var valueOption = e.target.children[1].value;
  var textOption = e.target.children[0].innerText;
  var valueCbo = cboFilter.children[0].children[0];
  var textCbo = cboFilter.children[0].children[1];

  valueCbo.value = valueOption;
  textCbo.innerText = textOption;

  regionGeneral = valueOption;
  queryCountries(valueOption);
};
const clickCard = (e) => {
  let id = e.target.id;
  contentCard.classList.remove("content-card-active");
  contentDetail.classList.add("detail-active");
  queryDetailCountry(id);
};
/*-----------------------------------------------------------------------------------*/
/*-------------------------------inicializar-----------------------------------------*/
/*-----------------------------------------------------------------------------------*/
listRegions();
queryCountries();
