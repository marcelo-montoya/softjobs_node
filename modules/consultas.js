const pool = require('./conexion');
const bcrypt = require('bcryptjs');

const registrarUsuarioDB = async( email, password, rol, lenguage ) => {

    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
    const values = [email, passwordEncriptada, rol, lenguage];

    try {
          await pool.query(consulta, values);        
      } catch (error) {
        return
      };
}


const verificarCredencialesDB = async ( email, password ) => {

  const consulta = 'SELECT * FROM usuarios WHERE email = $1 AND password = $2';
	const values = [email, password];

  try {
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount){
      return false
    }
  } catch (error) {
    return false
  }
  return true
};


const obtenerDatosUsuarioLogueadoBD = async (email) => {
  const consulta = 'SELECT * FROM usuarios WHERE email = $1';
	const values = [email];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

module.exports = {
    registrarUsuarioDB,
    verificarCredencialesDB,
    obtenerDatosUsuarioLogueadoBD
}