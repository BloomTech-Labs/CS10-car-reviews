import Billing from '../components/UserPage/billing';

it('renders Billing component correctly', () => {
  const billing = shallow(<Billing />);
  expect(billing).toMatchSnapshot();
});
