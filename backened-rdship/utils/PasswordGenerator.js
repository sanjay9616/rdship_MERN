const bcrypt = require('bcrypt');

 class PasswordGenerator {
     async generateHashPassword(password) {
       const saltRounds = 10;
        console.log("password=>",password)
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PasswordGenerator;
