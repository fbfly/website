import '../styles/loading-view.sass'
import { useEffect, useContext } from 'react'
import Loading from '../public/images/loading.svg'
import CardContext from '../lib/CardContext'

const LoadingView = ({ img, title }) => {
  const { setLoading } = useContext(CardContext)
  return (
    <div className="loading-view">
      <img className="loading-img" src={img} />
      <span className="loading-title">{title}</span>
      <span className="loading-description">
        Please wait and do not close this window
      </span>
    </div>
  )
}

export default LoadingView
