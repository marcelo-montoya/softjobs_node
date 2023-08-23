const { registrarUsuarioDB, verificarCredencialesDB, obtenerDatosUsuarioLogueadoBD } = require("./consultas");

const registrarUsuario = async( email, password, rol, lenguage ) => {

    if( email != '' && password != '' && rol != '' && lenguage != '' ){
        
        try {
            await registrarUsuarioDB( email, password, rol, lenguage );
        
        } catch (error) {
            return false
        };

    } else {
        return false;
    };

    return true;
    
};


const verificarCredenciales = async( email, password ) => {

    if (email != '' && password != '') {

        try {            
            await verificarCredencialesDB( email, password );            
        } catch (error) {
            console.log(error)
            return false
        };

    } else {
        return false        
    };

    return true
    
};



const obtenerDatosUsuarioLogueado = async (email) => {

    const resultado = await obtenerDatosUsuarioLogueadoBD(email);
    return resultado;

}

module.exports = {
      registrarUsuario,
      verificarCredenciales,
      obtenerDatosUsuarioLogueado
  };





































// const getEventos = async () => {
//     const { rows: eventos } = await pool.query("SELECT * FROM eventos")
//     return eventos
// }



