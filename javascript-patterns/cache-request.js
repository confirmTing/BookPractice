;(function(win) {
  function request(apiUrl, params) {
    return axios(apiUrl, params);
  }

  const local = win.localStorage;

  function cacheRequest(apiUrl, {data, timeout = 300}) {
    if (!local) {
      return request(apiUrl, data);
    }
    const key = apiUrl + JSON.stringify(data);
    const resultStr = localStorage.getItem(key);

    const cacheRequest = () => {
      return request(apiUrl, data)
      .then((response) => {
        local.setItem(key, JSON.stringify({response, time: Date.now()}));
        return response;
      });
    };

    if (!resultStr) {
      return cacheRequest();
    }
    let result;
    try {
      result = JSON.parse(resultStr);
    } catch (err) {
      return cacheRequest();
    }
    const now = Date.now();
    if ((now - result.time) / 1000 > timeout) {
      return cacheRequest();
    }
    return result.response;
  }
  win.cacheRequest = cacheRequest;
})(window);
