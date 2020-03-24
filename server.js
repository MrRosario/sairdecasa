const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();
const porta = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.get("/", async function(req, res){
    let Tags = {
        titulo: `Posso sair de casa? - Covide-19`,
        meta_description: `Veja os lugares mais seguros onde você pode ir, usando o seu GPS`,
        meta_keywords: `Veja os lugares mais seguros onde você pode ir, usando o seu GPS`,
        og_title: `Posso sair de casa? - Covide-19`,
        meta_URL: `https://possosairdecasa.herokuapp.com/`
    };
    res.render('pages/index',{
        meta: Tags,
    });
});

app.get("/dados", async function(req, res){
    let Tags = {
        titulo: `Posso sair de casa? - Covide-19`,
        meta_description: `Veja os lugares mais seguros onde você pode ir, usando o seu GPS`,
        meta_keywords: `Veja os lugares mais seguros onde você pode ir, usando o seu GPS`,
        og_title: `Posso sair de casa? - Covide-19`,
        meta_URL: `https://possosairdecasa.herokuapp.com/`
    };
    res.render('pages/dados',{
        meta: Tags,
    });
});
app.listen(porta, () => {
    console.log(`Servidor funcionado na porta ${porta}`);
});