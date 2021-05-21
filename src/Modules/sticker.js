const fetchStickerURL = async function fetchStickerURL(tag, APIKey) {
  try {
    const response = await fetch(`https://api.giphy.com/v1/stickers/random?tag=${tag}&api_key=${APIKey}`, { mode: 'cors' });
    const data = await response.json();
    const stickerURL = data.data.image_url;
    return stickerURL;
  } catch (error) {
    return false;
  }
};

export default fetchStickerURL;
