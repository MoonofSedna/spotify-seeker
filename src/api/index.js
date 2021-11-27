export default function ApiCall({ url, params, method, body, headers }) {
  return fetch(url, { params, method, body, headers });
}
