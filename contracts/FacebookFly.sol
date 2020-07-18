pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

/*

metadata json of DAO
 {
     "name": "Ethical brand",
     "description:" "Something about the brand",
     "currency": "Ethical",
     "logo": "asdasdsad" //this is a ipfs hash of the logo
}

this metadata will be uploaded to IPFS for each dao we create 
and we shall store the IPFS hash in the smart contract
can use IPLD for this as well: 
https://github.com/ipld/js-ipld-dag-cbor

*/

contract FacebookFly {
    
    struct fbFlyDao {
        address creator;
        string fbGroupId;  
        string metadataHash; 
        address daoAddress;    
    }
    
    mapping (uint => fbFlyDao) daos;
    uint daosCount = 0;
    
    mapping (string => uint) fbGroupToDao;
    
    constructor() public {
        daos[0] = fbDao(msg.sender, "fbFly", "ipfsHashContainingMetadataJson", 0xDAd714F1fF59F427f203ac1d056d80616E7b807B);
        daosCount = 1;
    }
    
    mapping(address => string) public fbUserNames;
    
    function create(string memory _fbGroup, string memory _metadata, address _dao) public {
        require(fbGroupToDao[_fbGroup] == 0, "DAO already exists for this fbGroup");
        daos[daosCount] = fbDao(msg.sender, _fbGroup, _metadata, _dao);
        fbGroupToDao[_fbGroup] = daosCount;
        daosCount ++;
    }

    
    function getDaoFromfbGroup(string memory _fbGroupId) public view returns (fbDao memory dao) {
        return daos[fbGroupToDao[_fbGroup]];
    }
    
    function updatefbUserName(string memory _userName) public {
        fbUsers[msg.sender] = _userName;
    }
    
}
