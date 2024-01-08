// ui.js
class UI {
    constructor() {
      this.bgToggle = document.querySelector(".bgToggle");
      this.filterBody = document.querySelector(".filterbyregion");
      this.dropdown = document.querySelector(".dropdown");
      this.filtericon = document.querySelector(".filterbyregion > i");
      this.input = document.querySelector("input");
      this.bgToggleI = document.querySelector(".bgToggle > i");
      this.bgToggleP = document.querySelector(".bgToggle > p");
      this.filterRegionContainer = document.querySelector(".filter--container");
  
      this.bgToggle.addEventListener("click", this.toggleBackgroundColor.bind(this));
      this.filterBody.addEventListener("click", this.toggleDropDown.bind(this));
      this.input.addEventListener("keyup", this.searchCountries.bind(this));
    }
  
    toggleBackgroundColor() {
      document.body.classList.toggle("light-theme");
      if (document.body.classList.contains("light-theme")) {
        this.bgToggleI.classList.remove("fa-sun");
        this.bgToggleI.classList.add("fa-moon");
        this.bgToggleP.textContent = "Dark Mode";
      } else {
        this.bgToggleI.classList.remove("fa-moon");
        this.bgToggleI.classList.add("fa-sun");
        this.bgToggleP.textContent = "Light Mode";
      }
    }
  
    toggleDropDown() {
      this.dropdown.classList.toggle("hidden");
      this.filtericon.classList.toggle("rotate-[180deg]");
    }
  
    searchCountries(e) {
      const searchString = e.target.value.toLowerCase();
      const searchFilter = countries.data.filter((country) => {
        return (
          country.name.common.toLowerCase().includes(searchString) ||
          country.name.official.toLowerCase().includes(searchString)
        );
      });
      countries.ui.renderCountry(searchFilter);
  
      if (searchFilter.length === 0)
        document.querySelector(".loader-moana-input").classList.remove("hide-loader");
      else document.querySelector(".loader-moana-input").classList.add("hide-loader");
    }
  
    renderCountry(countryData) {
      let html = "";
      let index = 0;
      countryData.forEach((country) => {
        index++;
        html += `
          <div class="country country${index} w-[220px] pb-8 h-[340px] rounded cursor-pointer overflow-hidden" data-country-id="${index}">
                  <img src="${country.flags.png}" alt="${country.name.official}" class="image w-full h-1/2 rounded-tr rounded-tl"/>
                  <div class="country-info px-4 py-6">
                    <h2 class="text-lg font-semibold py-2">${country.name.common}</h2>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Population:</span> ${country.population.toLocaleString()}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Region:</span> ${country.region}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Capital:</span> ${country.capital ? country.capital : "No Capital"}
                    </p>
                  </div>
            </div>`;
      });
  
      countries.countriescontainer.innerHTML = html;
    }
  }
  
  const ui = new UI();
  