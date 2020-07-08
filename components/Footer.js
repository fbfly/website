import FbFlyText from '../public/images/fbfly-text.svg'

const Footer = props => (
  <footer className="footer">
    <img
      src={FbFlyText}
      style={{
        float: 'left',
        height: '80px',
        width: '60px',
      }}
    ></img>
    <style jsx>
      {`
        footer {
          position: fixed;
          left: 60px;
          bottom: 0px;
          height: 0px;
          width: 100%;
        }
      `}
    </style>
  </footer>
)

export default Footer
