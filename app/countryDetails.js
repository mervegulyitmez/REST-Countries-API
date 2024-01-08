// countryDetails.js
class CountryDetails {
    constructor() {
      this.outerContainer = document.querySelector(".outer-container");
      this.countryName = document.querySelector(".country-name");
      this.loaderMoana = document.querySelector(".loader-moana");
      this.bordercontainer = document.querySelector(".border-countries");
      // ... other properties
  
      this.outerContainer.addEventListener("click", this.closeDetailsPage.bind(this));
    }
  
    closeDetailsPage(e) {
      let btn = e.target.closest(".back");
      if (!btn) return;
  
      this.outerContainer.classList.add("translate-x-[100%]");
      this.outerContainer.innerHTML = "";
      this.countriescontainer.classList.remove("hidden");
    }
  
    renderDetailsPage(e) {
      let countryId = e.target.closest(".country").getAttribute("data-country-id");
  
      let id = document.querySelector(`.country${countryId}`);
      let countryName = id.lastElementChild.firstElementChild.textContent;
  
      this.outerContainer.classList.remove("translate-x-[100%]");
      this.countriescontainer.classList.add("hidden");
  
      this.fetchCountryDetails(countryName);
    }
  
    async fetchCountryDetails(countryName) {
      this.loaderMoana.classList.remove("hide-loader");
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!res.ok) throw new Error("Something went wrong, please make sure you're connected to the internet");
  
        const [data] = await res.json();
        this.detailsPage(data);
      } catch (err) {
        console.log(`Something went wrong: ${err.message}`);
      } finally {
        this.loaderMoana.classList.add("hide-loader");
      }
    }
  
    renderBorderDetails() {
      this.bordercontainer = document.querySelector(".border-countries");
  
      this.bordercontainer.addEventListener(
        "click",
        function (e) {
          if (e.target.textContent === "no border countries") return;
  
          let bordercountry = e.target.closest(".border-country");
          if (!bordercountry) return;
  
          let bordercountryvalue = bordercountry.textContent.trim();
          this.outerContainer.innerHTML = "";
          this.fetchCountryDetails(bordercountryvalue);
        }.bind(this)
      );
    }
  
    _renderBorderCountries(clickedCountryData) {
      this.borderCountries = this.data.filter(country => country.borders?.includes(clickedCountryData.cca3));
    }
  
    detailsPage(data) {
      const [lat, lng] = data?.latlng ?? [];
      const [currency] = Object.values(data?.currencies ?? {});
      const languages = Object.values(data?.languages ?? {});
      const [nativeName] = Object.values(data?.name?.nativeName ?? {});
      this._renderBorderCountries(data);
      const borderCountriesName = this.borderCountries?.map(countryData => countryData?.name?.common);
  
      let html = `        
      <section class="detailsPage mx-8 lg:container max-w-full h-auto flex-col items-start justify-start relative flex">
            <button class="back px-8 text-sm py-2 rounded my-8">
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <div class="country-full-details flex justify-between flex-col xl:flex-row items-start xl:items-center w-full gap-[3rem]">
              <img src="${data.flags.png}" alt="${data.name.official}" class="w-[300px] h-[200px] md:w-[500px] md:h-[250px] lg:h-[300px]">
  
              <div class="detail-container md:flex md:gap-[0.3rem] flex-col lg:gap-[1rem]">
                <h2 class="font-bold text-lg md:text-xl">${data.name.common}</h2>
                <div class="detail my-4 md:flex items-start gap-[3rem]">
                  <div class="detail1">
                    <p class="text-sm py-1">
                      <span class="font-semibold">Native Name:</span> ${nativeName ? nativeName.official : data.name.official}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Population:</span> ${data.population.toLocaleString()}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Region:</span> ${data.region}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Sub Region:</span> ${data.subregion ? data.subregion : "No subregion"}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Capital:</span> ${data.capital ? data.capital : "No capital"}
                    </p>
                  </div>
  
                  <div class="detail2 my-6 md:my-0">
                    <p class="text-sm py-1">
                      <span class="font-semibold">Top Level Domain:</span> ${data.tld[0]}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Currencies:</span> ${currency ? currency.name : "No currency used"}
                    </p>
                    <p class="text-sm py-1">
                      <span class="font-semibold">Languages:</span> ${languages.length ? languages.join(", ") : "No languages"}
                    </p>
                  </div>
                </div>
  
                <div class="border-countries--container md:flex gap-[1rem]">
                  <h2 class="font-bold my-3">Border Countries:</h2>
                  <div class="border-countries flex gap-3 items-center flex-wrap">
                  ${
                    borderCountriesName.length
                      ? borderCountriesName
                          .map(
                            countryName => `<div class="border-country text-center px-4 py-2 text-sm rounded cursor-pointer">
                      ${countryName}
                    </div>`
                          )
                          .join("")
                      : `<div class="border-country text-center px-4 py-2 text-sm rounded cursor-pointer">no border countries</div>`
                  }
                  </div>
                </div>
              </div>
            </div>
          </section>`;
  
      this.outerContainer.innerHTML = html;
  
      this.createMapElement();
      this.renderBorderDetails();
      this._getPosition();
  
      let mapReference = this.countryLocation.id;
      this.renderCountriesLocation(mapReference, lat, lng, "Location Pinned!");
      this.countryName.textContent = `${data.name.common}'s Location`;
    }
    // ... other country details functionalities
  }
  
  const countryDetails = new CountryDetails();
  