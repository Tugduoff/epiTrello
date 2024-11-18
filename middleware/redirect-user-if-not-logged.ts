import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useCookie('user').value
  const token = useCookie('token').value

  if (!user || !token) {
    console.error(user, token)
    console.error('Missing authentication details')
    return navigateTo('/login')
  }

  try {
    const response = await axios.post('/api/auth/verify-user-token', { email: user, token })

    if (response.status !== 200) {
      console.error('Token verification failed')
      return navigateTo('/login')
    }
    console.log('User is authenticated')
  } catch (error) {
    return navigateTo('/login')
  }
})
