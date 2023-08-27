const User = require("../../modal/User");
const bcrypt = require('bcrypt')
const { SignUpValidation, SignInValidation } = require('../../util/validators');
const { UserInputError } = require("apollo-server-express");
const jwt = require('jsonwebtoken');
const googleOAuth = require("../../util/googleOAuth");

module.exports = {
  Query: {
    hello: (parent, args, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return `Awesome ${context.user.firstName} ${context.user.lastName}`;
    },
    users: async () => await User.find({})
  },
  Mutation: {
    signUp:
      async (_, { firstName, lastName, email, password, confirmPassword }) => {
        const { error, valid } = SignUpValidation(firstName, lastName, email, password, confirmPassword)

        if (!valid) {
          throw new UserInputError(error)
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const userInData = await User.findOne({ email: email }).exec()
        if (userInData) {
          const userError = 'User already Existed!'
          throw new UserInputError(userError)
        }


        const user = new User({
          firstName,
          lastName,
          email: email,
          password: hashedPassword
        })
        await user.save()
        return user
      },

    signIn:
      async (_, { email, password }, context) => {
        const { error, valid } = SignInValidation(email, password)

        if (!valid) {
          throw new UserInputError(error)
        }

        const user = await User.findOne({ email: email })
        if (!user) {
          throw new UserInputError('User Not Found!')
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          throw new UserInputError('Invalid Password!')
        }

        const token = jwt.sign(
          {
            UserInfo: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              roles: user.roles
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );

        context.res.cookie("authData", token, {
          httpOnly: true, //accessible only by web server
          secure: true, //https
          sameSite: "None", //cross-site cookie
          maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
        });



        return {
          user,
          token
        }
      },

    signOut: async (_, __, context) => {
      const { res } = context;
      res.clearCookie("authData");
      return true;
    },

    googleLogin: async (_, args)=>{
      const { googleCode } = args;
      const profile = await googleOAuth.getProfileInfo(googleCode);
      return true
    }
  }

}