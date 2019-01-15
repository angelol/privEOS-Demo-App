import config from '../config'
import ipfsAPI from 'ipfs-api'
const node = ipfsAPI(config.ipfs.domain, config.ipfs.port, { protocol: 'http' })

export function upload(data) {
    return new Promise((resolve, reject) => {
        node.files.add(Buffer.from(data)).then((files) => {
            console.log('added files', files)
            return resolve(files[0])
        })
    })
}

export function extractHashFromUrl(url) {
    let hash = url.split('/')
    console.log('hash', hash)
    return url.split('/').pop()
}


export function download(hash) {
    return new Promise((resolve, reject) => {
        console.log('ipfs download hash', hash)
        node.files.get(hash, (err, files) => {
            if (err) return reject(err)
            files = files.map((file) => {
                console.log('downloaded ipfs', file)
                console.log(file.path)
                return {
                    ...file,
                    content: file.content
                }
            })
            return resolve(files)
        })
    })
}

export function getUrl(hash) {
    return config.ipfs.gateway + hash
}

export default {
    upload,
    download,
    getUrl,
    extractHashFromUrl
}