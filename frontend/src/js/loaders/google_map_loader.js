/* eslint-disable */
import script from 'scriptjs';

// This is from the google-map-react library because they were loading the google maps script better!
const API_PATH = 'https://maps.googleapis.com/maps/api/js?callback=_$_google_map_initialize_$_';

let loadPromise_;

let resolveCustomPromise_;

const _customPromise = new Promise((resolve) => {
  resolveCustomPromise_ = resolve;
});

// TODO add libraries language and other map options
export default (bootstrapURLKeys, libraries) => {

  // call from outside google-map-react
  // will be as soon as loadPromise_ resolved
  if (!bootstrapURLKeys) {
    return _customPromise;
  }

  if (loadPromise_) {
    return loadPromise_;
  }

  loadPromise_ = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('google map cannot be loaded outside browser env'));
      return;
    }

    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    if (typeof window._$_google_map_initialize_$_ !== 'undefined') {
      reject(new Error('google map initialization error'));
    }

    window._$_google_map_initialize_$_ = () => {
      delete window._$_google_map_initialize_$_;
      resolve(window.google);
    };

    if (process.env.NODE_ENV !== 'production') {
      if (Object.keys(bootstrapURLKeys).indexOf('callback') > -1) {
        const message = `"callback" key in bootstrapURLKeys is not allowed,
                          use onGoogleApiLoaded property instead`;
        // eslint-disable-next-line no-console
        console.error(message);
        throw new Error(message);
      }
    }

    const params = Object.keys(bootstrapURLKeys).reduce(
      (r, key) => `${r}&${key}=${bootstrapURLKeys[key]}`,
      '',
    );

    console.log(`${API_PATH}${params}&libraries=${libraries}`);
    script(
      `${API_PATH}${params}&libraries=${libraries}`,
      () => typeof window.google === 'undefined'
        && reject(new Error('google map initialization error (not loaded)')),
    );
  });

  resolveCustomPromise_(loadPromise_);

  return loadPromise_;
};
