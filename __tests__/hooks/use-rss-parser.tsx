import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';

import { useRssParser } from 'src/hooks/use-rss-parser';
import validText from '../../__mocks__/rss-samples/valid-document';

describe('when hook/use-rss-cache', () => {
  it('given text should return correctly the data', async () => {
    const { result } = renderHook(() => useRssParser('', validText, false, 24 * 600000));
    const { title, description, items } = result.current;

    await waitFor(
      () => {
        expect(title).toEqual('NASA Breaking News');
        expect(description).toEqual('A RSS news feed containing the latest NASA news articles and press releases.');
        expect(items[0].title).toEqual('NASA Extends Cyclone Global Navigation Satellite System Mission');
        expect(items[0].description).toEqual(
          'NASA has awarded a contract to the University of Michigan for the Cyclone Global Navigation Satellite System (CYGNSS) for mission operations and closeout.'
        );
        expect(items[0].enclosures[0].url).toEqual(
          'http://www.nasa.gov/sites/default/files/styles/1x1_cardfeed/public/thumbnails/image/cygnss20191007-home.jpg?itok=jcr5f5XK'
        );
        expect(items[0].links[0].url).toEqual(
          'http://www.nasa.gov/press-release/nasa-extends-cyclone-global-navigation-satellite-system-mission'
        );
        expect(result).toMatchSnapshot();
      },
      { timeout: 1000 }
    );
  });
});
