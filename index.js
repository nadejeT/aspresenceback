var mysql = require('mysql');
const host = 'localhost';
const user = 'root';
const password = 'root';
var express = require('express');
var app = express();
var bodyParser =require("body-parser");
var port=3000;


var connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password : password,
    database: 'hala8589_kikelas'
});

app.set('port', process.env.PORT || port);
app.listen(app.get('port'), function () {
console.log('server is running on port ',app.get('port'));
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
connection.connect();



app.get('/', function(req, res) {
    connection.query('SELECT * FROM `asp_users` ', function(error, results, fields) {
      if (results.length > 0) {
        for (i = 0; i < results.length; i++)
          console.log("id : " + results[i].login + " valeur " + results[i].pswd);
      }
      res.json(results);
    });
  })

  app.get('/login1', function(req, res) {
    login = req.query.login;
    pswd = req.query.pswd;
    var params =[login, pswd];
    var sql = "SELECT * , etablissement.email AS emailEtab FROM asp_users INNER JOIN etablissement WHERE login = ? AND pswd = ? AND asp_users.établissement = etablissement.idetablissement ";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
      res.json(results);
    });
  })

  app.get('/login', function(req, res) {
    login = req.query.login;
    pswd = req.query.pswd;
    var params =[login, pswd];
    var sql = "SELECT * , asp_users.email as userEmail, etablissement.email AS emailEtab FROM asp_users INNER JOIN etablissement WHERE login = ? AND pswd = ? AND asp_users.établissement = etablissement.idetablissement LIMIT 1";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results[0]);
    });
  })

  app.get('/getAllEleve', function(req, res) {
    connection.query('SELECT * FROM `eleve` ', function(error, results, fields) {
      if (results.length > 0) {
        for (i = 0; i < results.length; i++)
          console.log("id : " + results[i].id + " valeur " + results[i].valeur);
      }
      res.json(results);
    });
  })

  app.post('/inscription', function(req, res) {
    ins = req.body.ins;
    id = req.body.id;
    var parametre =[ins,id];
    var sql = "UPDATE eleve SET Inscrit = ? WHERE id = ?";
    connection.query(sql, parametre, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results[0]);
    });
  })

  // CREATION ACTIVITE
  app.get('/academie', function(req, res) {
    var sql = "SELECT * FROM acad";
    connection.query(sql, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results+"");
        res.json(results);
    });
  })

  app.get('/ville', function(req, res) {
    depcode = req.query.depcode;
    var params =[depcode];
    var sql = "SELECT * from academie WHERE DepCode = ?";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.get('/installation', function(req, res) {
    cominsee = req.query.cominsee;
    var params =[cominsee];
    var sql = "SELECT * from installation WHERE ComInsee = ?";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.get('/equipement', function(req, res) {
    insnumeroinstall = req.query.insnumeroinstall;
    var params =[insnumeroinstall];
    var sql = "SELECT * from equipement WHERE InsNumeroIstall = ?";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.get('/championnat', function(req, res) {
    
    var sql = "SELECT * from championnat ";
    connection.query(sql, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.get('/transport', function(req, res) {
    
    var sql = "SELECT * from transport ";
    connection.query(sql, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })
  app.get('/niveau', function(req, res) {
    
    var sql = "SELECT * from competition ";
    connection.query(sql, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })
  app.get('/activite', function(req, res) {
    
    var sql = "SELECT * from activite ";
    connection.query(sql, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.get('/accompagnateur', function(req, res) {
    idetablissement = req.query.idetablissement;
    login = req.query.login;
    var niv =2;
    var params =[idetablissement,niv,login];
    var sql = "SELECT * from asp_users WHERE établissement = ? AND Niveau = ? AND login <> ? ";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.post('/addEntete', function(req, res) {
    idprof = req.body.idprof;
    entetedate = req.body.entetedate;
    enteteheure= req.body.enteteheure;
    Acad= req.body.Acad;
    academie= req.body.academie;
    departement= req.body.departement;
    ville= req.body.ville;
    installation= req.body.installation;
    equipement= req.body.equipement;
    niveau= req.body.niveau;
    championnat= req.body.championnat;
    transport= req.body.transport;
    activite= req.body.activite;
    accompagnateur= req.body.accompagnateur;
    idetablissement= req.body.idetablissement;
    heurefin= req.body.heurefin;
    terminer= req.body.terminer;
    var params =[idprof,entetedate,enteteheure,Acad,academie,departement,ville,installation,equipement,niveau,championnat,transport,activite,accompagnateur,idetablissement,heurefin,terminer];
    var sql = "INSERT INTO entete (idprof,entetedate,enteteheure,Acad,academie,departement,ville,installation,equipement,niveau,championnat,transport,activite,accompagnateur,idetablissement,heurefin,terminer)"+
              "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log('ID NOUVELLE ACTIVITE' + results.insertId);
        res.json(JSON.parse('{"idnvactivite":'+results.insertId+'}'));
    });
  })

  app.get('/entete', function(req, res) {
    
    var sql = "SELECT * from entete ";
    connection.query(sql, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
        
    });
  })

  // LIGNE 
  app.get('/getEleveInscrit', function(req, res) {
    idprof = req.body.idprof;
    var val = "Y";
    var params=[val];
    sql = 'SELECT * FROM `eleve` WHERE Inscrit = ?';
    connection.query(sql, params, function(error, results, fields) {
      if (results.length > 0) {
        for (i = 0; i < results.length; i++)
        {
          console.log("id : " + results[i].id + " valeur " + results[i].valeur);
        }
      }
      res.json(results);
    });
  })

  app.post('/getandseteleveinscrit', function(req, res) {
    identete = req.body.identete;
    presence = req.body.presence;
    heurearrive = req.body.heurearrive;
    heuredepart = req.body.heuredepart;
    commentaire = req.body.commentaire;
    idetablissement = req.body.idetablissement;
    var val = "Y";
    var params=[val];
    
    sql = " SELECT * FROM `eleve` WHERE Inscrit = ? ";
    sqlsecond = "INSERT INTO ligne (identete,ideleve,presence,heurearrive,heuredepart,commentaire,idetablissement) VALUES(?,?,?,?,?,?,?)";
    connection.query(sql, params, function(error, results, fields) {
      if (results.length > 0) {
        for (i = 0; i < results.length; i++)
        {
          console.log("id : " + results[i].id);
          var paramdeux = [identete,results[i].id,presence, heurearrive,heuredepart,commentaire,idetablissement];
          connection.query(sqlsecond, paramdeux, function(error, results, fields) {
            if(error){
                throw error;
                console.log("Il y a une erreur");
            }    
            console.log('Nouvelle entete'+ identete);
           // res.json(results.insertId);
        });
        }
      }
      res.json(results);
    });
  })

  app.post('/presence', function(req, res) {
    presence = req.body.presence;
    heuredepart = req.body.heuredepart;
    commentaire = req.body.commentaire;
    idligne = req.body.idligne;
    var parametre =[presence,heuredepart,commentaire,idligne];
    var sql = "UPDATE ligne SET presence = ?, heuredepart = ?, commentaire = ?  WHERE idligne = ?";
    connection.query(sql, parametre, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results[0]);
    });
  })

  app.get('/getAllLigne', function(req, res) {
    identete = req.query.identete;
    var params =[identete];

    var sql = "SELECT ligne.idligne,ligne.identete,ligne.ideleve,ligne.presence,ligne.heurearrive,ligne.heuredepart,ligne.commentaire,ligne.idetablissement, eleve.Nom, eleve.Prenom from ligne INNER JOIN eleve WHERE  ligne.ideleve = eleve.id AND identete = ? ";
    //var sqldx = "SELECT *, ligne.idligne,ligne.identete,ligne.ideleve,ligne.presence,ligne.heurearrive,ligne.heuredepart,ligne.commentaire,ligne.idetablissement, eleve.Nom, eleve.Prenom from ligne INNER JOIN eleve WHERE identete = "+identete+" AND ligne.ideleve = eleve.id";

    connection.query(sql, identete, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })
  // Entete
  app.get('/getAllEntete', function(req, res) {
    var i = "N";
    var params =[i];
    var sql = "SELECT * from entete WHERE terminer = ?";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.post('/finirActivite', function(req, res) {
    terminer = "Y";
    id = req.body.id;
    heurefin = req.body.heurefin;
    var parametre =[terminer,heurefin,id];
    var sql = "UPDATE entete SET terminer = ?, heurefin = ?  WHERE id = ?";
    connection.query(sql, parametre, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results[0]);
    });
  })

  app.get('/rapportentete', function(req, res) {
    var i = "Y";
    var params =[i];
  /*  var sql = "SELECT entete.id,entete.idprof,entete.entetedate,entete.enteteheure,entete.Acad,entete.academie,entete.departement,entete.ville,"+
    "entete.installation,entete.equipement,entete.niveau,entete.championnat,entete.transport,entete.activite,entete.accompagnateur,entete.idetablissement,entete.heurefin,entete.terminer,"+
    "entete.idprof, asp_users.name from entete INNER JOIN asp_users WHERE entete.idprof = asp_users.login AND terminer = ? "; */
    var sql="SELECT * from entete";
    connection.query(sql, params, function(error, results, fields) {
        if(error){
            throw error;
            console.log("Il y a une erreur");
        }    
        console.log(results[0]+"");
        res.json(results);
    });
  })

  app.get('/getElevePresent', function(req, res) {
    identete = req.query.identete;
    var val = "Y";
    var params=[val,identete];
    sql = "SELECT ligne.idligne, ligne.identete, ligne.ideleve, ligne.presence, ligne.heurearrive, ligne.heuredepart, ligne.commentaire, ligne.idetablissement, eleve.Nom, eleve.Prenom  FROM `ligne` INNER JOIN eleve WHERE ligne.ideleve = eleve.id AND ligne.presence = ? AND ligne.identete = ? ";
   //sql = "SELECT * from ligne WHERE presence = ? AND identete = ?"; 
  connection.query(sql, params, function(error, results, fields) {
      if (results.length > 0) {
        for (i = 0; i < results.length; i++)
        {
          console.log("id : " + results[i].id + " valeur " + results[i].valeur);
        }
      }
      res.json(results);
    });
  })