if (!customElements.get("paper-input")) {
  console.log("imported", "paper-input");
  import("https://unpkg.com/@polymer/paper-input/paper-input.js?module");
}

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

const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

export class WeatherCardEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  get _entity() {
    return this._config.entity || "";
  }

  get _rainChanceEntity() {
    return this._config.rainChanceEntity || "";
  }

  get _cloudCoverEntity() {
    return this._config.cloudCoverEntity || "";
  }

  get _snowChanceEntity() {
    return this._config.snowChanceEntity || "";
  }

  get _freezeChanceEntity() {
    return this._config.freezeChanceEntity || "";
  }


  get _alertEntity() {
    return this._config.alertEntity || "";
  }
  
  get _uvEntity() {
    return this._config.uvEntity || "";
  }

  get _rainForecastEntity() {
    return this._config.rainForecastEntity || "";
  }

  get _name() {
    return this._config.name || "";
  }

  get _icons() {
    return this._config.icons || "";
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="side-by-side">
          <paper-input
            label="Nom"
            .value="${this._name}"
            .configValue="${"name"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          <paper-input
            label="Icônes"
            .value="${this._icons}"
            .configValue="${"icons"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._entity}"
                    .configValue=${"entity"}
                    domain-filter="weather"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="Météo"
                    .value="${this._entity}"
                    .configValue="${"entity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._rainChanceEntity}"
                    .configValue=${"rainChanceEntity"}
                    domain-filter="sensor"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="Risque de pluie"
                    .value="${this._rainChanceEntity}"
                    .configValue="${"rainChanceEntity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._uvEntity}"
                    .configValue=${"uvEntity"}
                    domain-filter="sensor"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="UV"
                    .value="${this._uvEntity}"
                    .configValue="${"uvEntity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._cloudCoverEntity}"
                    .configValue=${"cloudCoverEntity"}
                    domain-filter="sensor"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="Couverture nuageuse"
                    .value="${this._cloudCoverEntity}"
                    .configValue="${"cloudCoverEntity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._freezeChanceEntity}"
                    .configValue=${"freezeChanceEntity"}
                    domain-filter="sensor"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="Risque de gel"
                    .value="${this._freezeChanceEntity}"
                    .configValue="${"freezeChanceEntity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._snowChanceEntity}"
                    .configValue=${"snowChanceEntity"}
                    domain-filter="sensor"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="Risque de neige"
                    .value="${this._snowChanceEntity}"
                    .configValue="${"snowChanceEntity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._alertEntity}"
                    .configValue=${"alertEntity"}
                    domain-filter="sensor"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="Vigilance Météo"
                    .value="${this._alertEntity}"
                    .configValue="${"alertEntity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
          ${
            customElements.get("ha-entity-picker")
              ? html`
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this._rainForecastEntity}"
                    .configValue=${"rainForecastEntity"}
                    domain-filter="sensor"
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  ></ha-entity-picker>
                `
              : html`
                  <paper-input
                    label="Pluie dans l'heure"
                    .value="${this._rainForecastEntity}"
                    .configValue="${"rainForecastEntity"}"
                    @value-changed="${this._valueChanged}"
                  ></paper-input>
                `
          }
        </div>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.value
        };
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }
}

customElements.define("meteo-france-weather-card-editor", WeatherCardEditor);
