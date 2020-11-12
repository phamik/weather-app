import MainContainer from '../components/MainContainer/MainContainer'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure, mount} from 'enzyme';
import { render, screen } from '@testing-library/react';
import LocationContainer from '../components/LocationContainer/LocationContainer';
import WeatherContainer from '../components/WeatherContainer/WeatherContainer';

configure({ adapter: new Adapter() });

const locationList = [
  {
    "id": 145,
    "postcode": "E8 3DB",
    "eastings": 533638,
    "northings": 184527,
    "country": "England",
    "nhs_ha": "London",
    "longitude": -0.074253,
    "latitude": 51.543824
  }
]

const weatherList = [
  {
    "id":2643743,
    "coord": {"lon":-0.07,"lat":51.54},
    "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
    "base":"stations",
    "main":{"temp":289.28,"feels_like":285.24,"temp_min":288.71,"temp_max":290.15,"pressure":1016,"humidity":77},
    "visibility":10000,
    "wind":{"speed":6.7,"deg":230},
    "clouds":{"all":90},
    "dt":1604060381,
    "sys":{"type":1,"id":1414,"country":"GB","sunrise":1604040660,"sunset":1604075829},
    "timezone":0,
    "name":"London"
  },
]

test('id incorrect data was passed to MainContainer, the component should return null', () => {
  const renderMainContainer = shallow(<MainContainer locationListDefault={null} weatherListDefault={weatherList}/>);
  expect(renderMainContainer.isEmptyRender()).toBe(true);
});
