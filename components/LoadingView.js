import styles from './LoadingView.module.sass'
import { useEffect, useContext } from 'react'
import Loading from '../public/images/loading.svg'
import CardContext from '../lib/CardContext'

const LoadingView = ({ img, title }) => {
  const { setLoading } = useContext(CardContext)
  return (
    <div className={styles.loadingView}>
      <img className={styles.loadingImg} src={img} />
      <span className={styles.loadingTitle}>{title}</span>
      <span className={styles.loadingDescription}>
        Please wait and do not close this window
      </span>
    </div>
  )
}

export default LoadingView
