import 'reflect-metadata'
import Container, { Service } from 'typedi'
import { randomBytes, createHash } from 'crypto'
import User from '../models/User'

// 서비스로 type을 설정하여 자동으로 typedi의 Container에 삽입한다.
// 다른곳에서 Container.get(AuthService)로 받아올 수 있다. 문자열로도 선언 가능함.
@Service()
export class AuthService {
  constructor() {
    console.log('AuthService constructor')
  }

  public async signUp(
    email: string,
    password: string,
    userId: string,
    filename: string
  ) {
    try {
      const salt = randomBytes(32).toString('base64')
      const hashPassword = createHash('sha512')
        .update(password + salt)
        .digest('hex') //  결과를 hex값으로 바꾼다

      console.log('salt:', salt)
      console.log('hashPassword:', hashPassword)
      const res = await User.create({
        email: email,
        pw: hashPassword,
        userId: userId,
        fileName: filename,
      })
      console.log(res)
      return true
    } catch (e) {
      throw e // 에러 터뜨리고 종료
      console.log('err:', e)
      return false
    }
  }
  public async checkEmail(email: string) {
    // 이메일이 디비에 저자되어 있는지 판단한다.
    const res = await User.findOne({
      email: email,
    })
    return res
  }
}
