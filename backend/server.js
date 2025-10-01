// Importar bibliotecas
const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")

// Configurar servidor
const app = express()
const PORT = 3000

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

// Criar banco sqlite 
const db = new sqlite3.Database("./database.db")

// Criar tabela usuarios
db.run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    titulo TEXT,
    autor TEXT,
    anodepublicacao TEXT,
    genero TEXT,
    idioma TEXT,
    preco REAL


    )
`)

app.get("/", async (req, res) => {
    res.json({
        "teste": "ok"
    })
})

// Cadastrar usuário
app.post("/livros", async (req, res) => {
    console.log(req.body);    

    let nome = req.body.nome
    let título = req.body.título
    let autor = req.body.autor 
    let anodepublicação = req.body.anodepublicação
    let genêro = req.body.genêro
    let idioma = req.body.Idioma 
    let preço = req.body.Preço 

    // inserir no banco de dados
    db.run(`INSERT INTO livros (nome, titulo, autor, anodepublicacao, genero, idioma, preco) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nome, titulo, autor, anodepublicacao, genero, idioma, preco ],

        res.json({
            id: this.lastID,
            nome,
            titulo, 
            autor,
            anodepublicacao,
            genero,
            idioma,
            preco,


            
        })
    )
})

// Listar todos os usuários
app.get("/livros", (req, res) => {
    db.all(`SELECT id, nome, título, autor, anodepublicação, gênero, idioma, preço FROM livros`, [], (err, rows) =>{
        res.json(rows)
    })
})

// Selecionar um usuário
app.get("/livros/:id", (req, res) => {
    let idLivros = req.params.id;

    db.get(`SELECT id, nome, título, autor, anodepublicação, gênero, idioma, preço FROM livros
        WHERE id = ?`,
    [idUsuario], (err, result) => {
        if(result){
            res.json(result)
        } else {
            res.status(404).json({
                "message" : "Livro não encontrado."
            })
        }
    })
})

// Deletar usuário
app.delete("/livros/:id", (req, res) => {
    let idLivros = req.params.id

    db.run(`DELETE FROM livros WHERE id = ?`, 
    [idLivros], function(){
        // verifica se houve alteração no DB
        if(this.changes === 0){
            res.status(404).json({
                "message" : "Livro não encontrado"
            })
        }

        res.json({
            "message" : "Livro deletado"
        })
    })    
})

// Editar usuário
app.put("/livros/:id", async (req, res) => {
    let idLivros = req.params.id

    let nome = req.body.nome
    let título = req.body.título
    let autor = req.body.autor
    let anodepublicação = req.body.anodepublicação
    let genêro = req.body.genêro
    let idioma = req.body.idioma    
    let preço = req.body.preço

    db.run(`UPDATE livros SET nome = ?, título = ?, autor = ?, anodepublicação = ?, gênero = ?, idioma = ?, preço = ? 
        WHERE id = ?`, [nome, título, autor, anodepublicação, genêro, idioma, preço],
        function(){
            res.json({
                "message" : "Livro atualizado com sucesso"
            })
        })
})


// Iniciar o server
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));








  