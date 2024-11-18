import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const email = useCookie('user').value
  let potentialId = 0

  if (to.path) {
    console.log('To path:', to.path)
    potentialId = parseInt(to.path.split('/')[2]) // /user/0 e.g.
    if (isNaN(potentialId)) {
      console.error('Invalid ID:', potentialId)
      return
    }
  }
  try {
    console.log('Potential ID:', potentialId)
    const response = await axios.get('/api/auth/user-id',
      {
        params: {
          email
        }
      }
    )

    if (response.status !== 200) {
      console.error('User is not authorized to view this page')
      return navigateTo('/login')
    }
    const userId = response.data.body.id

    const userIdString: string = userId.toString()
    const potentialIdString: string = potentialId.toString()

    console.log('User ID:', userIdString)
    console.log('Potential ID:', potentialIdString)

    if (userIdString != potentialIdString) {
      console.error('User is not authorized to view this page')
      return navigateTo('/user/' + userId)
    }
    console.log('User is authorized')
  } catch (error) {
    console.error('Error during authorization:', error)
    return navigateTo('/login')
  }
})
