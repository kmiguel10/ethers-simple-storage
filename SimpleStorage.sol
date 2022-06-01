// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; // 0.8.12

contract SimpleStorage {
    //boolean, uint.int, address, bytes
    uint256 favoriteNumber; //initialized to 0

    //Create an arr of people
    People[] public people;

    //Mapping
    mapping(string => uint256) public nameToFavoriteNumber;

    //struct
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    //view - only allows reading - doesnt spend gas - doesnt modify blockchain state
    //pure - does not need to read - doesnt spend gas - doesnt modify blockchain state
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    //0xd9145CCE52D386f254917e481eB44e9943F39138

    //Add to both array and mapping
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name)); //add to arr
        nameToFavoriteNumber[_name] = _favoriteNumber; //add to mapping
    }
}
