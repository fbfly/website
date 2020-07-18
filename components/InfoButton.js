import '../styles/info-button.sass'
import Info from '../public/images/info.svg'

const InfoButton = ({ title, content }) => {
  return (
    <div className="info-button">
      <img className="info-img" src={Info} />
      <span className="info-text">{title}</span>
    </div>
  )
}

export default InfoButton
