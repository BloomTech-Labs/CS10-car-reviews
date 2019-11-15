import MainPage from '../components/MainPage/mainpage';

describe('MainPage', () => {
  const shallowMainPage = () => shallow(<MainPage />);

  // All tests will go here
  it('renders MainPage component correctly', () => {
    expect(shallowMainPage).toMatchSnapshot();
  });

  it('always renders a div', () => {
    const divs = shallowMainPage().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('always renders a SearchBar', () => {
    const searchbar = shallowMainPage().find('Searchbar');
    expect(searchbar.length).toBe(1);
  });

  describe('SearchBar component should receive exactly two props', () => {
    const searchbar = shallowMainPage().find('Searchbar');
    expect(Object.keys(searchbar.props()).length).toBe(2);
  });

  it('always renders <MainContent/>', () => {
    const maincontent = shallowMainPage().find('MainContent');

    expect(maincontent.length).toBe(1);
  });

  it('<MainContent/> should receive isLoggedIn prop only', () => {
    const maincontent = shallowMainPage().find('MainContent');

    expect(Object.keys(maincontent.props()).length).toBe(1);
  });

  it('always renders two a tags', () => {
    expect(shallowMainPage().find('a').length).toBe(2);
  });

  it('href link in both a tags to be defined', () => {
    expect(
      shallowMainPage()
        .find('a')
        .at(0)
        .props().href
    ).toBeDefined();
    expect(
      shallowMainPage()
        .find('a')
        .at(1)
        .props().href
    ).toBeDefined();
  });

  it('localStorage.getItem called with jwt', () => {
    expect(localStorage.getItem).toBeCalledWith('jwt');
  });

  describe('Testing state of MainPage', () => {
    it('isLoggedIn state is defaulted to false', () => {
      expect(shallowMainPage().state('isLoggedIn')).toBeFalsy();
    });
  });
});
