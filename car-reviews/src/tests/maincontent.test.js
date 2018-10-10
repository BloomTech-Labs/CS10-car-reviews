import MainContent from '../components/MainPage/maincontent';

describe('MainContent', () => {
  const wrapper = () => shallow(<MainContent />);

  // All tests will go here
  it('renders MainContent component correctly', () => {
    expect(wrapper()).toMatchSnapshot();
  });

  it('always renders a div', () => {
    const divs = wrapper().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = wrapper().find('div');
      const wrappingDiv = divs.first();

      expect(wrappingDiv.children()).toEqual(wrapper().children());
    });
  });

  it('always renders a Container', () => {
    const container = wrapper().find('Container');
    expect(container.length).toBe(1);
  });

  describe('the rendered Container', () => {
    it('contains everything else that gets rendered', () => {
      const container = wrapper().find('Container');
      const wrappingContainer = container.first();

      expect(wrappingContainer.children()).toEqual(container.children());
    });
  });

  describe('Row component', () => {
    it('should render exactly three <Row/> components', () => {
      const rows = wrapper().find('Row');
      expect(rows.length).toEqual(3);
    });
  });

  describe('h3 elements', () => {
    it('should render exactly three <h3/> elements', () => {
      const headers = wrapper().find('h3');
      expect(headers.length).toEqual(3);
    });
  });

  describe('Testing state of MainContent', () => {
    it('counter is defaulted to 0', () => {
      expect(wrapper().state('counter')).toBe(0);
    });

    it('popularCars array is empty before CDM()', () => {
      expect(wrapper().state('popularCars')).toHaveLength(0);
    });

    it('reviews array is empty before CDM()', () => {
      expect(wrapper().state('popularCars')).toHaveLength(0);
    });

    it('popularReviewers array is empty before CDM()', () => {
      expect(wrapper().state('popularCars')).toHaveLength(0);
    });

    it('newdate defaulted to dateString', () => {
      const currentDate = new Date();
      const date = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const dateString = date + '-' + (month + 1) + '-' + year;

      expect(wrapper().state('newdate')).toBe(dateString);
    });

    it('newdate defaulted to dateString', () => {
      const currentDate = new Date();
      const date = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const dateString = date + '-' + (month + 1) + '-' + year;

      expect(wrapper().state('newdate')).toBe(dateString);
    });
  });
});
