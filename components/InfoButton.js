import '../styles/info-button.sass'
import Info from '../public/images/info.svg'

const InfoButton = ({ title, content, link }) => {
  return (
    <a className="info-button" href={link}>
      <img className="info-img" src={Info} />
      <span className="info-text">{title}</span>
    </a>
  )
}

export default InfoButton
