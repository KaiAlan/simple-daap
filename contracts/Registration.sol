//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;
contract Registration
{
    //farmers details
    struct Farmer{//farmer struct type to store the details of farmer namely their name,the account associated with them and the crops they harvest
        address f;
        string name;
        string crops;
    }
    mapping(address=>string)public Peoplevalidation;//maps the address to the type of the user f for farmer d for distibutor c for consumer and r for retailer
    mapping(address=>Farmer)public addresstofarmer;//checks whether the given address is a farmer or not
    Farmer[] private farmer;//an array to store all the farmer's info

    function addFarmer(address _f,string memory _n,string memory _c)public{
        Farmer memory newf=Farmer({f:_f
        ,name:_n
        ,crops:_c});
        farmer.push(newf);

        Peoplevalidation[_f]="f";
        addresstofarmer[_f]=newf;
    }


    //distributors
    struct distributors{
        address d;//address of the distributors
        string name;//name
        string location;//location at which they operate
        string contact_no;//Their contact number
    }
    mapping(address=>distributors)public addresstoDistributor;//To map all the details of the distributors by their address
    distributors[] private distributor;
    function addDistributor(address _d,string memory _n,string memory _l,string memory _c)public{
        distributors memory newd=distributors({
            d:_d,
            name:_n,
            location:_l,
            contact_no:_c
        });
        distributor.push(newd);

        Peoplevalidation[_d]="d";//maps the type d to the address indicating teh address as a distributor
        addresstoDistributor[_d]=newd;
    }


    //consumer
    struct Consumers{
        address c;
        string name;
        string location;
        string contact_no;
    }
    mapping(address=>Consumers)public addresstoConsumer;
    Consumers[] private consumer;
    function addConsumer(address _c,string memory _n,string memory _l,string memory _con)public{
        Consumers memory newc=Consumers({c:_c,
        name:_n,
        location: _l,
        contact_no: _con});

        consumer.push(newc);


        Peoplevalidation[_c]="c";
        addresstoConsumer[_c]=newc;

    }

    //consumer
    struct Retailer{
        address c;
        string name;
        string location;
        string contact_no;
    }
    mapping(address=>Retailer)public addresstoRetailer;
    Retailer[] private retailer;
    function addRetailer(address _c,string memory _n,string memory _l,string memory _con)public{
        Retailer memory newr=Retailer({c:_c,
        name:_n,
        location: _l,
        contact_no: _con});

        retailer.push(newr);

        
        Peoplevalidation[_c]="r";
        addresstoRetailer[_c]=newr;

    }

}