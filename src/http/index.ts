import axios from 'axios';
const $axios = function(options:any) {
  const promise = new Promise((resolve, reject) => {
    // 创建一个axios实例
    const obj = {
      baseURL: options.baseURL ? options.baseURL : (window as any).config.baseURL,
      withCredentials: true,
      headers: options.headers
        ? options.headers
        : { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformResponse: [],
      ...options,
      url: options.service ? (window as any).config.service[options.service] + options.url : options.url,
      // timeout:3000
    };
    const instance = axios.create(obj);
    // console.log(obj);
    //   拦截器
    instance.interceptors.request.use(
      (config:any) => {
        config.headers.token =  document.cookie.match(/token=([^;]*)/)?.[1];
        return config;
      },
      error => reject(error), // console.log(error)
    );
    //  响应头拦截器
    instance.interceptors.response.use(
      response => {
        const responseBody = JSON.parse(response.request.response);
        // 未登录或登录失效，跳转登录页面
        if ('errorcode' in responseBody && responseBody.errorcode === 10002) {
          window.location = (window as any).config.loginURL;
        }
        return response;
      },
      error => {
        // 未登录或登录失效，跳转登录页面
        if (String(error).includes('401')) {
          window.location = (window as any).config.loginURL;
        }
        reject(error);
      },
    );
    // 发送请求
    instance(obj)
      .then(res => {
        if (res.request) {
          if (res.request.readyState !== 4 || !res.request.readyState) {
            return reject(new Error('请求失败'));
          }
        }
        return resolve(JSON.parse(res.request.response));
      })
      .catch(err => reject(new Error(err)));
  });
  return promise;
};

export default $axios;
