import UserSettings from '../components/UserPage/usersettings';

it('renders UserSettings component correctly', () => {
  const userSettings = shallow(<UserSettings />);
  expect(userSettings).toMatchSnapshot();
});
