const express     = require("express");
const bodyParser  = require("body-parser");
const userModel   = require('./models/user-models');
const app         = express();
const porta       = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.get("/", async function(req, res){

    let Tags = {
        titulo: `Posso sair de casa? - Covide-19`,
        meta_description: `Lugares mais seguros para ir, usando o seu GPS`,
        meta_keywords: `Lugares mais seguros para ir, usando o seu GPS`,
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
        meta_description: `Acessos...`,
        meta_keywords: `Acessos...`,
        og_title: `Posso sair de casa? - Covide-19`,
        meta_URL: `https://possosairdecasa.herokuapp.com/`
    };

    userModel.aggregate([ 
        { $group: { _id : null, sum : { $sum: "$views" } } }
    ])
    .then((data) =>{
        if(data.length > 0){
            res.render('pages/dados',{
                meta: Tags,
                totalVisitas: data[0].sum 
            });
        }else{
            res.render('pages/dados',{
                meta: Tags,
                totalVisitas: 0
            });
        }
    })
    .catch((err)=>{
        console.log('Erro ao calcular total de visitas', err);
    }); 
    
});

app.post("/", async function(req, res){

    let Ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //"192.168.8.178"  
   
    let userData = new userModel({
        user_ip: Ip,
        user_agent: req.body.usrAGent,
        createdAt: req.body.currentDate
    });

    let query   = { user_ip: Ip };
    let update  = { expire: new Date() };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    userModel.findOneAndUpdate(query, update, function(error, result) {
        if(result === null){

            userData.save().then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Erro ao salvar os dados."
                });
            });
        
        }else{
            userModel.findOneAndUpdate({ user_ip: Ip }, 
                { $inc: { views: 1 }}, {new: true }, (err, doc) => {
                if (err) {
                    return console.log("Erro ao incrementar o view!");
                }else{
                    return console.log("View acrescentado com  sucesso!");
                }
            });
        }
        
    });
});

app.post("/modalAberto", async function(req, res){
    let Ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
    
    userModel.findOneAndUpdate({ user_ip: Ip }, 
        { $inc: { openMenuClicks: 1 }}, {new: true }, (err, doc) => {
        if (err) {
            return console.log("Erro ao incrementar o num de click!");
        }else{
            return console.log("Numero de cliks incrementado com  sucesso!");
        }
    });
});
app.listen(porta, () => {
    console.log(`Servidor funcionado na porta ${porta}`);
});