import '../styles/dao-view.sass'
import FbLogo from '../public/images/fb-logo.svg'
import { useContext, useState, useEffect } from 'react'

const tempData = {
  name: 'Ethical Brand',
  logoHash: 'bafybeidsm72bt7kspzyfh4bbtoxmqvsxgt3su25afb77h23t4uw4ys3dtm',
  description:
    'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
}

const DAOView = () => {
  const { name, logoHash, description } = useContext(UserContext)
  const members = '28'
  const capital = '552$'
  const votes = '82'

  const [logoFile, setLogoFile] = useState('')

  useEffect(() => {
    fleekStorage
      .getFileFromHash({
        hash: logoHash,
      })
      .then(logoFile => setLogoFile(encodeURIComponent(logoFile)))
  }, [logoHash])

  return (
    <div className="card-inner">
      <div className="dao-logo">
        <img
          className="dao-logo-img"
          src={`data:image/svg+xml;utf8,${logoFile}`}
        />
      </div>
      <div className="dao-title">{name}</div>
      <a className="dao-fb-link">
        <img className="fb-logo-img" src={FbLogo} />
        Go to our Facebook Group
      </a>
      <div className="dao-content">
        <div className="dao-content-about">
          <div className="dao-content-title">About {name}</div>
          <div className="dao-content-description">
            {description}
            <a className="more-link">Read more</a>
          </div>
        </div>
        <div className="dao-content-counts-container">
          <div className="dao-content-count">
            <span className="count-title">Members</span>
            <span className="count-value">{members}</span>
            <a className="count-link">View more</a>
          </div>
          <div className="dao-content-count">
            <span className="count-title">Capital</span>
            <span className="count-value">{capital}</span>
            <a className="count-link">View more</a>
          </div>
          <div className="dao-content-count">
            <span className="count-title">Votes</span>
            <span className="count-value">{votes}</span>
            <a className="count-link">View more</a>
          </div>
        </div>
      </div>
      <a className="dao-donate-button">Donate to {name}</a>
    </div>
  )
}

export default DAOView
