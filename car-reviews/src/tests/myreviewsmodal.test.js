import MyReviewsModal from '../components/Modals/myreviewsmodal';

describe('MyReviews Modal', () => {
  const props = {
    title: 'The best car ever!',
    content: 'Seriously a great car!',
    score: 5,
    carImage: '',
    car: {
      year: 2018,
      make: 'Toyota',
      model: 'Camry'
    }
  };

  const wrapper = shallow(<MyReviewsModal {...props} />);

  // All tests will go here
  it('shallow renders without crashing', () => {
    wrapper;
    expect(wrapper).toMatchSnapshot();
  });

  it('always renders a div', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('Testing state of MyReviews Modal', () => {
    it('modal is defaulted to false', () => {
      expect(wrapper.state('modal')).toBe(false);
    });

    it('editing is defaulted to false', () => {
      expect(wrapper.state('editing')).toBe(false);
    });

    it('title, content, score, and carImage should be set to the props being passed in', () => {
      expect(wrapper.state('title')).toEqual('The best car ever!');
      expect(wrapper.state('content')).toEqual('Seriously a great car!');
      expect(wrapper.state('score')).toEqual(5);
      expect(wrapper.state('carImage')).toEqual('');
    });
  });
});
