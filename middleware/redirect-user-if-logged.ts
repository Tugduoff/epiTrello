import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useCookie('user').value
  const token = useCookie('token').value
  let id = 0

  if (!user || !token) {
    console.error(user, token)
    console.error('Missing authentication details')
    return
  }

  try {
    const response = await axios.post('/api/auth/verify-user-token', { email: user, token })

    if (response.status !== 200) {
      return
    }
    try {
      const response2 = await axios.get('/api/auth/user-id',
        {
          params: {
            email: user
          }
        }
      )
      if (response2.status !== 200)
        return
      id = response2.data.body.id
      return navigateTo(`/user/${id}`)
    } catch (error) {
      return
    }
  } catch (error) {
    return
  }
})
