const baseUrl =
  window.location.protocol +
  '//' +
  window.location.host +
  window.location.pathname

const getParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return Object.fromEntries(urlSearchParams.entries())
}

export const setQueryParam = (key, value) => {
  const params = getParams()

  params[key] = value
  const newQuery = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  if (history.pushState) {
    var newurl = baseUrl + `?${newQuery}`
    window.history.pushState({ path: newurl }, '', newurl)
  }
}

export const removeQueryParam = (key) => {
  const params = getParams()
  if (!params[key]) return

  delete params[key]
  const newQuery = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  if (history.pushState) {
    var newurl = baseUrl + `?${newQuery}`
    window.history.pushState({ path: newurl }, '', newurl)
  }
}

export const getQueryParam = (key) => {
  const params = getParams()
  return params[key]
}
