// map.js
class Map {
    #map;
    #mapZoomLevel = 5;
  
    constructor() {
      // ... other properties
    }
  
    createMapElement() {
      const mapContainer = document.createElement("div");
      const countryLocationContainer = document.createElement("div");
      this.countryName = document.createElement("h2");
      this.countryLocation = document.createElement("div");
  
      const countryInfo = document.createElement("div");
      const locationTxt = document.createElement("h2");
      const arrowDown = document.createElement("i");
      const arrowRight = document.createElement("i");
      this.myLocation = document.createElement("div");
  
      mapContainer.classList.add("map--container", "mx-8", "flex", "max-w-full", "flex-col", "items-end", "justify-center", "gap-[2rem]", "lg:container", "xl:flex-row", "xl:justify-between", "mb-8");
      countryLocationContainer.classList.add("country--location--container", "flex", "flex-col", "items-center", "justify-center");
      this.countryName.classList.add("country-name", "my-3", "text-center", "text-3xl", "font-bold");
      this.countryLocation.classList.add("country--location", "h-[200px]", "w-[300px]", "md:h-[250px]", "md:w-[500px]", "lg:h-[300px]");
  
      countryInfo.classList.add("country-info", "currentLocation", "flex", "flex-col", "items-center", "justify-between", "text-center", "md:my-auto", "mx-auto");
      locationTxt.classList.add("text-1xl", "font-bold");
      arrowDown.classList.add("fa-solid", "fa-arrow-down", "fa-2x", "arrow", "sm:block", "lg:hidden");
      arrowRight.classList.add("fa-solid", "fa-arrow-right", "fa-2x", "arrow", "sm:hidden", "lg:block");
      this.myLocation.classList.add("h-[200px]", "w-[300px]", "md:h-[250px]", "md:w-[500px]", "lg:h-[300px]");
  
      mapContainer.appendChild(countryLocationContainer);
      mapContainer.appendChild(countryInfo);
      mapContainer.appendChild(this.myLocation);
  
      this.countryLocation.id = "map";
      this.myLocation.id = "map2";
  
      locationTxt.textContent = "Your Current Location";
  
      countryLocationContainer.appendChild(this.countryName);
      countryLocationContainer.appendChild(this.countryLocation);
  
      countryInfo.appendChild(locationTxt);
      countryInfo.appendChild(arrowDown);
      countryInfo.appendChild(arrowRight);
  
      this.outerContainer.appendChild(mapContainer);
    }
  
    renderCountriesLocation(id, lat, lng, popupMsg) {
      const idEl = document.getElementById(id);
      this.#map = L.map(idEl).setView([lat, lng], this.#mapZoomLevel);
  
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);
  
      L.marker([lat, lng]).addTo(this.#map).bindPopup(popupMsg).openPopup();
    }
    // ... other map-related methods
  }
  
  const map = new Map();
  