/* eslint-disable camelcase */
export async function request({ url }) {
  try {
    const api_call = await fetch(url);
    const data = await api_call.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
