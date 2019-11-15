import LoginRegister from '../components/MainPage/loginregister';

it('render correctly LoginRegister component', () => {
  const loginRegister = shallow(<LoginRegister />);
  expect(loginRegister).toMatchSnapshot();
});
