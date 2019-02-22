import logging
from homeassistant.helpers.entity import Entity

import voluptuous as vol
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.const import (CONF_NAME, CONF_RESOURCES, ATTR_ATTRIBUTION)
import homeassistant.helpers.config_validation as cv

CONF_ATTRIBUTION = "Powered by Météo France"
CONF_DEPARTMENT = 'department'
DEFAULT_NAME = 'Vigilance Météo'
ATTR_DEPARTMENT = 'Département surveillé'


# key: ['sensor name', 'icon']
SENSOR_TYPES = {
    'alert_color': ["Vigilance Météo", None],
    'synthesys_html': ["Synthèse du bulletin", None],
    'synthesys_txt': ["Synthèse du bulletin", None],
    'update_date': ["Dernière mise à jour", None],
    'details_link': ["Détails du bulletin", None],
    'alerts_list': ["Liste des alertes", None]
}

# TODO: improve check CONF_DEPARTMENT
PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_RESOURCES):
        vol.All(cv.ensure_list, [vol.In(SENSOR_TYPES)]),
    vol.Required(CONF_DEPARTMENT): cv.string,
    vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
})

_LOGGER = logging.getLogger(__name__)

REQUIREMENTS = ['vigilancemeteo==1.2.0']

# TODO: gestion des erreurs
# TODO: frequence de raffraichissement


def setup_platform(hass, config, add_devices, discovery_info=None):
    """Setup the sensor platform."""
    from vigilancemeteo import ZoneAlerte

    _LOGGER.debug("Department watched: %s", config.get(CONF_DEPARTMENT))
    watchedDepartment = ZoneAlerte(config.get(CONF_DEPARTMENT))

    sensors = []
    for variable in config[CONF_RESOURCES]:
        sensors.append(VigilanceMeteoSensor(watchedDepartment, variable))

    add_devices(sensors)


class VigilanceMeteoSensor(Entity):
    """Representation of a Sensor."""

    def __init__(self, watchedDepartment, sensor_type):
        """Initialize the sensor."""
        self._state = None
        self._watchedDepartment = watchedDepartment
        self.type = sensor_type
        self._name = SENSOR_TYPES[sensor_type][0]


    @property
    def name(self):
        """Return the name of the sensor."""
        return self._name

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement."""
        return None

    @property
    def icon(self):
        """Icon to use in the frontend, if any."""
        return SENSOR_TYPES[self.type][1]

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return {
            ATTR_ATTRIBUTION: CONF_ATTRIBUTION,
            ATTR_DEPARTMENT: self._watchedDepartment.departement,
        }

    def update(self):
        """Fetch new state data for the sensor.

        This is the only method that should fetch new data for Home Assistant.
        """
        self._watchedDepartment.miseAJourEtat()
        if self.type == 'alert_color':
            self._state = self._watchedDepartment.syntheseCouleur
        elif self.type == 'synthesys_html':
            self._state = self._watchedDepartment.messageDeSynthese('html')
        elif self.type == 'synthesys_text':
            self._state = self._watchedDepartment.messageDeSynthese('text')
        elif self.type == 'update_date':
            self._state = self._watchedDepartment.dateMiseAJour
        elif self.type == 'details_link':
            self._state = self._watchedDepartment.urlPourEnSavoirPlus
        elif self.type == 'alerts_list':
            self._state = self._watchedDepartment.listeAlertes
