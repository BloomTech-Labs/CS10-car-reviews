import BillingContainer from '../components/UserPage/billingcontainer';

it('renders BillingContainer component correctly', () => {
  const billingContainer = shallow(<BillingContainer />);
  expect(billingContainer).toMatchSnapshot();
});
