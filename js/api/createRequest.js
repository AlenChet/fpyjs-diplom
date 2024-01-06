const createRequest = async (options = {}) => {
  console.log('Sending request to:', Yandex.HOST + options.path);

  const params = new URLSearchParams();
  if (options.data.way) params.append('path', options.data.way);
  if (options.data.url) params.append('url', options.data.url);
  if (options.data.mediaType) params.append('media_type', options.data.mediaType);
  if (options.data.limit >= 0) params.append('limit', options.data.limit);

  console.log('Request params:', params.toString());

  let response = await fetch(
    Yandex.HOST + options.path + '?' + params.toString(),
    {
      method: options.method,
      headers: {
        Authorization: options.headers.Authorization,
      },
    }
  );

  console.log('Response status:', response.status);

  let result;
  try {
    result = await response.json();
    console.log('Response data:', result);
  } catch (syntaxError) {
    console.error('Error parsing JSON response:', syntaxError);
    result = null;
  }

  if (!response.ok && result !== null) {
    console.log(result.message);
  } else {
    return options.callback(result);
  }
};
