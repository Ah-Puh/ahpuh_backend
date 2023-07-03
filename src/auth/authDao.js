export async function findByEmail(connection, email) {
    const findByEmailQuery = `SELECT email, password FROM users WHERE email = '${email}'`
    const [[x]] = await connection.query(findByEmailQuery);
    return x;
  }
  
  
  export async function createUser(connection, user) {
    const {email, password, name, phone} = user;
    const creatUserQuery = `INSERT INTO users (email, password, name, phone,  created_at, updated_at) VALUES ( '${email}', '${password}', '${name}', '${phone}', NOW(), NOW())`;
    const [created] = await connection.query(creatUserQuery);
    return created.email;
  }