//import 'https://unpkg.com/@google-web-components/google-chart/google-chart.js?module';

class LinkyCard extends HTMLElement {
    set hass(hass) {
      if (!this.content) {
        const card = document.createElement('ha-card');
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = '/local/linky-card.css?v=31';
        card.appendChild(link);
        this.content = document.createElement('div');
        this.content.className = 'card';
        card.appendChild(this.content);
        this.appendChild(card);
      }
      
      const entityId = this.config.entity;
      const state = hass.states[entityId];
      const stateStr = state ? state.state : 'unavailable';
      const attributes = state.attributes;
      
      this.content.innerHTML = `
        <div class="hp-hc-block">
          <google-chart
            type='pie'
            options='{"title": "${this.config.title}", "pieHole": 0.6}'
            cols='[{"label":"Heures", "type":"string"}, {"label":"Consomation", "type":"number"}]'
            rows='[["Pleines", ${Number.parseFloat(attributes.peak_hours).toFixed(1)}],["Creuse", ${Number.parseFloat(attributes.offpeak_hours).toFixed(1)}]]'>
          </google-chart>
          <span class="conso-hc">${Number.parseFloat(attributes.offpeak_hours).toFixed(1)}</span><span class="conso-unit-hc"> ${attributes.unit_of_measurement} <span class="more-unit">(en HC)</span></span><br />
          <span class="conso-hp">${Number.parseFloat(attributes.peak_hours).toFixed(1)}</span><span class="conso-unit-hp"> ${attributes.unit_of_measurement} <span class="more-unit">(en HP)</span></span>
        </div>
        <div class="cout-block">
          <span class="cout" title="Coût journalier">${Number.parseFloat(attributes.daily_cost).toFixed(2)}</span><span class="cout-unit"> €</span><!--FIXME: From yaml config or glabal setting--!>
        </div>
        <div class="clear"></div>
        <span>
          <ul class="variations-linky right">
              <li><span class="ha-icon"><ha-icon icon="mdi:flash"></ha-icon></span>${Math.round(attributes.peak_offpeak_percent)}<span class="unit"> % HP</span></li>
          </ul>
          <ul class="variations-linky">
              <li><span class="ha-icon"><ha-icon icon="mdi:arrow-right" style="transform: rotate(${(attributes.monthly_evolution < 0) ? '45' : ((attributes.monthly_evolution == 0) ? "0" : "-45")}deg)"></ha-icon></span>${Math.round(attributes.monthly_evolution)}<span class="unit"> %</span><span class="previous-month">par rapport à ${new Date((new Date().getTime()) - 365*60*60*24*1000).toLocaleDateString('fr-FR', {month: "long", year: "numeric"})}</span></li>
          </ul>
        </span>
        <div class="week-history clear">
            ${Object.keys(attributes.daily.slice(2, 7)).map((day, index) => `
            <div class="day">
                <span class="dayname">${new Date((new Date().getTime()) - day*60*60*24*1000).toLocaleDateString('fr-FR', {weekday: "long"}).split(' ')[0]}</span>
                <br><span class="cons-val">${Number.parseFloat(attributes.daily[day]).toFixed(1)} ${attributes.unit_of_measurement}</span>
            </div>`).join('')}
        </div>`;
    }
  
    setConfig(config) {
      if (!config.entity) {
        throw new Error('You need to define an entity');
      }
      this.config = config;
    }
  
    // @TODO: This requires more intelligent logic
    getCardSize() {
      return 3;
    }
  }
  
  customElements.define('linky-card', LinkyCard);

