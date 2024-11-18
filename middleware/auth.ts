import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useCookie('user').value
  const token = useCookie('token').value

  // If user or token is missing, redirect to login
  if (!user || !token) {
    console.error('Missing authentication details', { user, token })
    return navigateTo('/login')
  }

  try {
    // Step 1: Verify the user token
    const verifyResponse = await axios.post('/api/auth/verify-user-token', { email: user, token })

    if (verifyResponse.status !== 200) {
      console.error('Token verification failed')
      return navigateTo('/login')
    }

    // Step 2: Retrieve the user's ID if verification succeeds
    const idResponse = await axios.get('/api/auth/user-id', {
      params: { email: user }
    })

    if (idResponse.status === 200 && idResponse.data.body && idResponse.data.body.id) {
      const userId = idResponse.data.body.id
      console.log('User is authenticated, redirecting to user profile')
      return navigateTo(`/user/${userId}`)
    } else {
      console.error('User ID retrieval failed')
      return navigateTo('/login')
    }

  } catch (error) {
    console.error('Error during authentication:', error)
    return navigateTo('/login')
  }
})
