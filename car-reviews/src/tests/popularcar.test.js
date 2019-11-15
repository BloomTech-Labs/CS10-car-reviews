import PopularCar from '../components/MainPage/popularcar';

describe('PopularCar', () => {
  const wrapper = shallow(<PopularCar imageURL={['http://tineye.com/images/widgets/mona.jpg']} />);

  // All tests will go here
  it('shallow renders without crashing', () => {
    wrapper;
    expect(wrapper).toMatchSnapshot();
  });

  it('always renders a div', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = wrapper.find('div');
      const wrappingDiv = divs.first();

      expect(wrappingDiv.children()).toEqual(wrapper.children());
    });
  });

  describe('Testing state of PopularCar', () => {
    it('searching is defaulted to false', () => {
      expect(wrapper.state('searching')).toBe(false);
    });

    it('searchResults array is empty before searchFunction() called', () => {
      expect(wrapper.state('searchResults')).toHaveLength(0);
    });
  });

  it('Popular Car image should be the image a user uploaded with review', () => {
    const props = {
        imageURL: ['http://tineye.com/images/widgets/mona.jpg']
      },
      PopularCarComponent = mount(<PopularCar {...props} />).find('img');
    expect(PopularCarComponent.prop('src')).toEqual('http://tineye.com/images/widgets/mona.jpg');
  });

  it('Popular Car image should be the default img if user did not upload a car image with review', () => {
    const props = {
        imageURL: []
      },
      PopularCarComponent = mount(<PopularCar {...props} />).find('img');
    expect(PopularCarComponent.prop('src')).toEqual('default_img.png');
  });
});
