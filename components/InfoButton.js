import styles from './InfoButton.module.sass'
import Info from '../public/images/info.svg'

const InfoButton = ({ title, content, link }) => {
  return (
    <a className={styles.infoButton} href={link}>
      <img className={styles.infoImg} src={Info} />
      <span className={styles.infoText}>{title}</span>
    </a>
  )
}

export default InfoButton
