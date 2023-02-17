import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const baseAxios = axios.create({
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
  timeout: 10 * 60 * 1000,
});

/** useMutation 방식 **/
export const useReactQueryMutation = (onSuccess, onError) => {
  const { mutate } = useMutation(
    async (request) => {
      const url = request?.url;
      const formData = request?.formData;
      const header = request?.header;
      let axiosConfig = undefined;
      if (header !== undefined) {
        axiosConfig = {};
        axiosConfig.header = header;
      }

      let response = undefined;
      if (formData !== undefined) {
        response = await baseAxios.post(url, formData, axiosConfig);
      } else {
        response = await baseAxios.get(url, formData, axiosConfig);
      }

      let data = response?.data;
      if (data !== undefined) {
        data.url = url;
      }
      return data;
    },
    { onSuccess, onError }
  );

  return mutate;
};

export const useContextPath = () => {
  const basePathEnd = window.location.pathname.indexOf('/', 1);
  let contextPath = basePathEnd > 0 ? window.location.pathname.substring(0, basePathEnd) : window.location.pathname;
  if (contextPath === null || contextPath === undefined || contextPath.trim() === '' || contextPath.trim() === '/') {
    contextPath = '';
  }
  return contextPath;
};
