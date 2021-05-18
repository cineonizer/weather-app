const fetchStickerURL = async function fetchStickerURL(tag, APIKey) {
  try {
    const response = await fetch(`http://api.giphy.com/v1/stickers/random?tag=${tag}&api_key=${APIKey}`);
    const data = await response.json();
    const stickerURL = data.data.url;
    console.log(stickerURL);
    return stickerURL;
  } catch (error) {
    return false;
  }
};

export default fetchStickerURL;
