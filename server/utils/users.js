[{
  id: '/jlkjklfajsdklf',
  name: 'Andrew',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    const removedUser = this.getUser(id);

    if (removedUser) {
      this.users = this.users.filter(u => u.id !== id);
      // this.users = newUsers;
    }

    return removedUser;
  }
  getUser (id) {
    return this.users.find(u => u.id === id);
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = { Users }

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// var me = new Person('Rich', 18);
// var description = me.getUserDescription();
// console.log(description);
