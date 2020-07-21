import { ethers } from 'ethers'
import FbFlyAbi from '../abis/DaiStableCoin.json'

const fbFlyContractAddress = ''

const fbFlyService = {
  contract: undefined,
  getContract: getContract,
  create: create,
  getDaoFromFbGroup: getDaoFromFbGroup,
  updateFbUser: updateFbUser,
  getFbUser: getFbUser,
}

function getContract(torusProvider) {
  if (fbFlyService.contract) {
    return fbFlyService.contract
  }
  const ethersProvider = new ethers.providers.Web3Provider(torusProvider)
  const ethersSigner = ethersProvider.getSigner()

  const fbFlyContract = new ethers.Contract(
    fbFlyContractAddress,
    FbFlyAbi.abi,
    ethersSigner,
  )
  fbFlyService.contract = fbFlyContract
}

async function create(torusProvider, groupId, metadataHash, daoAddress) {
  const fbFlyContract = fbFlyService.getContract()
  const receipt = await fbFlyContract.create(groupId, metadataHash, daoAddress)
  console.log(receipt)
}

async function getDaoFromFbGroup(torusProvider, groupId) {
  const fbFlyContract = fbFlyService.getContract()
  const fbFlyDao = await fbFlyContract.getDaoFromFbGroup(groupId)
  console.log(fbFlyDao)
  return fbFlyDao
}

async function updateFbUser(torusProvider, userId) {
  const fbFlyContract = fbFlyService.getContract()
  const fbFlyContract = new ethers.Contract(
    fbFlyContractAddress,
    FbFlyAbi.abi,
    ethersSigner,
  )
  const receipt = await fbFlyContract.updateFbUser(userId)
  console.log(receipt)
}

async function getFbUser(torusProvider, userId) {
  const fbFlyContract = fbFlyService.getContract()
  const receipt = await fbFlyContract.updateFbUser(userId)
  console.log(receipt)
}

export default fbFlyService
