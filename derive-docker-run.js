const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

const args = [];
let inspect;
fs.readFileAsync('inspect.json', 'utf-8')
    .then(JSON.parse)
    .then(function (parsed) {
        inspect = parsed[0];
    }).then(function () {
        if (inspect.Config.Tty) {
            args.push('-it');
        }
    }).then(function () {
        inspect.Config.Env.sort();
        inspect.Config.Env.forEach(function (elt) {
            args.push(`-e ${elt}`);
        });
    }).then(function () {
        if (inspect.NetworkSettings.Ports) {
            _.each(inspect.NetworkSettings.Ports, function (value, key) {
                args.push(`-p ${value[0].HostIp}:${value[0].HostPort}:${key}`);
            });
        }
        if (inspect.NetworkSettings.Networks) {
            Object.keys(inspect.NetworkSettings.Networks).forEach(function (network) {
                args.push(`--net ${network}`);
            });
        }
    }).then(function () {
        if (inspect.HostConfig.Binds) {
            inspect.HostConfig.Binds.forEach(function (bind) {
                args.push(`-v ${bind}`);
            });
        }
    }).then(function () {
        args.push(inspect.Config.Image);
    }).then(function () {
        console.log('docker run --rm -it \\');
        args.forEach(function (arg) {
            console.log(`    ${arg} \\`);
        });
        console.log('    bash')
    });

