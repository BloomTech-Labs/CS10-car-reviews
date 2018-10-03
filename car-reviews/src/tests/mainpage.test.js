import MainPage from '../components/MainPage/mainpage';

describe('MainPage', () => {
  const shallowRender = () => shallow(<MainPage />);

  // All tests will go here
  it('shallow renders without crashing', () => {
    shallowRender();
  });

  it('always renders a div', () => {
    const divs = shallowRender().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('localStorage.getItem called with jwt', () => {
    expect(localStorage.getItem).toBeCalledWith('jwt');
  });
});
