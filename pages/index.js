import { useUser } from '../lib/hooks'
import '../styles/styles.sass'

const Home = () => {
  const user = useUser()

  return (
    <div>
      <section className="section">
        <div className="container">
          <h1 className="title">Facebook Fly</h1>
        </div>
      </section>
    </div>
  )
}

export default Home
