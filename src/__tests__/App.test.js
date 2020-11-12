import { render, screen } from '@testing-library/react';
import {shallow, configure} from 'enzyme';
import App from '../App';
import MainContainer from '../components/MainContainer/MainContainer'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('renders MainContainer when App is rendered', () => {
  const renderApp = shallow(<App/>);
  expect(renderApp.find(MainContainer).length).toBe(1);
});


