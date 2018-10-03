import App from '../App';

describe('<App />', () => {
  it('shallow renders without crashing', () => {
    shallow(<App />);
  });

  it('should render exactly three <Route/> components', () => {
    const app = shallow(<App />);

    const route = app.find('Route');

    expect(route.length).toEqual(3);
  });

  it('should render exactly four <PrivateRoute/> components', () => {
    const app = shallow(<App />);

    const privateroute = app.find('PrivateRoute');

    expect(privateroute.length).toEqual(4);
  });
});
