const db = require('./models/index');

function setTimeZone(date) {
    date.setHours(date.getHours() - 3);
    return date;
}

function formatData(isHoje) {
	let data = new Date();
	data = setTimeZone(data);

	if (!isHoje) {
		data.setDate(data.getDate() + 1);
	}
	
	const dia = String(data.getDate()).padStart(2, '0');
	const mes = String(data.getMonth() + 1).padStart(2, '0');
	const ano = data.getFullYear();
	
	dataAtual = ano + '-' + mes + '-' + dia;
	dataAtual += isHoje ? ' 03:00:00' : ' 02:59:59'
	
	return dataAtual
}

function getRadiacao() {
	return db.sequelize.query(
		'SELECT AVG(umidade_relativa_max) as VALOR_OBSERVADO from dados where createdAt >= :hoje and createdAt <= :amanha',
		{
			  replacements: {
				hoje: formatData(true),
				amanha: formatData(false),
			},
			plain: true,
			type: db.sequelize.QueryTypes.SELECT
		}
	);
}

exports.handler = async (event) => {
    const response = await getRadiacao();
    return response;
};