import logging
from datetime import timedelta
import voluptuous as vol

from homeassistant.helpers.entity import Entity
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.const import (STATE_UNKNOWN, CONF_NAME, CONF_PASSWORD, CONF_USERNAME, CONF_MONITORED_VARIABLES, ATTR_FRIENDLY_NAME)
from homeassistant.util import Throttle
import homeassistant.helpers.config_validation as cv

REQUIREMENTS = ['pylinky==0.1.5']

_LOGGER = logging.getLogger(__name__)

KILOWATT_HOUR = 'kWh'  # type: str

DEFAULT_NAME = 'Linky'

UPDATE_INTERVAL = 'update_interval'
MIN_TIME_BETWEEN_UPDATES = timedelta(hours=1)

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
	vol.Required(CONF_USERNAME): cv.string,
	vol.Required(CONF_PASSWORD): cv.string,
	vol.Optional(UPDATE_INTERVAL, default=timedelta(seconds=1800)):
		vol.All(cv.time_period, cv.positive_timedelta),
	vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
})



class LinkySensorConfig(object):
	"""Helper for defining sensor configurations."""

	def __init__(self, feature, index, icon="mdi:flash", unit_of_measurement=KILOWATT_HOUR):
		self.friendly_name = lambda lk: lk.data[feature][index]["time"] if len(lk.data[feature]) > -index  else None
		self.value = lambda lk: lk.data[feature][index]["conso"] if len(lk.data[feature]) > -index else None
		self.unit_of_measurement = unit_of_measurement
		self.icon = icon


SENSOR_TYPES = {
    'halfhourly_00_00_consumption': LinkySensorConfig("hourly",0),
	'halfhourly_00_30_consumption': LinkySensorConfig("hourly",1),
	'halfhourly_01_00_consumption': LinkySensorConfig("hourly",2),
	'halfhourly_01_30_consumption': LinkySensorConfig("hourly",3),
	'halfhourly_02_00_consumption': LinkySensorConfig("hourly",4),
	'halfhourly_02_30_consumption': LinkySensorConfig("hourly",5),
	'halfhourly_03_00_consumption': LinkySensorConfig("hourly",6),
	'halfhourly_03_30_consumption': LinkySensorConfig("hourly",7),
	'halfhourly_04_00_consumption': LinkySensorConfig("hourly",8),
	'halfhourly_04_30_consumption': LinkySensorConfig("hourly",9),
	'halfhourly_05_00_consumption': LinkySensorConfig("hourly",10),
	'halfhourly_05_30_consumption': LinkySensorConfig("hourly",11),
	'halfhourly_06_00_consumption': LinkySensorConfig("hourly",12),
	'halfhourly_06_30_consumption': LinkySensorConfig("hourly",13),
	'halfhourly_07_00_consumption': LinkySensorConfig("hourly",14),
	'halfhourly_07_30_consumption': LinkySensorConfig("hourly",15),
	'halfhourly_08_00_consumption': LinkySensorConfig("hourly",16),
	'halfhourly_08_30_consumption': LinkySensorConfig("hourly",17),
	'halfhourly_09_00_consumption': LinkySensorConfig("hourly",18),
	'halfhourly_09_30_consumption': LinkySensorConfig("hourly",19),
	'halfhourly_10_00_consumption': LinkySensorConfig("hourly",20),
	'halfhourly_10_30_consumption': LinkySensorConfig("hourly",21),
	'halfhourly_11_00_consumption': LinkySensorConfig("hourly",22),
	'halfhourly_11_30_consumption': LinkySensorConfig("hourly",23),
	'halfhourly_12_00_consumption': LinkySensorConfig("hourly",24),
	'halfhourly_12_30_consumption': LinkySensorConfig("hourly",25),
	'halfhourly_13_00_consumption': LinkySensorConfig("hourly",26),
	'halfhourly_13_30_consumption': LinkySensorConfig("hourly",27),
	'halfhourly_14_00_consumption': LinkySensorConfig("hourly",28),
	'halfhourly_14_30_consumption': LinkySensorConfig("hourly",29),
	'halfhourly_15_00_consumption': LinkySensorConfig("hourly",30),
	'halfhourly_15_30_consumption': LinkySensorConfig("hourly",31),
	'halfhourly_16_00_consumption': LinkySensorConfig("hourly",32),
	'halfhourly_16_30_consumption': LinkySensorConfig("hourly",33),
	'halfhourly_17_00_consumption': LinkySensorConfig("hourly",34),
	'halfhourly_17_30_consumption': LinkySensorConfig("hourly",35),
	'halfhourly_18_00_consumption': LinkySensorConfig("hourly",36),
	'halfhourly_18_30_consumption': LinkySensorConfig("hourly",37),
	'halfhourly_19_00_consumption': LinkySensorConfig("hourly",38),
	'halfhourly_19_30_consumption': LinkySensorConfig("hourly",39),
	'halfhourly_20_00_consumption': LinkySensorConfig("hourly",40),
	'halfhourly_20_30_consumption': LinkySensorConfig("hourly",41),
	'halfhourly_21_00_consumption': LinkySensorConfig("hourly",42),
	'halfhourly_21_30_consumption': LinkySensorConfig("hourly",43),
	'halfhourly_22_00_consumption': LinkySensorConfig("hourly",44),
	'halfhourly_22_30_consumption': LinkySensorConfig("hourly",45),
	'halfhourly_23_00_consumption': LinkySensorConfig("hourly",46),
	'halfhourly_23_30_consumption': LinkySensorConfig("hourly",47),
	'daily_1d_consumption': LinkySensorConfig("daily",-2),
	'daily_2d_consumption': LinkySensorConfig("daily",-3),
	'daily_3d_consumption': LinkySensorConfig("daily",-4),
	'daily_4d_consumption': LinkySensorConfig("daily",-5),
	'daily_5d_consumption': LinkySensorConfig("daily",-6),
	'daily_6d_consumption': LinkySensorConfig("daily",-7),
	'daily_7d_consumption': LinkySensorConfig("daily",-8),
	'daily_8d_consumption': LinkySensorConfig("daily",-9),
	'daily_9d_consumption': LinkySensorConfig("daily",-10),
	'daily_10d_consumption': LinkySensorConfig("daily",-11),
	'daily_11d_consumption': LinkySensorConfig("daily",-12),
	'daily_12d_consumption': LinkySensorConfig("daily",-13),
	'daily_13d_consumption': LinkySensorConfig("daily",-14),
	'daily_14d_consumption': LinkySensorConfig("daily",-15),
	'daily_15d_consumption': LinkySensorConfig("daily",-16),
	'daily_16d_consumption': LinkySensorConfig("daily",-17),
	'daily_17d_consumption': LinkySensorConfig("daily",-18),
	'daily_18d_consumption': LinkySensorConfig("daily",-19),
	'daily_19d_consumption': LinkySensorConfig("daily",-20),
	'daily_20d_consumption': LinkySensorConfig("daily",-21),
	'daily_21d_consumption': LinkySensorConfig("daily",-22),
	'daily_22d_consumption': LinkySensorConfig("daily",-23),
	'daily_23d_consumption': LinkySensorConfig("daily",-24),
	'daily_24d_consumption': LinkySensorConfig("daily",-25),
	'daily_25d_consumption': LinkySensorConfig("daily",-26),
	'daily_26d_consumption': LinkySensorConfig("daily",-27),
	'daily_27d_consumption': LinkySensorConfig("daily",-28),
	'daily_28d_consumption': LinkySensorConfig("daily",-29),
	'daily_29d_consumption': LinkySensorConfig("daily",-30),
	'daily_30d_consumption': LinkySensorConfig("daily",-31),
	'daily_31d_consumption': LinkySensorConfig("daily",-32),
	'monthly_current_consumption': LinkySensorConfig("monthly",-1),
	'monthly_1m_consumption': LinkySensorConfig("monthly",-2),
	'monthly_2m_consumption': LinkySensorConfig("monthly",-3),
	'monthly_3m_consumption': LinkySensorConfig("monthly",-4),
	'monthly_4m_consumption': LinkySensorConfig("monthly",-5),
	'monthly_5m_consumption': LinkySensorConfig("monthly",-6),
	'monthly_6m_consumption': LinkySensorConfig("monthly",-7),
	'monthly_7m_consumption': LinkySensorConfig("monthly",-8),
	'monthly_8m_consumption': LinkySensorConfig("monthly",-9),
	'monthly_9m_consumption': LinkySensorConfig("monthly",-10),
	'monthly_10m_consumption': LinkySensorConfig("monthly",-11),
	'monthly_11m_consumption': LinkySensorConfig("monthly",-12),
	'yearly_current_consumption': LinkySensorConfig("yearly",-1),
	'yearly_1y_consumption': LinkySensorConfig("yearly",-1),
	'yearly_2y_consumption': LinkySensorConfig("yearly",-2),
	'yearly_3y_consumption': LinkySensorConfig("yearly",-3),
	'yearly_4y_consumption': LinkySensorConfig("yearly",-4),
	'yearly_5y_consumption': LinkySensorConfig("yearly",-5),
}

def setup_platform(hass, config, add_devices, discovery_info=None):
	"""Setup the sensor platform."""
	username = config.get(CONF_USERNAME)
	password = config.get(CONF_PASSWORD)
	name = config.get(CONF_NAME)

	linky_data = LinkyData(username, password)

	sensors = []
	for variable in config[CONF_MONITORED_VARIABLES]:
		sensors.append(LinkySensor(linky_data, variable))

	add_devices(sensors)

class LinkySensor(Entity):
	"""Representation of a Sensor."""

	def __init__(self, linky_data, condition):
		"""Initialize the sensor."""
		self._condition = condition
		self._unit_of_measurement = self._cfg_expand("unit_of_measurement")
		self._icon = self._cfg_expand("icon")
		self.linky_data = linky_data
		self._state = None
		self._attributes = {}

	def _cfg_expand(self, what, default=None):
		"""Parse and return sensor data."""
		cfg = SENSOR_TYPES[self._condition]
		val = getattr(cfg, what)
		if not callable(val):
			return val
		try:
			val = val(self.linky_data)
		except (KeyError, IndexError, TypeError, ValueError) as err:
			_LOGGER.warning("Failed to expand cfg from WU API."
							" Condition: %s Attr: %s Error: %s",
							self._condition, what, repr(err))
			val = default

		return val

	def _update_attrs(self):
		self._attributes[ATTR_FRIENDLY_NAME] = self._cfg_expand("friendly_name")

	@property
	def name(self):
		"""Return the name of the sensor."""
		return "LINKY_" + self._condition

	@property
	def state(self):
		"""Return the state of the sensor."""
		return self._state

	@property
	def unit_of_measurement(self):
		"""Return the unit of measurement."""
		return self._unit_of_measurement

	@property
	def device_state_attributes(self):
		"""Return the state attributes."""
		return self._attributes

	@property
	def icon(self):
		"""Icon to use in the frontend, if any."""
		return self._icon

	def update(self):
		"""Fetch new state data for the sensor.

		This is the only method that should fetch new data for Home Assistant.
		"""
		self.linky_data.update()
		self._update_attrs()
		self._state = self._cfg_expand("value", STATE_UNKNOWN)
		self._icon = self._cfg_expand("icon", super().icon)


class LinkyData(object):
	"""Get data from Linky."""

	def __init__(self, username, password):
		"""Initialize the data object."""
		self._username = username
		self._password = password
		self.client = {}
		self.data = {}

	@Throttle(MIN_TIME_BETWEEN_UPDATES)
	def _fetch_data(self):
		"""Fetch latest data from Linky."""
		from pylinky.client import PyLinkyError
		from pylinky import LinkyClient
		try:
			self.client = LinkyClient(self._username, self._password)
			self.client.fetch_data()
		except PyLinkyError as exp:
			_LOGGER.error("Error on receive last Linky data: %s", exp)
			return False
		return True

	def update(self):
		"""Return the latest collected data from Linky."""
		self._fetch_data()
		self.data = self.client.get_data()
