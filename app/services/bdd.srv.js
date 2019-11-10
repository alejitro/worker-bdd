'use strict'
const shell = require('shelljs');
const fs = require('fs');
const s3 = require('../../worker-sqs/s3Storage.js') // CAMBIO: ADICIONAR DEPENDENCIA

module.exports.generate = function(req,success,error){
    var appPackage;
    var apkInstall;
    console.log(req[0]);
    switch(req.aplication){
        case 'HABITICA_WEB':
            appPackage = 'habitica';
            apkInstall = 'habitica.apk';
            break;
        case 'CALENDULA':
                appPackage = 'calendula';
                apkInstall = 'calendula.apk';
                break;
        default:
            throw error({ status: "APP_NOT_FOUND" });
    }
    if(!req.code)
        throw error( {status: "CODE_IS_NULL" }); 
    const eventsNumber = req.numberExecution ? req.numberExecution : 10;
    shell.cd(`${req.path_project}/${appPackage}`);
    shell.exec(`calabash-android gen`);
    shell.exec(`calabash-android resign ${apkInstall}`)
    shell.exec(`calabash-android run ${apkInstall}`, function(code, stdout, stderr) {
        s3.saveFileToS3(req.code,stdout,()=>{ //CAMBIO: ADICIONAR ARCHIVO DE REPORTE A S3
            console.log('Archivo creado en S3 Codigo: ',req.code);
            success('Archivo creado en S3 Codigo: ',req.code);
        });
       /* fs.writeFile(`${req.path_project}/reports/bdd/${appPackage}/${req.code}_${req.app}.txt`, stdout, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
            success(`ok`);
          }); */
      });
    
}