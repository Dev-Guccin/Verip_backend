import 'reflect-metadata'
import Container, { Service } from 'typedi'
import { randomBytes } from 'crypto'

@Service()
export class AuthService {
  constructor() {
    console.log('AuthService constructor')
  }

  public async signUp(userid: string, password: string) {
    try {
      const salt = randomBytes(32)
      console.log('salt:', salt)
      return salt
    } catch (e) {
      console.log('err:', e)
      throw e // 에러 터뜨리고 종료
    }
  }
}
