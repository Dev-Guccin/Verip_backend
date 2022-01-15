import User from "../models/User"

export default class UserService {
  constructor() {}

  async Signup(user: string) {
    //const userRecord = await UserModel.create(user);
    //const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id
    //const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created

    //await EmailService.startSignupSequence(userRecord)

    //...do more stuff
    const userRecord = "test"
    const companyRecord = "company"
    return { user: userRecord, company: companyRecord }
    this.test("string")
  }
  async getUserCount() {
    const count = await User.find({}).count()
    console.log(count)
    return count
  }
  async getUserCountToday() {
    const count = await User.find({
      regdate: {
        $gte: new Date("2022-01-15"),
      },
    }).count()
    console.log("day count:", count)
    return count
  }

  test(param: string) {}
}
