const { Pool } = require('pg')

const client = new Pool({
    connectionString: process.env.DATABASE_URL || '...',
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
