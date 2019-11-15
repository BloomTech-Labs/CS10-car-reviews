import ResultsSearchBar from '../components/MainPage/resultssearchbar';

it('renders ResultsSearchBar component correctly', () => {
  const resultsSearchBar = shallow(<ResultsSearchBar />);
  expect(resultsSearchBar).toMatchSnapshot();
});
