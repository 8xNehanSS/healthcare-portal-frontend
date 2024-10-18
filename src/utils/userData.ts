class Data {
  constructor(
    public valid: boolean = false,
    public userID: number = 0,
    public username: string = "",
    public loginType: number = 0,
    public firstName: string = "",
    public lastName: string = ""
  ) {}

  // Method to convert to a plain object
  toPlainObject() {
    return {
      valid: this.valid,
      userID: this.userID,
      username: this.username,
      loginType: this.loginType,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}

export default Data;
