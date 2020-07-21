pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract FacebookFly {
    
    struct FbFly {
        address creator;
        string groupId;
        string metadataHash; // stored on IPFS in IPLD format
        address daoAddress;
        // uint8 memberCount;
        // mapping (uint8 => address) members; // verified using facebook api
    }
    
    mapping (uint => FbFly) public daos;
    uint daosCount = 0;
    mapping(address => string) public fbUsers;
    mapping (string => uint) public fbGroupToDao;
    
    constructor() public {
        daos[0] = FbFly(msg.sender, "FbFly", "ipfsHashContainingMetadataJson", 0xDAd714F1fF59F427f203ac1d056d80616E7b807B);
        daosCount = 1;
    }
    
    
    function create(string memory _groupId, string memory _metadata, address _dao) public {
        require(fbGroupToDao[_groupId] == 0, "DAO already exists for this groupId");
        daos[daosCount] = FbFly(msg.sender, _groupId, _metadata, _dao);
        fbGroupToDao[_groupId] = daosCount;
        daosCount ++;
    }

    // function approveDaoMembership

    // function joinDao
    
    function getDaoFromfbGroup(string memory _groupId) public view returns (FbFly memory dao) {
        return daos[fbGroupToDao[_groupId]];
    }
    
    function updateFbUser(string memory _userId) public {
        fbUsers[msg.sender] = _userId;
    }

    
}
