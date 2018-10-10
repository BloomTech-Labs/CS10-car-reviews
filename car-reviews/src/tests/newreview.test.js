import NewReviewModal from '../components/Modals/newreview';

it('renders NewReviewModal component correctly', () => {
  const newReviewModal = shallow(<NewReviewModal />);
  expect(newReviewModal).toMatchSnapshot();
});
