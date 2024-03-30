
// Esse objeto JSON abaixo pode ser entendido como uma biblioteca
// de funções reutilizáveis. Se julgar útil, copie e cole a definição
// abaixo de YCAPI em seu próprio código, alterando os valores de:
//   1. YCAPI.param.tenant.id
//   2. YCAPI.param.tenant.apiMasterKey
//
const baseAddress = 'https://api.ycodify.com';

const YCAPI = {
    param: {
        tenant: {
            id: '',
            apiMasterKey: '',
        },
        account: {
            jwt: ''
        },
        app: {
            account: {
                jwt
            }
        }
    },
    persistence: {
        param: {
            baseAddress: baseAddress.concat('/v2/persistence')
        },
        create: function (data, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.persistence.param.baseAddress.concat('/c/s/no-ac'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            // O objeto de dados posto na variável 'data' precisa 
            // ser posto sob a chave 'data' no JSON a seguir. Só 
            // então o command deve ser enviado à API de serviços 
            // da Ycodify
            xhr.send(JSON.stringify({
                'action': 'CREATE',
                'data': [data]
            }));
        },
        read: function (filter, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.persistence.param.baseAddress.concat('/q/s/no-ac'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            // A consulta propriamente, posta na variável filter, 
            // precisa ser posta, ou como um elemento de um vetor
            /* xhr.send(JSON.stringify([filter])); */

            // ou como um objeto. 
            xhr.send(JSON.stringify(filter));
            // só então deve ser enviada à API de serviços da 
            // Ycodify, como uma query.

        },
        update: function (data, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.persistence.param.baseAddress.concat('/c/s/no-ac'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            // O objeto de dados posto na variável 'data' precisa 
            // ser posto sob a chave 'data' no JSON a seguir. Só 
            // então o command deve ser enviado à API de serviços 
            // da Ycodify
            xhr.send(JSON.stringify({
                'action': 'UPDATE',
                'data': [data]
            }));
        },
        delete: function (data, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.persistence.param.baseAddress.concat('/c/s/no-ac'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            // O objeto de dados posto na variável 'data' precisa 
            // ser posto sob a chave 'data' no JSON a seguir. Só 
            // então o command deve ser enviado à API de serviços 
            // da Ycodify
            xhr.send(JSON.stringify({
                'action': 'DELETE',
                'data': [data]
            }));
        }
    },
    account: {
        param: {
            baseAddress: baseAddress.concat('/v2/id')
        },
        /**
         * 
         * @param {*} account: as per specification: 
         *  {
         *    "username": "",
         *    "password": "",
         *    "email": ""
         *  }; 
         * @param {*} callback: a function to be invoked to return 
         *     the application's normal flow of execution 
         * 
         *  the function returns as:
         *  {
         *    "status": "", //The HTTP Status Code from backend,
         *    "content": {
         *      "id": "",
         *      "username": "",
         *      "name": "",
         *      "email": "",
         *      "name": "",
         *      "status": ""
         *    }
         *  }
         * 
         * if HTTP Status Code is 
         *   201, an account was found.
         *     *, request help.
         * 
         */
        create: function (account, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.account.param.baseAddress.concat('/open/account'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(JSON.stringify(account));
        },
        get: {
            /**
             * 
             * @param {*} callback: a function to be invoked to return 
             *     the application's normal flow of execution.
             * 
             *  the function returns as:
             *  {
             *    "status": "", //The HTTP Status Code from backend,
             *    "content": {
             *      "id": "",
             *      "username": "",
             *      "name": "",
             *      "email": "",
             *      "name": "",
             *      "status": ""
             *    }
             *  }
             * 
             * if HTTP Status Code is 
             *   200, an account was found.
             *   204, the account does not exist.
             *     *, request help.
             * 
             */
            byJWT: function (callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', YCAPI.account.param.baseAddress.concat('/account/by/jwt'), true);
                xhr.setRequestHeader("Content-Type", 'application/json');
                xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.app.account.jwt));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        callback({
                            status: xhr.status,
                            content: xhr.response
                        });
                    }
                };
                xhr.send(null);
            },
            byUsername: function (username, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', YCAPI.account.param.baseAddress.concat('/open/account/by/username/').concat(username).concat('/exists'), true);
                xhr.setRequestHeader("Content-Type", 'application/json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        callback({
                            status: xhr.status,
                            content: xhr.response
                        });
                    }
                };
                xhr.send(null);
            }
        }
    },
    role: {
        param: {
            baseAddress: baseAddress.concat('/v2/id')
        },
        /**
         * 
         * @param {*} role: as per specification: 
         *  {
         *    "name": "",
         *    "owner": "",
         *    "status": "[ACTIVE|SUSPENDED|CANCELED]"
         *  }; 
         * @param {*} callback: a function to be invoked to return 
         *     the application's normal flow of execution 
         * 
         *  the function returns as:
         *  {
         *    "status": "", //The HTTP Status Code from backend,
         *    "content": {
         *      "name": "",
         *      "owner": "",
         *      "status": ""
         *    }
         *  }
         * 
         * if HTTP Status Code is 
         *   201, an role was found.
         *     *, request help.
         * 
         */
        create: function (account, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.account.param.baseAddress.concat('/role'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.account.jwt));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(JSON.stringify(account));
        },
        get: {
            /**
             * 
             * @param {*} name: the role's name
             * @param {*} organizationUuid: the organizationUuid from the project organization 
             * @param {*} callback: a function to be invoked to return 
             *     the application's normal flow of execution.
             * 
             *  the function returns as:
             *  {
             *    "status": "", //The HTTP Status Code from backend,
             *    "content": {
             *      "id": "",
             *      "name": "",
             *      "owner": "",
             *      "status": ""
             *    }
             *  }
             * 
             * if HTTP Status Code is 
             *   200, an role was found.
             *   204, the role does not exist.
             *     *, request help.
             * 
             */
            byNameAndOrganization: function (name, organizationUuid, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', YCAPI.account.param.baseAddress.concat('/role/by/name/').concat(name).concat('/organization-uuid/').concat(organizationUuid), true);
                xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.account.jwt));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        callback({
                            status: xhr.status,
                            content: xhr.response
                        });
                    }
                };
                xhr.send(null);
            },
            /**
             * 
             * @param {*} organizationUuid: the organizationUuid from the project organization 
             * @param {*} callback: a function to be invoked to return 
             *     the application's normal flow of execution.
             * 
             *  the function returns as:
             *  {
             *    "status": "", //The HTTP Status Code from backend,
             *    "content": [{
             *      "id": "",
             *      "name": "",
             *      "owner": "",
             *      "status": ""
             *    }]
             *  }
             * 
             * if HTTP Status Code is 
             *   200, roles was found.
             *   204, roles does not exist.
             *     *, request help.
             * 
             */
            byOrganization: function (organizationUuid, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', YCAPI.account.param.baseAddress.concat('/role/by/organization-uuid/').concat(organizationUuid), true);
                xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.account.jwt));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        callback({
                            status: xhr.status,
                            content: xhr.response
                        });
                    }
                };
                xhr.send(null);
            }
        },
        associate: function (accountRole, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.account.param.baseAddress.concat('/account-role/using/authority'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.account.jwt));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(JSON.stringify(accountRole));
        },
    },
    filer: {
        param: {
            baseAddress: baseAddress.concat('/v2/filer')
        },
        upload: function (fileName, body, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.filer.param.baseAddress.concat('/storage/object/name/').concat(fileName), true);
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            // choose either X-API-Master-Key header or Authorization header.
            /* xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey); */
            xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.app.account.jwt));
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(body);
        },
        list: function (callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', YCAPI.filer.param.baseAddress.concat('/storage/object'), true);
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            // choose either X-API-Master-Key header or Authorization header.
            /* xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey); */
            xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.app.account.jwt));
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(null);
        },
        exist: function (fileName, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', YCAPI.filer.param.baseAddress.concat('/storage/object/name/').concat(fileName).concat('/exist'), true);
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            // choose either X-API-Master-Key header or Authorization header.
            /* xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey); */
            xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.app.account.jwt));
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(null);
        },
        get: function (fileName, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', YCAPI.filer.param.baseAddress.concat('/storage/object/name/').concat(fileName), true);
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            // choose either X-API-Master-Key header or Authorization header.
            /* xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey); */
            xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.app.account.jwt));
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(null);
            document.getElementById('global-spinner').hidden = false;
        },
        delete: function (fileName, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', YCAPI.filer.param.baseAddress.concat('/storage/object/name/').concat(fileName), true);
            xhr.setRequestHeader("X-Tenant-Id", YCAPI.param.tenant.id);
            // choose either X-API-Master-Key header or Authorization header.
            /* xhr.setRequestHeader("X-API-Master-Key", YCAPI.param.tenant.apiMasterKey); */
            xhr.setRequestHeader("Authorization", 'Bearer '.concat(YCAPI.param.app.account.jwt));
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
                xhr.send(null);
            }
        }
    },
    auth: {
        param: {
            baseAddress: baseAddress.concat('/v2/auth')
        },
        /**
         * 
         * @param {*} account: as per specification: 
         *  {
         *    "username": "",
         *    "password": ""
         *  }; 
         * @param {*} callback: a function to be invoked to return 
         *     the application's normal flow of execution 
         * 
         *  the function returns as:
         *  {
         *    "status": "",
         *    "content": {
         *      "accessToken": "",
         *      "refreshToken": "",
         *    }
         *  }
         * 
         * if HTTP Status Code is 
         *   200, the account username and password match on service.
         *     *, request help.
         * 
         */
        match: function (credentials, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', YCAPI.auth.param.baseAddress.concat('/internal/signin'), true);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback({
                        status: xhr.status,
                        content: xhr.response
                    });
                }
            };
            xhr.send(JSON.stringify(credentials));
        },
        app: {
            match: function(credentials, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', YCAPI.auth.param.baseAddress.concat('/signin'), true);
                xhr.setRequestHeader("Content-Type", 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        callback({
                            status: xhr.status,
                            content: xhr.response
                        });
                    }
                };
                xhr.send(JSON.stringify(credentials));
            }
        }
    }
}