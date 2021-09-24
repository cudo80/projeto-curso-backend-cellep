/** npm install express
 * npm install ejs
 */

//importando o express
const express= require('express')
//criando um objeto express na variável app
const app= express()

const session = require('express-session')

//configurando a ejs
app.set('view engine', 'ejs')
//definindo o caminho das views ejs
app.set('views', './app/views')
//configurações de arquivos estáticos
app.use(express.static('./app/public'))

//const noticias= require('./mockup.js')
const dbConnection= require('./dbConnection')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// confirguração express-session
app.use(session({
    secret: '~kXs4d-mh<CXC3v=', //chave de segurança usada na assinatura dos identificadores da sessão
    resave: false, //otimiza para que a sessão não seja salva novamente
    saveUninitialized: false //otimiza o uso do aramzenamento no servidor
}))

//criando nossa primeira rota
app.get('/', async (req, res) => {
    //consulta SQL
    var result= await dbConnection.query('SELECT * FROM noticias order by id_noticia desc limit 3')
    res.render("home/index", {noticias:result.rows, title:'Home'})
})

//criando a rota para a notícia
app.get('/noticia', async (req, res) => {
    var id= req.query.id
    let result= await dbConnection.query('SELECT * FROM noticias WHERE id_noticia= $1', [id])
    res.render("noticias/noticia", {noticia:result.rows[0], title: 'noticia'})
})

//criando nossa segunda rota
app.get('/noticias', async (req, res) => {
    var result= await dbConnection.query('SELECT * FROM noticias ORDER BY id_noticia desc')
    res.render("noticias/noticias", {noticias:result.rows, title: 'noticias'})
})

//criando a rota para admin
app.get('/admin', async (req, res) => {
    if(req.session.autorizado){
        res.render("admin/form_add_noticia", {autorizado: req.session.autorizado})
    } else {
        res.render('admin/login')
    }
    
})

app.post('/admin/salvar-noticia', async (req, res) =>{
    let {titulo, conteudo}= req.body
    await dbConnection.query('INSERT INTO noticias(titulo, conteudo) VALUES($1,$2)', [titulo, conteudo], (err, result) =>{
        res.redirect('/noticias')
    })
})

//rota responsável por autenticar o usuário
app.post('/admin/autenticar', async(req, res) =>{
    const {usuario, senha} = req.body

    if(usuario == 'root' && senha == 'cellep1234'){
        req.session.autorizado = true
    }

    res.redirect('/admin')
})

app.get('/admin/sair', async (req, res) => {
    req.session.destroy((err) => {})
    res.redirect('/admin')
})

//iniciando o servidor na porta 3000
app.listen( process.env.PORT || 3000, () => {
    console.log('Escutando na port 3000 ')
    console.log('Pressiona CRTL+C para encerrar o sevidor')
})