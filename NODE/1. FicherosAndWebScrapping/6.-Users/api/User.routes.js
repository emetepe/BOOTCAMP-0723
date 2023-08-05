// user.routes.js
const { isAuth, isAuthAdmin } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {

  sendCode,
  registerWithRedirect,
 
} = require('../controllers/user.controllers');

const express = require('express');
const UserRoutes = express.Router();

UserRoutes.get('/register', upload.single('image'), registerWithRedirect);


//!---------------- REDIRECT-------------------------------
UserRoutes.get('/register/sendMail/:id', sendCode);
module.exports = UserRoutes;

const registerWithRedirect = async (req, res, next) => {
	// capturamos la imagen por si hay un error borrarla en cloudinary
  let catchImg = req.file?.path;

	// Importante con el async await hacerlo con un try catch
  try {
		
		// actualizamos los indexes de los elementos unicos por si acaso han variado
		await User.syncIndexes();
		// Generamos el codigo con la funcion que hicimos en utils y que tienes mas arriba
    let confirmationCode = randomCode();

		// Hacemos destructuring del email y name que viene del body 
    const { email, name } = req.body;
		
		// ---> comprobamos si existe el usuario
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );

		// SI NO EXISTE ENTONCES HACEMOS LA LÓGICA DEL REGISTER
    if (!userExist) {
			// Creamos un nuevo usuario con el req.body y le añadimos el codigo de confirmacion
      const newUser = new User({ ...req.body, confirmationCode });

			//  tenemos el archivo de la imagen le metemos el req.file.path que es donde guarda...
						// .. el middleware la URL de cloudinary
      if (req.file) {
        newUser.image = req.file.path;
      } else {
				// si no nos pasa nada le pondremos una imagen predefinida
        newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
      }
			// -----> GUARDAMOS EL USUARIO EN LA DB
      const userSave = await newUser.save();
				// ------> SI SE HA GUARDADO NOS VAMOS AL CONTROLADOR DE ENVIAR EL CÓDIGO
	
					///-----------------------------------------------------------------------------------
				 /// -------------------------LE AÑADEIS EL 307 EN EL REDIRECT -----------------------
				/// ----------------------------------------------------------------------------------
      if (userSave) {
        return res.redirect( 307, 
          `http://localhost:8081/api/v1/users/register/sendMail/${userSave._id}`
        );
      }
    } else {
			//----> SI EL USUARIO EXISTE: 
					// + Borramos la imagen de cloudinary porque si existe no registramos el user
					// + Mandamos un error de que usuario ya existe
        if (req.file) deleteImgCloudinary(catchImg)
      return res.status(409).json('this user already exist');
    }
  } catch (error) {

		// si hay un error general borramos la URL porque no hemos registrado al usuario
     if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

/// ------------------------------------------------------------------------------------
/// --------------------CONTROLADOR DE ENVIAR EL CODE  ---------------------------------
///-------------------------------------------------------------------------------------

const sendMailRedirect = async (req, res, next) => {
  try {
		// nos traemos el id de los params
    const { id } = req.params;
		// buscamos al usuario por id para luego utilizarlo para sacar el email y el codigo
    const userDB = await User.findById(id);

		// ---------------------------CONFIGURAMOS NODEMAILER -----------------------------------
    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;
		// --> 1) Configuramos el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailEnv,
        pass: password,
      },
    });
		// --> 2) creamos las opciones del envio del email
    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: 'Confirmation code',
      text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
    };
		// --> 3) enviamos el correo y gestionamos el error o el ok del envio
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
				// damos feedback al frontal de que no se ha enviado correctamente el codigo
						//TODO!  esto lo hacemos para que el frontal vuelva a enviar una request de este..
						// ... endpoint y vuelva a enviar el código al usuario.
        return res.status(404).json({
          user: userDB,
          confirmationCode: 'error, resend code',
        });
      } else {
        console.log('Email sent: ' + info.response);
				// damos feedback al frontal de que se ha enviado correctamente el codigo
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};