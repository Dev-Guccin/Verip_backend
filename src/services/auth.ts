import 'reflect-metadata'
import Container, { Service } from 'typedi'
import { randomBytes, createHash } from 'crypto'

@Service()
export class AuthService {
  constructor() {
    console.log('AuthService constructor')
  }

  public signUp(userid: string, password: string) {
    try {
      const salt = randomBytes(32).toString('base64')
      const hashPassword = createHash('sha512')
        .update(password + salt)
        .digest('hex') //  결과를 hex값으로 바꾼다

      console.log('salt:', salt)
      console.log('hashPassword:', hashPassword)

      return true
    } catch (e) {
      console.log('err:', e)
      throw e // 에러 터뜨리고 종료
    }
  }
}
