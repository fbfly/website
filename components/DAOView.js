import styles from './DAOView.module.sass'
import FbLogo from '../public/images/fb-logo.svg'
import { useContext, useState, useEffect } from 'react'
import CardContext from '../lib/CardContext'

const tempData = {
  name: 'Ethical Brand',
  logoHash: 'bafybeidsm72bt7kspzyfh4bbtoxmqvsxgt3su25afb77h23t4uw4ys3dtm',
  description:
    'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
}

const DAOView = () => {
  const { name, logoHash, description } = useContext(CardContext)
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
    <div className={styles.cardInner}>
      <div className={styles.daoLogo}>
        <img
          className={styles.daoLogoImg}
          src={`data:image/svg+xml;utf8,${logoFile}`}
        />
      </div>
      <div className={styles.daoTitle}>{name}</div>
      <a className={styles.daoFbLink}>
        <img className={styles.fbLogoImg} src={FbLogo} />
        Go to our Facebook Group
      </a>
      <div className={styles.daoContent}>
        <div className={styles.daoContentAbout}>
          <div className={styles.daoContentTitle}>About {name}</div>
          <div className={styles.daoContentDescription}>
            {description}
            <a className={styles.moreLink}>Read more</a>
          </div>
        </div>
        <div className={styles.daoContentCountsContainer}>
          <div className={styles.daoContentCount}>
            <span className={styles.countTitle}>Members</span>
            <span className={styles.countValue}>{members}</span>
            <a className={styles.countLink}>View more</a>
          </div>
          <div className={styles.daoContentCount}>
            <span className={styles.countTitle}>Capital</span>
            <span className={styles.countValue}>{capital}</span>
            <a className={styles.countLink}>View more</a>
          </div>
          <div className={styles.daoContentCount}>
            <span className={styles.countTitle}>Votes</span>
            <span className={styles.countValue}>{votes}</span>
            <a className={styles.countLink}>View more</a>
          </div>
        </div>
      </div>
      <a className={styles.daoDonateButton}>Donate to {name}</a>
    </div>
  )
}

export default DAOView
