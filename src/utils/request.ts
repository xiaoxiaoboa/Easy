const base_url = import.meta.env.VITE_REQUEST_BASE_URL

interface RequestType<T> {
  url: string
  methods: "GET" | "POST" | "PUT" | "PATCH"
  body?: T
  token?: string
}

const request = async <T>(props: RequestType<T>) => {
  const { url, methods, body, token = '' } = props

  try {
    const res = await fetch(base_url + url, {
      method: methods,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": `Bearer ${token}`
      }
    })
    return await res.json()
  } catch (err) {
    return err
  }
}

export default request