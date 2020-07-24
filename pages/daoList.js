import DAOListView from '../components/DAOListView'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import MoralBrandLogo from '../public/images/section2.svg'
import userProfile from '../public/images/user-profile.svg'
import useSWR from 'swr'

const DaoList = () => {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/dao', fetcher)
  if (!data) {
    console.log('Loading...')
  } else {
    console.log(data)
  }
  let list = []
  data.forEach(({ daoAddress, daoName }) =>
    list.push({
      name: daoName,
      logo: EthicalBrandLogo,
      description: `${daoName} is easy for consumers because it’s just that: fast and inexpensive. Lasting for only a season or so, it’s easy for us to end up with clothes that tatter and rip after just a few wear.`,
      members: '28',
      capital: '$552',
      votes: '82',
      fbLink: '',
      daoLink: '',
    }),
  )
  const user = {
    userName: 'John Doe',
    userProfile,
  }
  return <DAOListView list={list} user={user} />
}

export default DaoList
