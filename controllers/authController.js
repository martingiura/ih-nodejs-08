const User		= require("./../models/User")
const bcryptjs = require("bcryptjs")



exports.viewRegister = (req, res) => {

	res.render("auth/signup")

}

exports.register = async (req, res) => {

	// 1. OBTENCIÓN DE DATOS DEL FORMULARIO
	const username 	= req.body.username
	const email 	= req.body.email
	const password 	= req.body.password

	// => A) VALIDACIÓN - VERIFICACIÓN DE CAMPOS VACÍOS
	// VERIFICAR QUE USERNAME, EMAIL Y PASSWORD TENGAN CONTENIDO. 
	// ES DECIR QUE NO LLEGUEN VACÍOS.
	if(!username || !email || !password){
		res.render("auth/signup", {
			errorMessage: "Uno o más campos están vacíos. Revísalos nuevamente."
		})

		return
	}


	// 2. ENCRIPTACIÓN DE PASSWORD 🚩🚩🚩
	const salt = await bcryptjs.genSalt(10)
	const passwordEncriptado = await bcryptjs.hash(password, salt)
	
	const newUser = await User.create({
		username,
		email,
		passwordEncriptado
	}) 

	console.log(newUser)
	
	// 3. REDIRECCIÓN DE USUARIO
	res.redirect("/")

}