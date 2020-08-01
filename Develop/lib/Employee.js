// TODO: Write code to define and export the Employee class
// TODO：Employeeクラスを定義およびエクスポートするコードを記述します
class Employee {
    // 名前,ID,アドレス
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
    getName() {
      return this.name;
    }
    getId() {
      return this.id;
    }
    getEmail() {
      return this.email;
    }
    getRole() {
      return "Employee";
    }
  }
  module.exports = Employee;
  