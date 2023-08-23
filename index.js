const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const {apiSecret, tokenExpireTime} = require('./config');

const { registrarUsuario, verificarCredenciales, obtenerDatosUsuarioLogueado } = require('./modules/controlador');

const app = express();
app.listen(3000, console.log("SERVER ON"));

app.use(cors());
app.use(express.json());


app.post("/usuarios", async (req, res) => {
  
    const { email, password, rol, lenguage } = req.body;
    const result = await registrarUsuario( email, password, rol, lenguage );

    if (result) {
        res.status(200).send('Post agregado');
    } else {
        res.status(500).send('Ha ocurrido un error');
    };

});



app.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;
    await verificarCredenciales( email, password );
    const token = jwt.sign({ email }, apiSecret, {expiresIn: tokenExpireTime});
    res.send(token);

  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error.message || 'Ha ocurrido un error');
  };

});



app.get('/usuarios', async (req, res) => {

  const Authorization = req.header('Authorization');
  const token = Authorization.split('Bearer ')[1];
  jwt.verify(token, apiSecret);
  const { email } = jwt.decode(token);
  const resultado = await obtenerDatosUsuarioLogueado(email);
  res.json(resultado);

});
















































// app.get("/eventos", async (req, res) => {
//   try {
//       const eventos = await getEventos()
//       res.json(eventos)
//   } catch (error) {
//       res.status(error.code || 500).send(error.message)
//   }
// });
