const rp = require('request-promise');

const TwitchLinkParser = require('./parseTwitchLink');

const typeNameUrl = {};
typeNameUrl[TwitchLinkParser.MEDIA_TYPE.STREAM] = 'channels';
typeNameUrl[TwitchLinkParser.MEDIA_TYPE.VIDEO] = 'vods';

/**
 * Retrieve twitch access_token for a stream/vod
 * @param {String} type
 * @param {String} videoID
 * @param {Object} tokenObj (must contain 'client_id' AND/OR 'oauth_token')
 * @return {Promise}
 */
function getAccessToken(type, videoID, tokenObj) {
  const queryParam = {
    uri: 'https://api.twitch.tv/api/' + typeNameUrl[type] + '/' + videoID + '/access_token.json',
    qs: tokenObj,
    headers: {
      'User-Agent': 'Galaxy/1.0 [en] (Mac OS X 10.5.6; U; en)'
    },
    json: true
  };
  
  return rp(queryParam);
};

module.exports = getAccessToken;
