const db = require('./models/index');

// function teste() {
// 		return db.dados.create({
// 		radiacao: 'teste rad',
// 		temp_inst:'teste temp',
// 		umidade_relativa_max: 'teste umidade',
// 		temp_min: 'teste min',
// 		temp_max: 'teste max'
// 		});
// }

// teste().then(dados => {
// 	console.log('tudo certo')
// }).catch(() => console.log('tudo errado'))
// console.log('inseriu')

// exports.handler = async (event) => {

// 	const dadoCriado = await db.dados.bulkCreate({
// 		radiacao: 'teste rad',
// 		temp_inst:'teste temp',
// 		umidade_relativa_max: 'teste umidade',
// 		temp_min: 'teste min',
// 		temp_max: 'teste max'
// 		});
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: dadoCriado,
//     };
	
//     return response;
// };

function mountData(data) {
	data = JSON.parse(data);
	let record = {}

	record.hora = data.HORA,
	record.dc_nome = data.DC_NOME
	record.cd_estacao = data.CD_ESTACAO
	record.vl_latitude = data.VL_LATITUDE
	record.vl_longitude = data.VL_LONGITUDE
	record.temp_max = data.TEM_MAX
	record.temp_inst = data.TEM_INS
	record.temp_min = data.TEM_MIN
	record.umidade_relativa_max = data.UMD_INS
	record.radiacao = data.RAD_GLO

	return record;

}

exports.handler = async (event, context) => {
    let success = 0;
    let failure = 0;
    const output = event.records.map((record) => {
        try {
            let data = record.data;
             let buff = new Buffer(data, 'base64');
             let text = buff.toString('ascii');
            return mountData(text);
        } catch (err) {
            failure++;
        }
    });

	await db.dados.bulkCreate(output);
    console.log(output)
    console.log(JSON.stringify(output))
    console.log(`Successful delivered records, Failed delivered records ${failure}.`);
    return { records: output };
};
