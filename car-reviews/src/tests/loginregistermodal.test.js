import LoginRegisterModal from '../components/Modals/loginregistermodal';

it('renders Login/Register Modal component correctly', () => {
  const loginRegisterModal = shallow(<LoginRegisterModal />);
  expect(loginRegisterModal).toMatchSnapshot();
});
