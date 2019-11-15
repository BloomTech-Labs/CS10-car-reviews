import Settings from '../components/UserPage/settings';

it('renders Settings component correctly', () => {
  const settings = shallow(<Settings />);
  expect(settings).toMatchSnapshot();
});
