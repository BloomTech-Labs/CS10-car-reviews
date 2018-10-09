import HamburgerMenu from '../components/MainPage/hamburgermenu';

it('render correctly HamburgerMenu component', () => {
  const hamburgerMenu = shallow(<HamburgerMenu />);
  expect(hamburgerMenu).toMatchSnapshot();
});
