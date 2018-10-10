import Checkout from '../components/UserPage/checkout';

it('renders Checkout component correctly', () => {
  const checkout = shallow(<Checkout />);
  expect(checkout).toMatchSnapshot();
});
