const getAccessToken = require('./lib/getAccessToken');
const getM3U8FromUsher = require('./lib/getM3U8FromUsher');
const M3U8Parser = require('./lib/parseM3U8');
const TwitchLinkParser = require('./lib/parseTwitchLink');

/**
 * Retrieve direct links for a twitch stream/vod
 * @param {String} stream/vod URL
 * @param {Object} tokenObj (must contain 'client_id' AND/OR 'oauth_token')
 * @return {Promise}
 */
function getTwitchLink(url, tokenObj) {
  return new Promise(function(resolve, reject) {
    
    let parsedUrl = TwitchLinkParser.parse(url);
    if (!parsedUrl) {
      return reject("Invalid URL format");
    }

    let type = parsedUrl.mediaType;
    let target = parsedUrl.id;

    getAccessToken(type, target, tokenObj).then(function (ret) {

      getM3U8FromUsher(type, target, ret.token, ret.sig).then(function (usher) {

        M3U8Parser(usher).then(function(linkArray){
          resolve(linkArray)
        }).catch(function(err){
          reject(err);
        });

      }).catch(function (err) {
        reject(err);
      });

    }).catch(function (err) {
      reject(err);
    });
  });
}

module.exports = getTwitchLink;
