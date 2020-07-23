import DAOPageView from '../components/DAOPageView'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import userProfile from '../public/images/user-profile.svg'

const DaoPage = () => {
  const dao = {
    name: 'Ethical Brand',
    logo: EthicalBrandLogo,
    description:
      'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
    members: '28',
    capital: '$552',
    votes: '82',
    fbLink: '',
    daoLink: '',
  }
  const user = {
    userName: 'John Doe',
    userProfile,
  }
  return <DAOPageView dao={dao} user={user} />
}

export default DaoPage
