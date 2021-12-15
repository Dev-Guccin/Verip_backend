import 'reflect-metadata'
import Container, { Service } from 'typedi'

@Service()
class Weapon {
  public attack() {
    console.log('hit!')
  }
}
@Service()
class Whip extends Weapon {
  //   public attack() {
  //     console.log('whip whip')
  //   }
}

@Service() // 자동으로 Container에 클래스를 삽입한다.
class Player {
  private weapon: Weapon

  constructor(weapon: Whip) {
    // 채찍으로 바꾸면 채찍의 클래스가 들어가게 된다.
    this.weapon = weapon
  }

  public attack() {
    this.weapon.attack()
  }
}

const me = Container.get(Player) // 컨테이너에서 인스턴스를 뽑아온다.
me.attack() // 인스턴스의 함수를 바로 사용한다.
