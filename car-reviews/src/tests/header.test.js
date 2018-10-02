import Header from '../components/UserPage/header';

describe('Header', () => {
  let props;
  let mountedHeader;
  const header = () => {
    if (!mountedHeader) {
      mountedHeader = mount(<Header {...props} />);
    }
    return mountedHeader;
  };

  beforeEach(() => {
    props = {
      section: undefined
    };
    mountedHeader = undefined;
  });

  // All tests will go here
  it('shallow renders without crashing', () => {
    header();
  });

  it('always renders a div', () => {
    const divs = header().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = header().find('div');
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv).toEqual(header().children());
    });
  });

  it('always renders two a tags', () => {
    expect(header().find('a').length).toBe(2);
  });

  describe('first rendered `a tag`', () => {
    it('receives three props', () => {
      const firstATag = header()
        .find('a')
        .first();
      expect(Object.keys(firstATag.props()).length).toBe(3);
    });
  });

  it('always renders a `span`', () => {
    expect(header().find('span').length).toBe(1);
  });

  describe('when `props.section` is defined', () => {
    beforeEach(() => {
      props.section = 'MyReviews';
    });

    it("sets the rendered span's `section` prop to MyReviews", () => {
      const span = header().find('span');
      expect(`${span.props().children[0]}${span.props().children[1]}`).toBe(` > ${props.section}`);
    });
  });

  describe('when `props.section` is undefined', () => {
    beforeEach(() => {
      props.section = undefined;
    });

    it("sets the rendered span's `section` prop to undefined", () => {
      const span = header().find('span');
      expect(span.props().children[1]).not.toBeDefined();
    });
  });

  // it('should remove jwt onClick of sign out link', () => {
  //   const secondATag = header()
  //     .find('a')
  //     .at(1);

  //   secondATag.simulate('click');
  //   expect(localStorage.getItem).not.toBeDefined();
  // });
});
