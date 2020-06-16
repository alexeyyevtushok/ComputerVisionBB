import moxios from 'moxios';
import { testStore } from '../testStore';
import { getImages, getNewImageShapes } from '../../actions/imagesActions';

describe('GET images', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('update correctly', () => {
    const expectedState = { images: [] };

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(getImages).then(() => {
      const newState = store.getState();
      expect(expectedState).toEqual(newState.images);
    });
  });
});
