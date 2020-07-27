import gql from 'graphql-tag'
import { GraphQLWrapper } from '@aragon/connect-thegraph'
import axios from 'axios'

export async function keepRunning() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000000000)
  })
}

const QUERY_REPO_BY_NAME = gql`
  query RepoData($name: String) {
    repos(where: { name: $name }) {
      id
      name
      lastVersion {
        codeAddress
        artifact
        semanticVersion
      }
    }
  }
`

export async function fetchRepo(name, subgraph) {
  // Create the GraphQL wrapper using the specific Subgraph URL
  const wrapper = new GraphQLWrapper(subgraph)

  // Invoke the custom query and receive data
  return wrapper.performQuery(QUERY_REPO_BY_NAME, {
    name,
  })
}

export async function getOrgAddress(
  selectedFilter,
  templateContract,
  transactionHash,
) {
  return new Promise((resolve, reject) => {
    const filter = templateContract.filters[selectedFilter]()

    templateContract.on(filter, (contractAddress, event) => {
      if (event.transactionHash === transactionHash) {
        templateContract.removeAllListeners()
        resolve(contractAddress)
      }
    })
  })
}

export async function getAppAddress(
  selectedFilter,
  templateContract,
  transactionHash,
) {
  return new Promise((resolve, reject) => {
    const desiredFilter = templateContract.filters[selectedFilter]()

    templateContract.on(
      desiredFilter,
      (appProxyAddress, isUpgradeable, appId, event) => {
        if (event.transactionHash === transactionHash) {
          resolve(appProxyAddress)
        }
      },
    )
  })
}

const TOKENS_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-rinkeby'

export async function getTokenManagerAddress(orgAddress) {
  const TOKEN_MANAGER_QUERY = gql`
    query {
      tokenManagers(
        where: { orgAddress: "${orgAddress}" }
      ) {
        id
        address
      }
    }
    `
  // Create the GraphQL wrapper using the specific Subgraph URL
  const wrapper = new GraphQLWrapper(TOKENS_SUBGRAPH_URL)

  // Invoke the custom query and receive data
  const results = await wrapper.performQuery(TOKEN_MANAGER_QUERY)

  console.log(results.data)

  const { address } = results.data.tokenManagers[0]

  return address
}

export const getAccountString = account => {
  const len = account.length
  return account.substr(0, 4) + '...' + account.substr(len - 3, len - 1)
}

export async function getUser(address) {
  let response
  try {
    response = await axios.get(`/api/user/${address}`)
  } catch (error) {
    console.log(error)
    return { name: getAccountString(address), address }
  }
  return { ...response.data, address }
}
