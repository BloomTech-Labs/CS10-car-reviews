import MyReviews from '../components/UserPage/myreviews';

it('renders MyReviews component correctly', () => {
  const myReviews = shallow(<MyReviews />);
  expect(myReviews).toMatchSnapshot();
});
