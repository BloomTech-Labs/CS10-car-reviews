import App from '../App';

describe('<App />', () => {
  it('renders App component correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });

  it('always renders a div', () => {
    const divs = shallow(<App />).find('div');
    expect(divs.length).toBe(1);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = shallow(<App />).find('div');
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children() method on shallow(<App/>).
      expect(wrappingDiv.children()).toEqual(shallow(<App />).children());
    });
  });

  describe('Route component', () => {
    it('should render exactly three <Route/> components', () => {
      const app = shallow(<App />);
      const route = app.find('Route');
      expect(route.length).toEqual(3);
    });

    it("First Route component's exact path is '/' and receives three props", () => {
      const route = shallow(<App />).find('Route');
      expect(route.at(0).props().path).toEqual('/');
      expect(route.at(0).props().exact).toBeTruthy();
      expect(Object.keys(route.at(0).props()).length).toBe(3);
    });

    it("Second Route component's non-exact path is '/searchpage' and receives two props", () => {
      const route = shallow(<App />).find('Route');
      expect(route.at(1).props().path).toEqual('/searchpage');
      expect(route.at(1).props().exact).toBeFalsy();
      expect(Object.keys(route.at(1).props()).length).toBe(2);
    });

    it("Third Route component's non-exact path is '/Login' and receives two props", () => {
      const route = shallow(<App />).find('Route');
      expect(route.at(2).props().path).toEqual('/Login');
      expect(route.at(2).props().exact).toBeFalsy();
      expect(Object.keys(route.at(2).props()).length).toBe(2);
    });
  });

  describe('PrivateRoute component', () => {
    it('should render exactly three <PrivateRoute/> components', () => {
      const app = shallow(<App />);
      const privateroute = app.find('PrivateRoute');
      expect(privateroute.length).toEqual(3);
    });

    it("First PrivateRoute component's non-exact path is '/Billing' and receives two props", () => {
      const privateroute = shallow(<App />).find('PrivateRoute');
      expect(privateroute.at(0).props().path).toEqual('/Billing');
      expect(privateroute.at(0).props().exact).toBeFalsy();
      expect(Object.keys(privateroute.at(0).props()).length).toBe(2);
    });

    it("Second PrivateRoute component's non-exact path is '/MyReviews' and receives two props", () => {
      const privateroute = shallow(<App />).find('PrivateRoute');
      expect(privateroute.at(1).props().path).toEqual('/MyReviews');
      expect(privateroute.at(1).props().exact).toBeFalsy();
      expect(Object.keys(privateroute.at(1).props()).length).toBe(2);
    });

    it("Third PrivateRoute component's non-exact path is '/Settings' and receives two props", () => {
      const privateroute = shallow(<App />).find('PrivateRoute');
      expect(privateroute.at(2).props().path).toEqual('/Settings');
      expect(privateroute.at(2).props().exact).toBeFalsy();
      expect(Object.keys(privateroute.at(2).props()).length).toBe(2);
    });
  });
});
