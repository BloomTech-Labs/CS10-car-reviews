import ReviewList from '../components/UserPage/reviewlist';

it('renders ReviewList component correctly', () => {
  const reviewList = shallow(<ReviewList />);
  expect(reviewList).toMatchSnapshot();
});
