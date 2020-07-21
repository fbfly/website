import gql from 'graphql-tag'
import { GraphQLWrapper } from '@aragon/connect-thegraph'

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
