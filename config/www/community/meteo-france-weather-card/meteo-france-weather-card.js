const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

const weatherIconsDay = {
  clear: "day",
  "clear-night": "day",
  "nuit claire": "day",
  cloudy: "cloudy",
  fog: "cloudy",
  hail: "rainy-7",
  lightning: "thunder",
  "lightning-rainy": "thunder",
  partlycloudy: "cloudy-day-3",
  pouring: "rainy-6",
  rainy: "rainy-5",
  snowy: "snowy-6",
  "snowy-rainy": "rainy-7",
  sunny: "day",
  windy: "cloudy",
  "windy-variant": "cloudy-day-3",
  exceptional: "!!"
};

const weatherIconsNight = {
  ...weatherIconsDay,
  clear: "night",
  "clear-night": "night",
  sunny: "night",
  "nuit claire": "night",
  partlycloudy: "cloudy-night-3",
  "windy-variant": "cloudy-night-3"
};

const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

function getWindDirectionRotation(direction) {
  let windDirections = [
    "S",//0
    "SSO",
    "SO",
    "OSO",
    "O",//90
    "ONO",
    "NO",
    "NNO",
    "N",//180
    "NNE",
    "NE",
    "ENE",
    "E",//270
    "ESE",
    "SE",
    "SSE"
  ];
  
  let index = windDirections.indexOf(direction);
  return (index * 22.5);
}

function getVigilance(color, alertEntity) {
  let phenomenaIcons = {
    "Vent violent": "mdi:weather-windy",
    "Pluie-inondation": "mdi:weather-pouring",
    "Orages": "mdi:weather-lightning",
    "Inondation": "mdi:home-flood",
    "Neige-verglas": "mdi:weather-snowy-heavy",
    "Canicule": "mdi:weather-sunny-alert",
    "Grand-froid": "mdi:snowflake",
    "Avalanches": "mdi:image-filter-hdr",
    "Vagues-submersion": "mdi:waves"
  };
  
  if(alertEntity == undefined) {
    return [];
  }
  
  let phenomenaList = [];
  for (const [currentPhenomenon, currentPhenomenonColor] of Object.entries(alertEntity.attributes)) {
    if(currentPhenomenonColor == color) {
      phenomenaList.push([currentPhenomenon, phenomenaIcons[currentPhenomenon]]);
    }
  }
  
  return phenomenaList;
}

function getRainForecast(rainForecastEntity) {
  
  let rainForecastColors = ["rgba(95,155,234,0.1)", "rgba(95,155,234,0.4)", "rgba(95,155,234,0.7)", "rgba(95,155,234,1)"];
  let rainForecastTexts = ["Pas de pluie", "Pluie faible", "Pluie modérée", "Pluie forte"];
  
  let rainForecastList = [];
  for (let [time, value] of Object.entries(rainForecastEntity.attributes)) {
    time = time.split("_")[2]
    if(time != undefined && time.match(/[0-9]*min/g)) {
      time = time.substring(0, time.length-3);
      rainForecastList.push([time, rainForecastColors[value-1], rainForecastTexts[value-1]]);
    }
  }
  
  return rainForecastList;
}

function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("_config")) {
    return true;
  }

  const oldHass = changedProps.get("hass");
  if (oldHass) {
    return (
      oldHass.states[element._config.entity] !==
        element.hass.states[element._config.entity] ||
      oldHass.states["sun.sun"] !== element.hass.states["sun.sun"]
    );
  }

  return true;
}

class WeatherCard extends LitElement {
  static get properties() {
    return {
      _config: {},
      hass: {}
    };
  }

  static async getConfigElement() {
    await import("./meteo-france-weather-card-editor.js");
    return document.createElement("meteo-france-weather-card-editor");
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define a weather entity");
    }
    this._config = config;
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];
    const rainChanceObj = this.hass.states[this._config.rainChanceEntity];
    const thunderChanceObj = this.hass.states[this._config.thunderChanceEntity];
    const snowChanceObj = this.hass.states[this._config.snowChanceEntity];
    const freezeChanceObj = this.hass.states[this._config.freezeChanceEntity];
    const alertObj = this.hass.states[this._config.alertEntity];
    const rainForecastObj = this.hass.states[this._config.rainForecastEntity];
    const uvObj = this.hass.states[this._config.uvEntity];

    if (!stateObj) {
      return html`
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const lang = this.hass.selectedLanguage || this.hass.language;

    const next_rising = new Date(
      this.hass.states["sun.sun"].attributes.next_rising
    );
    const next_setting = new Date(
      this.hass.states["sun.sun"].attributes.next_setting
    );

    return html`
      ${this.renderStyle()}
      <ha-card @click="${this._handleClick}">
        <span
          class="icon bigger"
          style="background: none, url(${
            this.getWeatherIcon(
              stateObj.state.toLowerCase(),
              this.hass.states["sun.sun"].state
            )
          }) no-repeat; background-size: contain;"
          >${stateObj.state}
        </span>
        ${
          this._config.name
            ? html`
                <span class="title"> ${this._config.name} </span>
              `
            : ""
        }
        <span class="temp"
          >${
            this.getUnit("temperature") == "°F"
              ? Math.round(stateObj.attributes.temperature)
              : stateObj.attributes.temperature
          }</span
        >
        <span class="tempc"> ${this.getUnit("temperature")}</span>
        <span>
          <ul class="variations">
            <li>
              ${
                rainChanceObj != undefined
                ? html`
                  <span title="${rainChanceObj.attributes.friendly_name}" class="ha-icon"
                    ><ha-icon icon="${rainChanceObj.attributes.icon === undefined ? 'mdi:weather-rainy' : rainChanceObj.attributes.icon}"></ha-icon
                  ></span>
                  ${rainChanceObj.state}<span class="unit"> ${rainChanceObj.attributes.unit_of_measurement} </span>
                  <br />
                `
                : html`<div style="height: 24px;" ></div>`
              }
              ${
                thunderChanceObj != undefined
                ? html`
                  <span title="${thunderChanceObj.attributes.friendly_name}" class="ha-icon"
                    ><ha-icon icon="${thunderChanceObj.attributes.icon === undefined ? 'mdi:weather-lightning' : thunderChanceObj.attributes.icon}"></ha-icon
                  ></span>
                  ${thunderChanceObj.state}<span class="unit"> ${thunderChanceObj.attributes.unit_of_measurement} </span>
                  <br />
                `
                : html`<div style="height: 24px;" ></div>`
              }
              ${
                snowChanceObj != undefined
                ? html`
                  <span title="${snowChanceObj.attributes.friendly_name}" class="ha-icon"
                    ><ha-icon icon="${snowChanceObj.attributes.icon === undefined ? 'mdi:weather-snowy' : snowChanceObj.attributes.icon}"></ha-icon
                  ></span>
                  ${snowChanceObj.state}<span class="unit"> ${snowChanceObj.attributes.unit_of_measurement} </span>
                  <br />
                `
                : html`<div style="height: 24px;" ></div>`
              }
              ${
                freezeChanceObj != undefined
                ? html`
                  <span title="${freezeChanceObj.attributes.friendly_name}" class="ha-icon"
                    ><ha-icon icon="${freezeChanceObj.attributes.icon === undefined ? 'mdi:snowflake' : freezeChanceObj.attributes.icon}"></ha-icon
                  ></span>
                  ${freezeChanceObj.state}<span class="unit"> ${freezeChanceObj.attributes.unit_of_measurement} </span>
                  <br />
                `
                : html`<div style="height: 24px;" ></div>`
              }
              <br />
              <span class="ha-icon"
                ><ha-icon icon="mdi:weather-sunset-up"></ha-icon
              ></span>
              ${next_rising.toLocaleTimeString()}
            </li>
            <li>
              <span class="ha-icon"
                ><ha-icon icon="mdi:weather-windy"></ha-icon
              ></span>
              ${stateObj.attributes.wind_speed}<span class="unit">
                ${this.getUnit("length")}/h
              </span>
              <br />
              ${
                stateObj.attributes.wind_speed != 0
                ? html`
                  <span class="ha-icon"
                    ><ha-icon icon="mdi:navigation" style="transform: rotate(${getWindDirectionRotation(stateObj.attributes.wind_bearing)}deg);"></ha-icon
                  ></span>
                `
                : html`<div style="height: 24px;" ></div>`
              }
              ${
                stateObj.attributes.wind_bearing != undefined
                ? html`
                  ${stateObj.attributes.wind_bearing}
                  <br />
                  <div style="height: 24px;" ></div>
                `
                : html`<div style="height: 24px;" ></div>`
              }
              ${
                uvObj != undefined
                ? html`
                  <span title="${uvObj.attributes.friendly_name}" class="ha-icon"
                    ><ha-icon icon="${uvObj.attributes.icon === undefined ? 'mdi:sunglasses' : uvObj.attributes.icon}"></ha-icon
                  ></span>
                  UV ${uvObj.state}
                  <br />
                `
                : html`<div style="height: 24px;" ></div>`
              }
              <br />
              <span class="ha-icon"
                ><ha-icon icon="mdi:weather-sunset-down"></ha-icon
              ></span>
              ${next_setting.toLocaleTimeString()}
            </li>
          </ul>
        </span>
        ${
          rainForecastObj != undefined
          ? html`
            <span class="pluie">
              ${
                  rainForecastObj.state != "unknown"
                  ? html`
                      ${
                        getRainForecast(rainForecastObj).map(
                          forecast => html`
                            <span class="pluie-element" style="background-color: ${forecast[1]}" title="${forecast[2] + " " + ((forecast[0] == 0) ? "actuellement" : "dans " + forecast[0] + " min")}">
                            </span>
                          `
                        )
                      }
                      
                    `
                  : html`<span title='Données indisponibles' class='pluie-element unknown'></span>`
              }
            </span>
          `
          : ""
        }
        ${
          getVigilance("Jaune", alertObj).length > 0
            ? html`
                <span class="vigilance jaune">
                  <ha-icon icon="mdi:alert"></ha-icon>Vigilance jaune en cours
                  <div class="vigilance-list">
                    ${
                      getVigilance("Jaune", alertObj).map(
                        phenomenon => html`
                          <ha-icon icon="${phenomenon[1]}" title="${phenomenon[0]}"></ha-icon>
                        `
                      )
                    }
                  </div>
                </span>
              `
            : ""
        }
        ${
          getVigilance("Orange", alertObj).length > 0
            ? html`
                <span class="vigilance orange">
                  <ha-icon icon="mdi:alert"></ha-icon>Vigilance orange en cours
                  <div class="vigilance-list">
                    ${
                      getVigilance("Orange", alertObj).map(
                        phenomenon => html`
                          <ha-icon icon="${phenomenon[1]}" title="${phenomenon[0]}"></ha-icon>
                        `
                      )
                    }
                  </div>
                </span>
              `
            : ""
        }
        ${
          getVigilance("Rouge", alertObj).length > 0
            ? html`
                <span class="vigilance rouge">
                  <ha-icon icon="mdi:alert"></ha-icon>Vigilance rouge en cours
                  <div class="vigilance-list">
                    ${
                      getVigilance("Rouge", alertObj).map(
                        phenomenon => html`
                          <ha-icon icon="${phenomenon[1]}" title="${phenomenon[0]}"></ha-icon>
                        `
                      )
                    }
                  </div>
                </span>
              `
            : ""
        }
        ${
          stateObj.attributes.forecast &&
          stateObj.attributes.forecast.length > 0
            ? html`
                <div class="forecast clear">
                  ${
                    stateObj.attributes.forecast.slice(0, 5).map(
                      daily => html`
                        <div class="day">
                          <span class="dayname"
                            >${
                              new Date(daily.datetime).toLocaleDateString(
                                lang,
                                {
                                  weekday: "short"
                                }
                              )
                            }</span
                          >
                          <br /><i
                            class="icon"
                            style="background: none, url(${
                              this.getWeatherIcon(daily.condition.toLowerCase())
                            }) no-repeat; background-size: contain;"
                          ></i>
                          <br /><span class="highTemp"
                            >${daily.temperature}${
                              this.getUnit("temperature")
                            }</span
                          >
                          ${
                            typeof daily.templow !== 'undefined'
                              ? html`
                                  <br /><span class="lowTemp"
                                    >${daily.templow}${
                                      this.getUnit("temperature")
                                    }</span
                                  >
                                `
                              : ""
                          }
                        </div>
                      `
                    )
                  }
                </div>
              `
            : ""
        }
      </ha-card>
    `;
  }

  getWeatherIcon(condition, sun) {
    let icon = `${
      this._config.icons
        ? this._config.icons
        : "https://cdn.jsdelivr.net/gh/bramkragten/custom-ui@master/weather-card/icons/animated/"
    }${
      sun && sun == "below_horizon"
        ? weatherIconsNight[condition]
        : weatherIconsDay[condition]
    }.svg`;
    return icon;
  }

  getUnit(measure) {
    const lengthUnit = this.hass.config.unit_system.length;
    switch (measure) {
      case "air_pressure":
        return lengthUnit === "km" ? "hPa" : "inHg";
      case "length":
        return lengthUnit;
      case "precipitation":
        return lengthUnit === "km" ? "mm" : "in";
      default:
        return this.hass.config.unit_system[measure] || "";
    }
  }

  _handleClick() {
    fireEvent(this, "hass-more-info", { entityId: this._config.entity });
  }

  getCardSize() {
    return 3;
  }

  renderStyle() {
    return html`
      <style>
        ha-card {
          cursor: pointer;
          margin: auto;
          padding-top: 2.5em;
          padding-bottom: 1.3em;
          padding-left: 1em;
          padding-right: 1em;
          position: relative;
        }
        
        .pluie {
          display: block;
          height: 15px;
          border-radius: 5px;
          padding: 0px;
          font-weight: 600;
          color: var(--primary-text-color);
          margin: 0px;
          margin: 10px 2px;
        }
        
        .pluie-element {
          display: block;
          height: 100%;
          float: left;
          width: calc(100% / 12);
          background-color: #e3f2fd;
        }

        .pluie-element:not(:last-child) {
          border-right: 1px solid var(
              --lovelace-background,
              var(--primary-background-color)
          );
          width: calc(100% / 12 - 1px);
        }

        .pluie-element.unknown {
          display: block;
          height: 100%;
          width: 100%;
          background-color: #9e9e9e;
          border: 0px;
        }
        
        .pluie-element:first-child {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        
        .pluie-element:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .clear {
          clear: both;
        }

        .ha-icon {
          height: 18px;
          margin-right: 5px;
          color: var(--paper-item-icon-color);
        }
        
        .vigilance {
          display: block;
          border-radius: 5px;
          padding: 5px 10px;
          font-weight: 600;
          color: var(--primary-text-color);
          margin: 2px;
        }
        
        .vigilance ha-icon {
          margin: 0px 10px 0px 0px;
        }
        
        .vigilance-list ha-icon {
          margin: 0px;
        }
        
        .vigilance-list {
          float: right;
        }
        
        .vigilance.jaune {
          background-color: rgba(255,235,0,0.5);
        }
        
        .vigilance.orange {
          background-color: rgba(255,152,0,0.5);
        }
        
        .vigilance.rouge {
          background-color: rgba(244,67,54,0.5);
        }

        .title {
          position: absolute;
          left: 3em;
          top: 0.9em;
          font-weight: 300;
          font-size: 3em;
          color: var(--primary-text-color);
        }
        .temp {
          font-weight: 300;
          font-size: 4em;
          color: var(--primary-text-color);
          position: absolute;
          right: 1em;
          top: 0.7em;
        }

        .tempc {
          font-weight: 300;
          font-size: 1.5em;
          vertical-align: super;
          color: var(--primary-text-color);
          position: absolute;
          right: 1em;
          margin-top: -14px;
          margin-right: 7px;
        }

        .variations {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          font-weight: 300;
          color: var(--primary-text-color);
          list-style: none;
          margin-top: 4.5em;
          padding: 0;
        }

        .variations li {
          flex-basis: auto;
        }

        .variations li:first-child {
          padding-left: 1em;
        }

        .variations li:last-child {
          padding-right: 1em;
        }

        .unit {
          font-size: 0.8em;
        }

        .forecast {
          width: 100%;
          margin: 0 auto;
          height: 9em;
        }

        .day {
          display: block;
          width: 20%;
          float: left;
          text-align: center;
          color: var(--primary-text-color);
          border-right: 0.1em solid #d9d9d9;
          line-height: 2;
          box-sizing: border-box;
        }

        .dayname {
          text-transform: uppercase;
        }

        .forecast .day:first-child {
          margin-left: 0;
        }

        .forecast .day:nth-last-child(1) {
          border-right: none;
          margin-right: 0;
        }

        .highTemp {
          font-weight: bold;
        }

        .lowTemp {
          color: var(--secondary-text-color);
        }

        .icon.bigger {
          width: 10em;
          height: 10em;
          margin-top: -4em;
          position: absolute;
          left: 0em;
        }

        .icon {
          width: 50px;
          height: 50px;
          margin-right: 5px;
          display: inline-block;
          vertical-align: middle;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          text-indent: -9999px;
        }

        .weather {
          font-weight: 300;
          font-size: 1.5em;
          color: var(--primary-text-color);
          text-align: left;
          position: absolute;
          top: -0.5em;
          left: 6em;
          word-wrap: break-word;
          width: 30%;
        }
      </style>
    `;
  }
}
customElements.define("meteo-france-weather-card", WeatherCard);
