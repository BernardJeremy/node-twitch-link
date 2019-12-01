const rp = require('request-promise');

const TwitchLinkParser = require('./parseTwitchLink');
const rand = require('./random');

const typeNameUrl = {};
typeNameUrl[TwitchLinkParser.MEDIA_TYPE.STREAM] = 'api/channel/hls';
typeNameUrl[TwitchLinkParser.MEDIA_TYPE.VIDEO] = 'vod';

/**
 * Retrieve M3U8 playlist data from twitch's usher API for a stream/vod
 * @param {String} type
 * @param {String} videoID
 * @param {String} token (retrieve from access_token)
 * @param {String} sig (retrieve from access_token)
 * @return {Promise}
 */
function getM3U8FromUsher(type, videoID, token, sig) {
  videoID += (type === TwitchLinkParser.MEDIA_TYPE.STREAM ? '.m3u8' : '');

  const queryParam = {
    uri: 'https://usher.ttvnw.net/' + typeNameUrl[type] + '/' + videoID,
    qs: {
        token,
        allow_audio_only: true,
        p: rand(0, 9999),
        allow_source: false,
        allow_spectre: false,
        sig,
        player: 'twitchweb',
        type: 'any'

    },
    headers: {
        'User-Agent': 'Galaxy/1.0 [en] (Mac OS X 10.5.6; U; en)'
    },
  };
  
  return rp(queryParam);
}

module.exports = getM3U8FromUsher;
