const db = require('../config/db');

exports.createUser = async (username,email,password) => {
    const result = await db.execute(
        'INSERT INTO users (user_name, user_email, user_hashed_password) VALUES (?,?,?)',
        [username,email,password]
    );
    return result.insertId;
};

exports.getUserByEmail = async (email) =>
{
    const [result] = await db.execute(
        'SELECT * FROM users WHERE user_email=?',
        [email]
    );

    return result[0];
}