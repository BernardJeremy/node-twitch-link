
const MEDIA_TYPE = {
  VIDEO : "video",
  STREAM : "stream"
}

/**
 * Parse a twitch link to find its type ant its id/channel name
 * @param {String} link URL
 * @return {Object}
 */
function parseTwitchLink(link) {
  let obj = {
    id : '',
    mediaType : '',
  } 

  const id = link.substr(link.lastIndexOf('/') + 1);
  obj.id = id;

  if (link.includes('/videos/')) {
    obj.mediaType = MEDIA_TYPE.VIDEO;

    return obj;
  } else if (id !== '' && !id.includes('twitch.tv')) {
    obj.mediaType = MEDIA_TYPE.STREAM;    

    return obj;
  } else {
    return null;
  }
}

module.exports.parse = parseTwitchLink;
module.exports.MEDIA_TYPE = MEDIA_TYPE;
