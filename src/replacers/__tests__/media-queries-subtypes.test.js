delete require.cache['../media-queries'];

function validate(mediaQueries, expectedValue) {
  const mq = require('../media-queries').default;
  expect(mq.process(mediaQueries)).toEqual(expectedValue);
}

function mockPlatform(Platform) {
  jest.setMock('react-native', {
    Platform,
    Dimensions: {
      get: () => {
        return {width: 110, height: 100};
      }
    },
    I18nManager: {
      isRTL: false
    }
  })
}

const mediaQueries = {
  '@media (subtype: tvOS)': {
    a: 1,
  },
  '@media (subtype: androidTV)': {
    a: 2,
  },
  '@media (subtype: pad)': {
    a: 3
  },
  '@media (subtype: desktop)': {
    a: 4
  },
  '@media (subtype: browser)': {
    a: 5
  },
  '@media (subtype: phone)': {
    a: 6
  },
};

describe('media-queries-sybtypes', function () {
  beforeEach(() => jest.resetModules());

  it('should process subtype for tvOS', function () {
    mockPlatform({
      OS: 'ios',
      isTVOS: true
    });

    validate(mediaQueries, {a: 1});
  });

  it('should process subtype androidTV', function () {
    mockPlatform({
      OS: 'android',
      isTV: true
    });

    validate(mediaQueries, {a: 2});
  });

  it('should process pad subtype for iPad', function () {
    mockPlatform({
      OS: 'ios',
      isPad: true
    });

    validate(mediaQueries, {a: 3});
  });


  it('should process pad subtype for android', function () {
    mockPlatform({
      OS: 'android',
      isPad: true
    });

    validate(mediaQueries, {a: 3});
  });

  it('should process subtype for windows desktop', function () {
    mockPlatform({
      OS: 'windows'
    });

    validate(mediaQueries, {a: 4});
  });



  it('should process subtype for macos desktop', function () {
    mockPlatform({
      OS: 'macos'
    });

    validate(mediaQueries, {a: 4});
  });



  it('should process subtype for browsers', function () {
    mockPlatform({
      OS: 'web'
    });

    validate(mediaQueries, {a: 5});
  });

  it('should process subtype phone android', function () {
    mockPlatform({
      OS: 'android'
    });

    validate(mediaQueries, {a: 6});
  });



  it('should process subtype phone iOS', function () {
    mockPlatform({
      OS: 'ios'
    });

    validate(mediaQueries, {a: 6});
  });

});
