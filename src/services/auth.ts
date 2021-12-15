import { randomBytes } from 'crypto'

export default class AuthService {
  constructor() {
    console.log('AuthService constructor')
  }
  public async SignUp(userid: string) {
    try {
      const salt = randomBytes(32)
      console.log('salt:', salt)
    } catch (e) {
      console.log('err:', e)
      throw e // 에러 터뜨리고 종료
    }
  }
}
