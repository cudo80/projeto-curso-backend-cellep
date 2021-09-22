const { Pool } = require('pg')

const client = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://aconmgdxqeqiak:840dee4c674360312329a7332dc8889204dc0b7c1cf4738413ced480a7859cc4@ec2-18-209-143-227.compute-1.amazonaws.com:5432/daglmgcbo4jka5',
    ssl:{
        rejectUnauthorized: false
    }
})

//teste de conexão

//async function conectTeste(){
//    const res= client.query('SELECT $1:: text as message',['Olá Mundo'], (err, result) => {console.log(result.rows[0].messsage)})
//}

//conectTeste()

module.exports= client