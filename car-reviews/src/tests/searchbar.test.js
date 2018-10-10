import SearchBar from '../components/MainPage/searchbar';

it('renders SearchBar component correctly', () => {
  const searchBar = shallow(<SearchBar />);
  expect(searchBar).toMatchSnapshot();
});
