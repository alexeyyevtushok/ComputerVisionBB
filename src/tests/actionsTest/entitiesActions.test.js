import moxios from 'moxios';
import { testStore } from '../testStore';
import { getEntities } from '../../actions/entitiesActions';

describe('GET entities', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('update correctly', () => {
    const expectedState = { color: '', index: -1, label: '' };

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(getEntities).then(() => {
      const newState = store.getState();
      expect(expectedState).toEqual(newState.entities.currEntity);
    });
  });
});
