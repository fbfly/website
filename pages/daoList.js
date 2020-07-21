import DAOListView from '../components/DAOListView'
import '../styles/connect.sass'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import MoralBrandLogo from '../public/images/section2.svg'
import userProfile from '../public/images/user-profile.svg'

const DaoList = () => {
  const list = [
    {
      name: 'Ethical Brand',
      logo: EthicalBrandLogo,
      description:
        'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
      members: '28',
      capital: '$552',
      votes: '82',
      fbLink: '',
      daoLink: '',
    },
    {
      name: 'Moral Brand',
      logo: MoralBrandLogo,
      description:
        'Fast fashion is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.',
      members: '105',
      capital: '$1,285',
      votes: '533',
      fbLink: '',
      daoLink: '',
    },
  ]
  const user = {
    userName: 'John Doe',
    userProfile,
  }
  return <DAOListView list={list} user={user} />
}

export default DaoList
