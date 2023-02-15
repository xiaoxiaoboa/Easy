const getLocalData = (key: string) => {
  const localData = localStorage.getItem(key)
  return localData && JSON.parse(localData)
}

export default getLocalData
