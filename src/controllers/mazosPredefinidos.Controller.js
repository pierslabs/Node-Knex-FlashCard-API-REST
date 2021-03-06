const db = require('../config/db');
const helper = require('../helper/helpers');


exports.insertMazoPredefinido = async(req, res) => {
	const recibido = req.body;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID_categorias','nombre'],recibido );

	if(array_json_validator === false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}

	// Comprobamos que solo el administrador puede crear nuevas cartas
	if(reqUser.rol !== 'admin'){
		res.status(401).json('No eres admin');
		return;
	}

	// realizamos la consulta
	const result = await db('mazos_predefinidos')
		.insert({
			Id_categorias : recibido.ID_categorias,
			nombre: recibido.nombre
		})

	res.json({status: true, data: result})
}

exports.getMazosPredefinidos = async(req, res) => {
	const recibido = req.query;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID'],recibido );

	if(array_json_validator === false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}

	const consult = await db('mazos_predefinidos')
    .innerJoin(' mazos_predefinidos_tarjeta',  
			'mazos_predefinidos_tarjeta.ID_mazos_predefinidos',
			'mazos_predefinidos.ID')   
		.select( 'mazos_predefinidos.nombre as mazo_predefinido','mazos_predefinidos_tarjeta.pregunta', 'mazos_predefinidos_tarjeta.respuesta')
   	.where('mazos_predefinidos.ID', recibido.ID)// si queremos todos los mazos 'ID_categorias'
	

	res.json({status: true, data:consult});
}

exports.getListMazosPredefinidos = async(req, res) => {
	const enviado = req.query;

		// validamos que todos los campos que recibe la API  sean los correctos
		const array_json_validator = helper.require_data(['ID_categorias'],enviado );

		if(array_json_validator === false){
			res.status(401).json({status:false, data:'Faltan datos obligatorios'});
			return;
		}

	const consult = await db
	.select('*')
	.from ('mazos_predefinidos')
	.where('ID_categorias', enviado.ID_categorias)

	res.json({status: true, data:consult});

};

exports.updateMazosPredefinidos = async(req, res) => {
	const recibido = req.body;
	
	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID','nombre'],recibido );

	if(array_json_validator === false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}
	
	// comprobamos que solo el admin puede actualizar los datos
	if(reqUser.rol !== 'admin'){
		res.status(401).json('No eres admin');
		return;
	}
	
	// realizamos la Query
	const result = await db('mazos_predefinidos')
	.update('nombre',recibido.nombre)
	.update('ID_categorias',recibido.ID_categorias)
	.where('ID', recibido.ID)
	
	res.json({status: true, data: result});
}


exports.deleteMazosPredefinidos = async(req, res) => {
	const recibido = req.body;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID'], recibido );

	if(array_json_validator === false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}

	// comprobamos que solo el admin puede borrar una carta
	if(reqUser.rol != 'admin'){
		res.status(401).json('No eres admin');
		return;
	}
	
	const result = await db('mazos_predefinidos')
	.where('ID', recibido.ID)
	.delete();
	
	res.json({status: true, data: result});
}
