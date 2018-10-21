import React, { Component } from 'react'
import { connect } from 'react-redux'
import ipfs from '../lib/ipfs';
import { getPriveos } from '../lib/eos'
import { decrypt } from '../lib/crypto'


class DownloadButton extends Component {
  constructor(props) {
    super(props)
    this.download = this.download.bind(this)
  }

  download() {
    const self = this
    const hash = ipfs.extractHashFromUrl(this.props.file.url)
    if (!hash) {
      return alert('The url is not a valid ipfs url: ' + this.props.file.url)
    }
    ipfs.download(hash).then((files) => {
      const priveos = getPriveos()
      console.log('access grant', priveos.config.ephemeralKeyPublic)
      self.props.auth.eos.accessgrant(self.props.auth.user, self.props.file.uuid, priveos.config.ephemeralKeyPublic).then((accessGrantRes) => {
        console.log('accessGrantRes', accessGrantRes)
        priveos.read(self.props.auth.user, self.props.file.uuid).then((res) => {
          console.log('received read response from broker', res)
          files.map((x) => {
            const cleartext = decrypt(x.content, res[1], res[0])
            console.log('decrypted cleartext', cleartext)
          })

        })
        
      })
    })
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12"><button className="btn btn-success" onClick={this.download}>Download</button></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
