const baseUrl: string = import.meta.env.VITE_REQUEST_BASE_URL

const getUnionUrl = (str: string | undefined) => {
  return str ? baseUrl + str : str
}

export default getUnionUrl
