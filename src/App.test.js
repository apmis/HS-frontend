import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Home from './components/Home.js';


configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

describe('<App /> rendering', () => {
  it('should render <Home />', () => {
    expect(wrapper.find(Home)).toExist;
  })
})