import devtools from './lib/devtools'
import additionalConfig from './config-APP_TARGET.json'

let localConfig = {}
if (localStorage && localStorage.config) {
    localConfig = JSON.parse(localStorage.config)
}


console.log('localconfig', localConfig)

export default {
    key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
    httpEndpoint: 'http://localhost:8888',
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    maxChunkLength: '1024',
    eosAccounts: [
        {
            name: "alice",
            privateKey: "5HrReeu6FhGFWiHW7tsvLLN4dm2TDhizP9B7xWi4emG9RmVfLss",
            publicKey: "EOS6Zy532Rgkuo1SKjYbPxLKYs8o2sEzLApNu8Ph66ysjstARrnHm"
        },
        {
            name: "bob",
            privateKey: "5JqvAdD1vQG3MRAsC9RVzdPJxnUCBNVfvRhL7ZmQ7rCqUoMGrnw",
            publicKey: "EOS87xyhE6czLCpuF8PaEGc3UiXHHyCMQB2zHygpEsXyDJHadHWFK"
        }
    ],
    priveos: {
        dappContract: 'demoapp',
        // privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
    },
    ...additionalConfig,
    ...localConfig
}