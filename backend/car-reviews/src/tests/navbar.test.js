import NavBar from '../components/MainPage/navbar';

it('render correctly Navbar component', () => {
  const Navbar = shallow(<NavBar />);
  expect(Navbar).toMatchSnapshot();
});
