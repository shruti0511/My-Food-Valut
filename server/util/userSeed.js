const User = require("../modal/User");
const bcrypt = require('bcrypt')

const userSeed = async () => {
    const isAdmin = await User.findOne({ roles: { $in: ["Admin"] } }).exec();
    const isUser = await User.findOne({ roles: { $in: ["User"] } }).exec();
    if (!isAdmin) {
        console.log("not admin");
        const firstName = "Admin";
        const lastName = "Admin";
        const email = "admin@gmail.com";
        const roles = ["Admin"];
        const password = "admin@123";

        const hasedPwd = await bcrypt.hash(password, 10);
        const userObj = {
            firstName,
            lastName,
            "password": hasedPwd,
            email,
            roles,
            active: true,
            confirmationCode:null
        };
        const user = User.create(userObj)
        if (user) { //created
            console.log('Admin User scessfully created');
        } else {
           console.log('Invalid User data received');
        }
    }
    if (!isUser) {
        const firstName = "Shruti";
        const lastName = "Patel";
        const email = "shruti@gmail.com";
        const roles = ["User"];
        const password = "shruti@123";

        const hasedPwd = await bcrypt.hash(password, 10);
        const userObj = {
            firstName,
            lastName,
            "password": hasedPwd,
            email,
            roles
        };
        const user = User.create(userObj)
        if (user) { //created
            console.log('User scessfully created');
        } else {
           console.log('Invalid User data received');
        }
    }
};

module.exports = userSeed;
