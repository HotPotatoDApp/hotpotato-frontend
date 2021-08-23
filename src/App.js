import React, { useState, useEffect } from "react";
import { hotPotato } from "./abi/abi";
import { ERC20abi } from "./abi/ERCtoken";
import Web3 from "web3";

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import cpImg from './lib/cold.svg';
import hpImg from './lib/hot.svg';
import potImage from './lib/pot.svg';
import usersImage from './lib/users.svg';
import ETH_logo from './lib/eth.svg';
import BSC_logo from './lib/bsc.svg';
import POLY_logo from './lib/poly.svg'; 
import daiLogo from './lib/dai.svg';
import titleImg from './lib/title.svg';
import twSoc from './lib/twitter.svg';
import tgSoc from './lib/telegram.svg';
import mdSoc from './lib/medium.svg';
import ghSoc from './lib/github.svg';
import emSoc from './lib/email.svg';
import constImg from './lib/construction.svg';
import stopImg from './lib/stop.svg';

  const DAI_logo = <img className="curLogo" src={daiLogo} alt="DAI"/>;
  const titleImage = <img className="titleBar" src={titleImg} alt="HOT POTATO"/>;

  const twUrl = 'https://www.twitter.com';
  const tgUrl = 'https://www.telegram.org';
  const mdUrl = 'https://www.medium.com';
  const ghUrl = 'https://www.github.com';
  const emUrl = 'https://www.github.com';

  const twBtn = <div style={{ display: "inline-block"}}><span title="Twitter"><button className="socBtn" onClick={() => window.open(twUrl, '_blank')}><img className="socImg" src={twSoc} alt=""/></button></span></div>;//
  const tgBtn = <div style={{ display: "inline-block"}}><span title="Telegram"><button className="socBtn" onClick={() => window.open(tgUrl, '_blank')}><img className="socImg" src={tgSoc} alt=""/></button></span></div>;//
  const mdBtn = <div style={{ display: "inline-block"}}><span title="Medium"><button className="socBtn" onClick={() => window.open(mdUrl, '_blank')}><img className="socImg" src={mdSoc} alt=""/></button></span></div>;//
  const ghBtn = <div style={{ display: "inline-block"}}><span title="Github"><button className="socBtn" onClick={() => window.open(ghUrl, '_blank')}><img className="socImg" src={ghSoc} alt=""/></button></span></div>;//
  const emBtn = <div style={{ display: "inline-block"}}><span title="Email Us"><button className="socBtn" onClick={() => window.open(emUrl, '_blank')}><img className="socImg" src={emSoc} alt=""/></button></span></div>;//

const web3 = new Web3(window.ethereum);
const decimals = 1000000000000000000;
if(web3){
  window.ethereum.on('accountsChanged',function(accounts){window.location.reload();});
  window.ethereum.on('chainChanged',function(accounts){window.location.reload();});
}else{alert('Not Connected!');}
const weburl = "http://localhost:3000";

function formatAccount(x) {
  var acc = x;
  var _accStart = acc.slice(0,6);
  var _accEnd = acc.slice(-4);
  var result = _accStart+"..."+_accEnd;
  return(result);
}

function getDAIaddy(x){
  var addy;
  if(x===1){  /*ETH - MAINNET*/ addy="0xaD6D458402F60fD3Bd25163575031ACDce07538D";}else
  if(x===3){  /*ETH - Ropsten*/ addy="0xaD6D458402F60fD3Bd25163575031ACDce07538D";}else
  if(x===56){ /*BSC - MAINNET*/ addy="0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";}else
  if(x===97){ /*BSC - Testnet*/ addy="0x8a9424745056Eb399FD19a0EC26A14316684e274";}else
  if(x===137){/*POLY- MAINNET*/ addy="0x8a9424745056Eb399FD19a0EC26A14316684e274";}
  else{       /*ETH - Ropsten*/ addy="0xaD6D458402F60fD3Bd25163575031ACDce07538D";}
  return(addy);
}

function getContractaddy(x){
  var addy;
  if(x===1){  /*ETH - MAINNET*/ addy="0xF382A3C15Bbe90dc1250580fb9d87328728C0E3E";}else
  if(x===3){  /*ETH - Ropsten*/ addy="0xF382A3C15Bbe90dc1250580fb9d87328728C0E3E";}else
  if(x===56){ /*BSC - MAINNET*/ addy="0xBE84901B7b854c3ea44228ded55D91e726E30E0b";}else
  if(x===97){ /*BSC - Testnet*/ addy="0xBE84901B7b854c3ea44228ded55D91e726E30E0b";}else
  if(x===137){/*POLY- MAINNET*/ addy="0x8a9424745056Eb399FD19a0EC26A14316684e274";}
  else{       /*ETH - Ropsten*/ addy="0xF382A3C15Bbe90dc1250580fb9d87328728C0E3E";}
  return(addy);
}

function showInfo(){
  document.getElementById('infoBtn').style.display = 'none';
  document.getElementById('about').scrollIntoView({behavior: 'smooth'});
}

function App() {
  var switchNetwork = async (i) => {
    var net = i;
    if(window.ethereum){
      try{
        await window.ethereum.request({method:'wallet_switchEthereumChain',params:[{chainId:'0x'+net}],});
      }catch(error){
        if(error.code===4902){var rurl;
          try{
            if(net===38){rurl='https://data-seed-prebsc-1-s1.binance.org:8545/';}else
            if(net===89){rurl='https://rpc-mainnet.matic.network';}
            await window.ethereum.request({method:'wallet_addEthereumChain',params:[{chainId:'0x'+net,rpcUrl:rurl,},],});
          }catch(addError){console.error(addError);}
        }console.error(error);
      }
    }else{alert('MetaMask is not installed! Please consider installing it @ https://metamask.io/download.html');}
  } 

  var DAI_address = "0xaD6D458402F60fD3Bd25163575031ACDce07538D";
  var contractAddress = "0xF382A3C15Bbe90dc1250580fb9d87328728C0E3E";

  //WEB3 DATA---------------------------------------------------------------------------------//
  var [myAccount, set_myAccount] = useState('0x0');
  var [walletBalance, set_walletBalance] = useState(0);
  var [allowable, set_allowable] = useState(0);
  //CONTRACT DATA-----------------------------------------------------------------------------//
  var [contractAddy, set_contractAddy] = useState('');
  var [explorerUrl, set_explorerUrl] = useState('');
  var [totalPlayers, set_totalPlayers] = useState(0);
  var [bonusPot, set_bonusPot] = useState(0); 
  //HOT POTATO DATA---------------------------------------------------------------------------//
  var [currentHolder, set_currentHolder] = useState('0x0');
  var [currentHolderLastAttacker, set_currentHolderLastAttacker] = useState('0x0');
  var [potWindow, set_potWindow] = useState('winCold');
  //PLAYER DATA-------------------------------------------------------------------------------//
  var [playersTurns, set_playersTurns] = useState(0);
  var [playersBalance, set_playersBalance] = useState(0);
  var [playersSteals, set_playersSteals] = useState(0);
  var [playerData, show_playerData] = useState('none');
  var [showLoading, set_showLoading] = useState('none');
  var [loadingText, set_loadingText] = useState('LOADING');
  //MISC DATA---------------------------------------------------------------------------------//
  var [createButton, set_createButton] = useState('');
  var [buyButton, set_buyButton] = useState('');
  var [approveButton, set_approveButton] = useState('');
  var [playButton, set_playButton] = useState('');
  var [cashoutButton, set_cashoutButton] = useState('');
  var [referButton, set_referButton] = useState('');
  var [refreshButton, set_refreshButton] = useState(<Button className="btnX  refresh_btn" variant="primary" type="button" onClick={() => updateData(0)}/>);//
  var [netbtn_ETH, set_netbtn_ETH] = useState(<div style={{ display: "inline-block"}}><button className="netButton" onClick={() => switchNetwork(1)}><img className="netImage" src={ETH_logo} alt="ETH"/></button><br /><b className="netLable">ETH</b></div>);//
  var [netbtn_BSC, set_netbtn_BSC] = useState(<div style={{ display: "inline-block"}}><button className="netButton" onClick={() => switchNetwork(38)}><img className="netImage" src={BSC_logo} alt="BSC"/></button><br /><b className="netLable">BSC</b></div>);//
  var [netbtn_POLY, set_netbtn_POLY] = useState(<div style={{ display: "inline-block"}}><button className="netButton" onClick={() => switchNetwork(89)}><img className="netImage" src={POLY_logo} alt="POLY"/></button><br /><b className="netLable">POLY</b></div>);//
  var [potatoImage, set_potatoImage] = useState(<img className="piClass" src={cpImg} alt="Cold Potato" />);//
  var [data_currentHolder, set_data_currentHolder] = useState(<input className="inputBar" type="text" value={currentHolder} disabled/>);//
  var [data_currentHolderLA, set_data_currentHolderLA] = useState(<input className="inputBar" type="text" value={currentHolderLastAttacker} disabled/>);//
  var [data_turnsLeft, set_data_turnsLeft] = useState(<input className="inputBar" type="text" value={playersTurns} disabled/>);//
  var [data_turnsLight, set_data_turnsLight] = useState(<div className="light"></div>);//
  var [data_holderLight, set_data_holderLight] = useState(<div className="light"></div>);//
  var [data_lastAtkLight, set_data_lastAtkLight] = useState(<div className="light"></div>);//
  var [data_allowance, set_data_allowance] = useState(<input className="inputBar" type="text" value={allowable} disabled/>);// 
  var [data_allowanceLight, set_data_allowanceLight] = useState(<div className="light"></div>);//
  var [data_balance, set_data_balance] = useState(<input className="inputBar" type="text" value={playersBalance} disabled/>);//
  var [data_balanceLight, set_data_balanceLight] = useState(<div className="light"></div>);//
  var [data_wallet, set_data_wallet] = useState(<input className="inputBar" type="text" value={walletBalance} disabled/>);//
  var [data_walletLight, set_data_walletLight] = useState(<div className="light"></div>);//
  var [data_profits, set_data_profits] = useState(<input className="inputBar" type="text" value="0" disabled/>);//
  var [purchaseButton, set_purchaseButton] = useState('');
  var [DdI_1, set_DdI_1] = useState(<Dropdown.Item className="drop" disabled>15 TURNS = 10 DAI</Dropdown.Item>);//
  var [DdI_2, set_DdI_2] = useState(<Dropdown.Item className="drop" disabled>200 TURNS = 100 DAI</Dropdown.Item>);//
  var [DdI_3, set_DdI_3] = useState(<Dropdown.Item className="drop" disabled>2500 TURNS = 1000 DAI</Dropdown.Item>);//
  var [DdI_4, set_DdI_4] = useState(<Dropdown.Item className="drop" disabled>30000 TURNS = 10000 DAI</Dropdown.Item>);//
  //REFERRER DATA-----------------------------------------------------------------------------//
  var [totalCommissions, set_totalCommissions] = useState(0);
  var [referrersBalance, set_referrersBalance] = useState(0);
  var [referralQty, set_referralQty] = useState(0);
  var [referralLink, set_referralLink] = useState('0x0');
  var [refData, show_refData] = useState('none');
  //CONTRACT DATA-----------------------------------------------------------------------------//
  var [totalSpent, set_totalSpent] = useState(0);
  var [totalWithdrawn, set_totalWithdrawn] = useState(0);
  var [totalInGame, set_totalInGame] = useState(0);
  //STATISTICS DATA---------------------------------------------------------------------------//
  var [playersPurchased, set_playersPurchased] = useState(0);
  var [playersWithdrawn, set_playersWithdrawn] = useState(0);
  var [lastAttacker, set_lastAttacker] = useState('0x0');
  var [statsData, show_statsData] = useState('none');
  //POPUP DATA--------------------------------------------------------------------------------//
  var [popupTxt, set_popupTxt] = useState('');
  var [popupCss, set_popupCss] = useState('popup popup_red');
  var [popupDis, set_popupDis] = useState('none');
  var [method, set_method] = useState('');
  var [confs, set_confs] = useState(0);
  var [txsHash, set_txsHash] = useState('');
  //NO NETWORK DATA---------------------------------------------------------------------------//
  var [gameDisp, show_gameDisp] = useState('block');
  var [noticeDisp, show_noticeDisp] = useState('none');
  var [noticeImg, show_noticeImg] = useState(stopImg);
  var [infoShow, set_infoShow] = useState('block');
  //------------------------------------------------------------------------------------------//
  
  var updateData = async (z) => {
    set_createButton('');
    const netID = await web3.eth.net.getId();
    DAI_address = getDAIaddy(netID);
    contractAddress = getContractaddy(netID);
    var daiContract = new web3.eth.Contract(ERC20abi,DAI_address);
    var hotPotatoContract = new web3.eth.Contract(hotPotato, contractAddress);
    set_contractAddy(contractAddress);

    if(netID===1){
      //Put up temporary block and notice of future access
      show_gameDisp('none');
      show_noticeImg(constImg);
      show_noticeDisp('block');
      set_netbtn_ETH(<div style={{ display: "inline-block"}}><button className="netButton netDown" onClick={() => switchNetwork(1)}><img className="netImage" src={ETH_logo} alt="ETH"/></button><br /><b className="netLable">ETH</b></div>);//
      set_popupTxt(<b>HotPotato will be coming to the ETHEREUM NETWORK at a later date!<br />Please check our social media feeds for any future updates and/or changes!</b>);//
      set_popupCss('popup popup_red');
      set_popupDis('block');
      set_explorerUrl('https://etherscan.io/');//
    }else
    if(netID===3){
      //Put up temporary block and notice of future access
      show_gameDisp('none');
      show_noticeImg(constImg);
      show_noticeDisp('block');
      set_netbtn_ETH(<div style={{ display: "inline-block"}}><button className="netButton netDown" onClick={() => switchNetwork(1)}><img className="netImage" src={ETH_logo} alt="ETH"/></button><br /><b className="netLable">ETH</b></div>);//
      set_popupTxt(<b>HotPotato will be coming to the ETHEREUM NETWORK at a later date!<br />Please check our social media feeds for any future updates and/or changes!</b>);//
      //set_popupTxt(<b>You are connected to the Ethereum Ropsten Testnet!<br />Please switch to the Main Net!</b>);
      set_popupCss('popup popup_red');
      set_popupDis('block');
      set_explorerUrl('https://ropsten.etherscan.io/');//
    }else
    if(netID===56){
      show_gameDisp('block');
      show_noticeDisp('none');
      set_netbtn_BSC(<div style={{ display: "inline-block"}}><button className="netButton netMain" onClick={() => switchNetwork(38)}><img className="netImage" src={BSC_logo} alt="BSC"/></button><br /><b className="netLable">BSC</b></div>);//
      set_explorerUrl('https://bscscan.com/');//
    }else
    if(netID===97){
      show_gameDisp('block');
      show_noticeDisp('none');
      set_netbtn_BSC(<div style={{ display: "inline-block"}}><button className="netButton netTest" onClick={() => switchNetwork(38)}><img className="netImage" src={BSC_logo} alt="BSC"/></button><br /><b className="netLable">BSC</b></div>);//
      set_popupTxt(<b>CAUTION: <br />You are connected to the Binance SmartChain TESTNET!</b>);//
      set_popupCss('popup popup_yellow');
      set_popupDis('block');
      set_explorerUrl('https://testnet.bscscan.com/');//
    }else
    if(netID===137){
      //Put up temporary block and notice of future access
      show_gameDisp('none');
      show_noticeImg(constImg);
      show_noticeDisp('block');
      set_popupTxt(<b>HotPotato will be coming to the POLYGON NETWORK in the very near future!<br />Please check our social media feeds for any future updates and/or changes!</b>);//
      set_netbtn_POLY(<div style={{ display: "inline-block"}}><button className="netButton netDown" onClick={() => switchNetwork(89)}><img className="netImage" src={POLY_logo} alt="POLY"/></button><br /><b className="netLable">POLY</b></div>);//
      set_popupCss('popup popup_red');
      set_popupDis('block');
      set_explorerUrl('https://polygonscan.com/');
    }else
    if(netID===80001){
      //Put up temporary block and notice of future access
      show_gameDisp('none');
      show_noticeImg(constImg);
      show_noticeDisp('block');
      set_popupTxt(<b>HotPotato will be coming to the POLYGON NETWORK in the very near future!<br />Please check our social media feeds for any future updates and/or changes!</b>);//
      set_netbtn_POLY(<div style={{ display: "inline-block"}}><button className="netButton netDown" onClick={() => switchNetwork(89)}><img className="netImage" src={POLY_logo} alt="POLY"/></button><br /><b className="netLable">POLY</b></div>);//
      //set_popupTxt(<b>You are connected to the Polygon Mumbai Testnet!<br />Please switch to the Main Net!</b>);
      set_popupCss('popup popup_red');
      set_popupDis('block');
      set_explorerUrl('https://mumbai.polygonscan.com/');//
    }else{
      show_gameDisp('none');
      show_noticeImg(stopImg);
      show_noticeDisp('block');
      set_popupTxt(<b>HotPotato is not supported on this network!<br />Please switch to one of the supported networks below!</b>);//
      set_popupCss('popup popup_red');
      set_popupDis('block');
      set_explorerUrl('');//
    }

    var _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var accountUnMod = _accounts[0];
    var account = web3.utils.toChecksumAddress(accountUnMod);
      var disp_Account = formatAccount(account);
    set_myAccount(disp_Account);
    if(account){
      //ACCOUNT DATA------------------------------------------------------------------------------//
      var _walletBalance = await daiContract.methods.balanceOf(account).call();
      var disp_walletBalance = web3.utils.fromWei(_walletBalance, 'ether');
      set_walletBalance(disp_walletBalance);
      var _allowance = await daiContract.methods.allowance(account, contractAddress).call();
      var act_allowance = web3.utils.fromWei(_allowance, 'ether');
        set_allowable(act_allowance);
      //CONTRACT DATA-----------------------------------------------------------------------------//
      var _totalPlayers = await hotPotatoContract.methods.totalPlayers().call();
      var totalPlayers = parseInt(_totalPlayers).toLocaleString();
        set_totalPlayers(totalPlayers);
      var _bonusPot = await hotPotatoContract.methods.bonusPot().call();
      var bonusPot = web3.utils.fromWei(_bonusPot.toLocaleString(), 'ether');
      bonusPot = parseInt(bonusPot).toLocaleString();
        set_bonusPot(bonusPot);
      //------------------------------------------------------------------------------------------//

      //BUY TURNS---------------------------------------------
      function buyTurns(i) {
        set_method('Purchase Turns');
        set_confs(0);
        set_txsHash('');
        set_loadingText(<b className="loadingTxt">Awaiting User</b>);//
        set_showLoading('block');
        var turnQty = i;
        var cost = 10;
        if(turnQty === 15){cost = 10;}else
        if(turnQty === 200){cost = 100;}else
        if(turnQty === 2500){cost = 1000;}else
        if(turnQty === 30000){cost = 10000;}else{turnQty = 15;cost = 10;}
        var tempamount = cost * decimals;
        if(_allowance >= tempamount){
          var buy = async (z) => {
            var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            var account = accounts[0];
            var post = await hotPotatoContract.methods.purchaseTurns(turnQty).send({ from: account })
            .on('transactionHash', function(hash){
              set_loadingText(<b className="loadingTxt">Pending Confirmation</b>);//
              set_txsHash(hash);
            })
            .on('confirmation', (receipt) => {set_confs(1);updateData(post);})
            .on('error', (error, result) => {if (error.message.includes("User denied transaction signature")) {set_showLoading('none');}});
            set_loadingText(<b style={{ color: "green" }}>CONFIRMED</b>);//
          };buy();
        }
      };

      var _isPlayer = await hotPotatoContract.methods.isPlayer(account).call();
      if(_isPlayer){
        set_infoShow('none');
        //HOT POTATO--------------------------------------------------------------------------------//
        var _currentHolder = await hotPotatoContract.methods.currentHolder().call();
          var disp_currentHolder = formatAccount(_currentHolder);
          set_currentHolder(disp_currentHolder);
          var _currentHolderLastAttacker = await hotPotatoContract.methods.currentHolderLastAttacker().call();
          var disp_currentHolderLastAttacker = formatAccount(_currentHolderLastAttacker);
          set_currentHolderLastAttacker(disp_currentHolderLastAttacker);
        //PLAYER DATA-------------------------------------------------------------------------------//
        var _playersTurns = await hotPotatoContract.methods.playersTurns(account).call();
        var playersTurns = parseInt(_playersTurns).toLocaleString();
          set_playersTurns(playersTurns);
        var _playersBalance = await hotPotatoContract.methods.playersBalance(account).call();
        var playersBalance = web3.utils.fromWei(_playersBalance, 'ether');
        playersBalance = parseInt(playersBalance).toLocaleString();
          set_playersBalance(playersBalance);

        if(_currentHolder===account){
          set_potatoImage(<img className="piClass" src={hpImg} alt="Hot Potato" />);//
          set_potWindow('winHot');
          set_data_currentHolder(<input className="inputBar red_txt" type="text" value={disp_currentHolder} disabled/>);
          set_data_holderLight(<div className="light red_light"></div>);//          
        }else{
          set_potatoImage(<img className="piClass" src={cpImg} alt="Cold Potato" />);//
          set_potWindow('winCold');
          set_data_currentHolder(<input className="inputBar green_txt" type="text" value={disp_currentHolder} disabled/>);
          set_data_holderLight(<div className="light green_light"></div>);//
        }
        
        //Turn green if you are NOT the last attacker
        if(disp_currentHolderLastAttacker===disp_Account){
          set_data_currentHolderLA(<input className="inputBar red_txt" type="text" value={disp_currentHolderLastAttacker} disabled/>);
          set_data_lastAtkLight(<div className="light red_light red_light_flash"></div>);//
        }else{
          set_data_currentHolderLA(<input className="inputBar green_txt" type="text" value={disp_currentHolderLastAttacker} disabled/>);
          set_data_lastAtkLight(<div className="light green_light"></div>);//
        } 

        //Turn green if you have enough turns left
        if(_playersTurns>0){
          set_data_turnsLeft(<input className="inputBar green_txt" type="text" value={playersTurns} disabled/>);//
          set_data_turnsLight(<div className="light green_light"></div>);//
          set_purchaseButton(<Dropdown.Toggle variant="primary" id="dropdown-basic" className="btnX">PURCHASE TURNS</Dropdown.Toggle>);//
        }else{
          set_data_turnsLeft(<input className="inputBar red_txt" type="text" value={playersTurns} disabled/>);//
          set_data_turnsLight(<div className="light red_light red_light_flash"></div>);//
          set_purchaseButton(<Dropdown.Toggle variant="primary" id="dropdown-basic" className="btnX flash_btn">PURCHASE TURNS</Dropdown.Toggle>);//
        }
        
        if((_currentHolder!==account)&&(disp_currentHolderLastAttacker!==disp_Account)&&(_playersTurns>0)){
          set_data_holderLight(<div className="light green_light green_light_flash"></div>);//
          set_data_lastAtkLight(<div className="light green_light green_light_flash"></div>);//
          set_data_turnsLight(<div className="light green_light green_light_flash"></div>);//
          set_playButton(<Button className="btnX red_btn flash_btn" variant="danger" onClick={stealPotato} type="button">STEAL POTATO</Button>);//
          set_refreshButton(<Button className="btnX refresh_btn" variant="primary" type="button" onClick={() => updateData(0)}/>);//
        }else{
          set_playButton(<Button className="btnX red_btn" variant="danger" onClick={stealPotato} type="button" disabled>STEAL POTATO</Button>);//
          if(_playersTurns===0){
            set_refreshButton(<Button className="btnX refresh_btn" variant="primary" type="button" onClick={() => updateData(0)}/>);//
          }else{
            set_refreshButton(<Button className="btnX flash_btn refresh_btn" variant="primary" type="button" onClick={() => updateData(0)}/>);//
          }
        }
        
        if(_walletBalance >= 10*decimals){
          set_data_walletLight(<div className="light green_light"></div>);//
          disp_walletBalance = parseInt(disp_walletBalance).toLocaleString();
          set_data_wallet(<input className="inputBar green_txt" type="text" value={disp_walletBalance} disabled/>);
        }else{
          set_data_walletLight(<div className="light red_light"></div>);//
          disp_walletBalance = parseInt(disp_walletBalance).toLocaleString();
          set_data_wallet(<input className="inputBar red_txt" type="text" value={disp_walletBalance} disabled/>);
        }

        if(_walletBalance > (100000*decimals)){disp_walletBalance = "> 100,000";}

        if(_walletBalance >= (10000*decimals)){
          set_DdI_1(<Dropdown.Item className="drop" onClick={() => buyTurns(15)} >15 TURNS = 10 DAI</Dropdown.Item>);//
          set_DdI_2(<Dropdown.Item className="drop" onClick={() => buyTurns(200)} >200 TURNS = 100 DAI</Dropdown.Item>);//
          set_DdI_3(<Dropdown.Item className="drop" onClick={() => buyTurns(2500)} >2500 TURNS = 1000 DAI</Dropdown.Item>);//
          set_DdI_4(<Dropdown.Item className="drop" onClick={() => buyTurns(30000)} >30000 TURNS = 10000 DAI</Dropdown.Item>);//
        }else
        if(_walletBalance >= (1000*decimals)){
          set_DdI_1(<Dropdown.Item className="drop" onClick={() => buyTurns(15)} >15 TURNS = 10 DAI</Dropdown.Item>);//
          set_DdI_2(<Dropdown.Item className="drop" onClick={() => buyTurns(200)} >200 TURNS = 100 DAI</Dropdown.Item>);//
          set_DdI_3(<Dropdown.Item className="drop" onClick={() => buyTurns(2500)} >2500 TURNS = 1000 DAI</Dropdown.Item>);//
        }else
        if(_walletBalance >= (100*decimals)){
          set_DdI_1(<Dropdown.Item className="drop" onClick={() => buyTurns(15)} >15 TURNS = 10 DAI</Dropdown.Item>);//
          set_DdI_2(<Dropdown.Item className="drop" onClick={() => buyTurns(200)} >200 TURNS = 100 DAI</Dropdown.Item>);//
        }else
        if(_walletBalance >= (10*decimals)){
          set_DdI_1(<Dropdown.Item className="drop" onClick={() => buyTurns(15)} >15 TURNS = 10 DAI</Dropdown.Item>);//
        }

        if(_currentHolder===account){
          set_buyButton(<Button className="btnX" variant="primary" type="button" disabled>PURCHASE TURNS</Button>);//
        }else{
          set_buyButton(<Dropdown>{purchaseButton}<Dropdown.Menu className="dropmenu">{DdI_1}{DdI_2}{DdI_3}{DdI_4}</Dropdown.Menu></Dropdown>);//
        }

        if(_allowance >= 100000*decimals){
          set_data_allowanceLight(<div className="light green_light"></div>);//
          set_data_allowance(<input className="inputBar green_txt" type="text" value=">= 100,000" disabled/>);//
          set_approveButton(<Button className="btnX" variant="primary" onClick={approve} type="button">APPROVE MORE</Button>);//
        }else
        if(_allowance >= 10*decimals){
          set_data_allowanceLight(<div className="light green_light"></div>);//
          var disp_allowance = parseInt(act_allowance).toLocaleString();
          set_data_allowance(<input className="inputBar green_txt" type="text" value={disp_allowance} disabled/>);//
          set_approveButton(<Button className="btnX" variant="primary" onClick={approve} type="button">APPROVE MORE</Button>);//
        }else{
          set_data_allowanceLight(<div className="light red_light red_light_flash"></div>);//
          set_data_allowance(<input className="inputBar red_txt" type="text" value="< 10" disabled/>);//
          set_approveButton(<Button className="btnX flash_btn" variant="primary" onClick={approve} type="button">APPROVE CONTRACT</Button>);//
          set_buyButton(<Button className="btnX" variant="primary" type="button" disabled>PURCHASE TURNS</Button>);//
        }

        var disp_playersBalance = parseInt(playersBalance).toLocaleString();
        if(_playersBalance >= 1*decimals){
          set_data_balance(<input className="inputBar green_txt" type="text" value={disp_playersBalance} disabled/>);//
          set_data_balanceLight(<div className="light green_light"></div>);//
          set_cashoutButton(<Button className="btnX green_btn" variant="success" onClick={cashoutBal} type="button">CASHOUT</Button>);//
        }else{
          set_data_balance(<input className="inputBar red_txt" type="text" value={disp_playersBalance} disabled/>);//
          set_data_balanceLight(<div className="light red_light"></div>);//
          set_cashoutButton(<Button className="btnX green_btn" variant="success" onClick={cashoutBal} type="button" disabled>CASHOUT</Button>);//
        }
        //PLAYER STATS------------------------------------------------------------------------------//
        var _lastAttacker = await hotPotatoContract.methods.lastAttacker(account).call();
          var disp_lastAttacker = formatAccount(_lastAttacker);
          set_lastAttacker(disp_lastAttacker);
        var _playersSteals = await hotPotatoContract.methods.playersSteals(account).call();
        var playersSteals = parseInt(_playersSteals).toLocaleString();
          set_playersSteals(playersSteals);
        var _playersPurchased = await hotPotatoContract.methods.playersPurchased(account).call();
        var playersPurchased2 = web3.utils.fromWei(_playersPurchased, 'ether');
        playersPurchased = parseInt(playersPurchased2).toLocaleString();
          set_playersPurchased(playersPurchased);
        var _playersWithdrawn = await hotPotatoContract.methods.playersWithdrawn(account).call();
        var playersWithdrawn2 = web3.utils.fromWei(_playersWithdrawn, 'ether');
        playersWithdrawn = parseInt(playersWithdrawn2).toLocaleString();
          set_playersWithdrawn(playersWithdrawn);
        var _playersProfits = playersWithdrawn2 - playersPurchased2;
        var playersProfits = parseInt(_playersProfits).toLocaleString();
        if(_playersProfits === 0){
          set_data_profits(<input className="inputBar" type="text" value={playersProfits} disabled/>);
        }else 
        if(_playersProfits >= 0){
          set_data_profits(<input className="inputBar green_txt" type="text" value={playersProfits} disabled/>);
        }else 
        if(_playersProfits < 0){
          set_data_profits(<input className="inputBar red_txt" type="text" value={playersProfits} disabled/>);
        }
        show_playerData("block");
        show_statsData("block");
      }else{
        set_infoShow('block');
        set_createButton(<Button className="btnX" variant="primary" onClick={createAccount} type="button">CREATE ACCOUNT</Button>);//
        set_buyButton();//
        show_playerData("none");
        show_statsData("none");
      }
      //CONTRACT STATS----------------------------------------------------------------------------//
      var _totalSpent = await hotPotatoContract.methods.totalSpent().call();
      var totalSpent = web3.utils.fromWei(_totalSpent.toLocaleString(), 'ether');
      totalSpent = parseInt(totalSpent).toLocaleString();
        set_totalSpent(totalSpent);
      var _totalWithdrawn = await hotPotatoContract.methods.totalWithdrawn().call();
      var totalWithdrawn = web3.utils.fromWei(_totalWithdrawn.toLocaleString(), 'ether');
      totalWithdrawn = parseInt(totalWithdrawn).toLocaleString();
        set_totalWithdrawn(totalWithdrawn);
      var _totalInGame = await hotPotatoContract.methods.totalInGame().call();
      var totalInGame = web3.utils.fromWei(_totalInGame, 'ether');
      totalInGame = parseInt(totalInGame).toLocaleString();
        set_totalInGame(totalInGame);
      //REFERRER DATA-----------------------------------------------------------------------------//
      var _isReferrer = await hotPotatoContract.methods.isReferrer(account).call();
      if(_isReferrer){
        var _totalCommissions = await hotPotatoContract.methods.totalCommissions(account).call();
        var totalCommissions = web3.utils.fromWei(_totalCommissions, 'ether');
        totalCommissions = parseInt(totalCommissions).toLocaleString();
          set_totalCommissions(totalCommissions);
        var _referrersBalance = await hotPotatoContract.methods.referrersBalance(account).call();
        var referrersBalance = web3.utils.fromWei(_referrersBalance, 'ether');
        referrersBalance = parseInt(referrersBalance).toLocaleString();
          set_referrersBalance(referrersBalance);
        var _referralQty = await hotPotatoContract.methods.referralQty(account).call();
        var referralQty = parseInt(_referralQty).toLocaleString();
          set_referralQty(referralQty);
        if(_referrersBalance >= (1*decimals)){
          set_referButton(<Button className="btnX green_btn" variant="success" onClick={withdrawCommissions} type="button">WITHDRAW ALL</Button>);//
        }else{
          set_referButton(<Button className="btnX green_btn" variant="success" onClick={withdrawCommissions} type="button" disabled>WITHDRAW ALL</Button>);//
        }
        set_referralLink(weburl+"/?ref="+account);
        show_refData("block");
      }else{
        set_referButton(<Button className="btnX" variant="primary" onClick={createRefLink} type="button">CREATE REF LINK</Button>);//
        show_refData("none");
      }
    }else{
      alert('Wallet not connected!');
    }
    set_showLoading('none');
  }

  useEffect(()=> {updateData(0);} ,[]);

  //USER ACTIONS-------------------------------------------------------------------------------          
  //APPROVE CONTRACT--------------------------------------
  var approve = async (z) => {
    set_method('Approve Contract');
    set_confs(0);
    set_txsHash('');
    set_loadingText(<b className="loadingTxt">Awaiting User</b>);//
    set_showLoading('block');
    z.preventDefault();
    const netID = await web3.eth.net.getId();
    DAI_address = getDAIaddy(netID);
    var daiContract = new web3.eth.Contract(ERC20abi,DAI_address);
    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0];
    var amount = "100000000000000000000000";   //100000*000000000000000000
    var post = await daiContract.methods.approve(contractAddress, amount).send({ from: account })
    .on('transactionHash', function(hash){
      set_loadingText(<b className="loadingTxt">Pending Confirmation</b>);//
      set_txsHash(hash);
    })
    .on('confirmation', (receipt) => {set_confs(1);updateData(post);})
    .on('error', (error, result) => {if (error.message.includes("User denied transaction signature")) {set_showLoading('none');}});
    set_loadingText(<b style={{ color: "green" }}>CONFIRMED</b>);//
  };
  //STEAL POTATO------------------------------------------
  var stealPotato = async (z) => {
    set_method('Steal Potato');
    set_confs(0);
    set_txsHash('');
    set_loadingText(<b className="loadingTxt">Awaiting User</b>);//
    set_showLoading('block');
    z.preventDefault();
    const netID = await web3.eth.net.getId();
    contractAddress = getContractaddy(netID);
    var hotPotatoContract = new web3.eth.Contract(hotPotato, contractAddress);
    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0];
    var post = await hotPotatoContract.methods.stealPotato().send({ from: account })
    .on('transactionHash', function(hash){
      set_loadingText(<b className="loadingTxt">Pending Confirmation</b>);//
      set_txsHash(hash);
    })
    .on('confirmation', (receipt) => {set_confs(1);updateData(post);})
    .on('error', (error, result) => {if(error.message.includes("User denied transaction signature")){set_loadingText('USER REJECTED!');set_showLoading('none');}});
    set_loadingText(<b style={{ color: "green" }}>CONFIRMED</b>);//
  };
  //CASHOUT BALANCE-----------------------------------------------
  var cashoutBal = async (z) => {
    set_method('Cashout');
    set_confs(0);
    set_txsHash('');
    set_loadingText(<b className="loadingTxt">Awaiting User</b>);//
    set_showLoading('block');
    z.preventDefault();
    const netID = await web3.eth.net.getId();
    contractAddress = getContractaddy(netID);
    var hotPotatoContract = new web3.eth.Contract(hotPotato, contractAddress);
    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0];
    var post = await hotPotatoContract.methods.cashout().send({ from: account })
    .on('transactionHash', function(hash){
      set_loadingText(<b className="loadingTxt">Pending Confirmation</b>);//
      set_txsHash(hash);
    })
    .on('confirmation', (receipt) => {set_confs(1);updateData(post);})
    .on('error', (error, result) => {if(error.message.includes("User denied transaction signature")){set_showLoading('none');}});
    set_loadingText(<b style={{ color: "green" }}>CONFIRMED</b>);//
  };
  //CREATE ACCOUNT----------------------------------------
  var createAccount = async (z) => {
    set_method('Create Account');
    set_confs(0);
    set_txsHash('');
    set_loadingText(<b className="loadingTxt">Awaiting User</b>);//
    set_showLoading('block');
    z.preventDefault();
    const netID = await web3.eth.net.getId();
    contractAddress = getContractaddy(netID);
    var hotPotatoContract = new web3.eth.Contract(hotPotato, contractAddress);
    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0];
    var refUrl = "";
    //Pull refUrl
    var params = new URLSearchParams(window.location.search)
    if(params.has('ref')){refUrl = params.get('ref');}
    else{refUrl = "0x0000000000000000000000000000000000000000";}
    var post = await hotPotatoContract.methods.createAccount(refUrl).send({ from: account })
    .on('transactionHash', function(hash){
      set_loadingText(<b className="loadingTxt">Pending Confirmation</b>);//
      set_txsHash(hash);
    })
    .on('confirmation', (receipt) => {set_confs(1);updateData(post);})
    .on('error', (error, result) => {if (error.message.includes("User denied transaction signature")) {set_showLoading('none');}});
    set_createButton('');
    set_loadingText(<b style={{ color: "green" }}>CONFIRMED</b>);//
  };
  //CREATE REF LINK---------------------------------------
  var createRefLink = async (z) => {
    set_method('Create Ref Link');
    set_confs(0);
    set_txsHash('');
    set_loadingText(<b className="loadingTxt">Awaiting User</b>);//
    set_showLoading('block');
    z.preventDefault();
    const netID = await web3.eth.net.getId();
    contractAddress = getContractaddy(netID);
    var hotPotatoContract = new web3.eth.Contract(hotPotato, contractAddress);
    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0];
    var post = await hotPotatoContract.methods.createRefLink().send({ from: account })
    .on('transactionHash', function(hash){
      set_loadingText(<b className="loadingTxt">Pending Confirmation</b>);//
      set_txsHash(hash);
    })
    .on('confirmation', (receipt) => {set_confs(1);updateData(post);})
    .on('error', (error, result) => {if (error.message.includes("User denied transaction signature")) {set_showLoading('none');}});
    set_loadingText(<b style={{ color: "green" }}>CONFIRMED</b>);//
  }; 
  //WITHDRAW COMMISSIONS----------------------------------
  var withdrawCommissions = async (z) => {
    set_method('Withdraw');
    set_confs(0);
    set_txsHash('');
    set_loadingText(<b className="loadingTxt">Awaiting User</b>);//
    set_showLoading('block');
    z.preventDefault();
    const netID = await web3.eth.net.getId();
    contractAddress = getContractaddy(netID);
    var hotPotatoContract = new web3.eth.Contract(hotPotato, contractAddress);
    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0];
    var post = await hotPotatoContract.methods.withdrawCommissions().send({ from: account })
    .on('transactionHash', function(hash){
      set_loadingText(<b className="loadingTxt">Pending Confirmation</b>);//
      set_txsHash(hash);
    })
    .on('confirmation', (receipt) => {set_confs(1);updateData(post);})
    .on('error', (error, result) => {if (error.message.includes("User denied transaction signature")) {set_showLoading('none');}});
    set_loadingText(<b style={{ color: "green" }}>CONFIRMED</b>);//
  };
  //COPY FUNCTIONS-------------------------------------------------------------------------------
  function copyRefLink() {
    var copyText = document.getElementById("reflink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }
  function copyContract() {
    var copyText = document.getElementById("contractAddy");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }
  //-----------------------------------------------------------------------------------------------

  return (
      <div className="main">
        <div className="bkgdImage"></div>

        <div className="loadingDiv" style={{display: showLoading }}>
          <div className="tnxPopup"><br />
            <b>CONTRACT CALL</b>
            <button className="closeBtn" onClick={() => updateData(0)}>X</button>
            <br /><br />
            <div className="txnInner"><br />
              <label className="popupLabel">METHOD: </label><br />
              {method}<br /><br />
              <label className="popupLabel">CONFIRMATIONS: </label><br />
              {confs}/1 <br /><br />
              <label className="popupLabel">TX HASH: </label><br />
              <input className="inputTxs" type="text" value={txsHash} readOnly/>
              <Button id="txBtn" className="webButton" variant="primary" onClick={() => window.open(explorerUrl+"tx/"+txsHash, '_blank')} style={{ margin: "-4px 0px 0px -1px" }}></Button><br />
              <br />
              <label className="popupLabel">STATUS: </label><br />
              {loadingText}<br /><br />
            </div><br />
          </div>
        </div><br />

        <div className="card">
          <div className={popupCss} style={{ display: popupDis }}>{popupTxt}</div>
          <div style={{ display: popupDis }}><br /><br /></div>
                {titleImage}
          <div style={{height:"40px",margin:"5px 0 0 0"}}>
            {twBtn}{tgBtn}{mdBtn}{ghBtn}{emBtn}
          </div>
        </div><br />  

        <div className="card">  
          <div>
            <div className="light green_light"></div>
            <div className="accountNum">{myAccount}</div>
          </div>
          <div style={{ display: "inline-block", margin: "5px 0 0 0" }}>
            {netbtn_ETH}{netbtn_BSC}{netbtn_POLY}
          </div><br />

          <div style={{ width: "100%", display: gameDisp }}>
            <div className="contContract">
              <label className="labelCont">CONTRACT: </label>
              <input id="contractAddy" className="contractAddy" type="text" value={contractAddy} readOnly/>
              <span title="COPY ADDRESS">  
                <Button className="copyButton" variant="primary" onClick={() => copyContract()} style={{ margin: "-4px 0px 0px -1px" }}></Button><br />
              </span>
              <label className="labelCont">EXPLORER: </label>
              <input className="inputExplore" type="text" value={explorerUrl+"address/"+contractAddress} readOnly/>
              <span title="VISIT URL">
                <Button className="webButton" variant="primary" onClick={() => window.open(explorerUrl+"address/"+contractAddress, '_blank')} style={{ margin: "-4px 0px 0px -1px" }}></Button><br />
              </span>
            </div><br />
          </div>   

          <div id="infoBtn" style={{ display: infoShow }}>
            <Button className="btnX flash_btn" variant="success" 
              onClick={() => showInfo()} type="button">INFORMATION?</Button><br /><br />
          </div>

          <div style={{ width: "100%", display: gameDisp }}>
            <div className="container contLid">
              <span title="TOTAL PLAYERS">
              <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col4"><img src={usersImage} style={{ width: "42px" }} alt="PLAYERS:"/></td>
                    <td className="tbl_col tbl_col3"><input style={{ width: "180px" }} className="inputBar" type="text" value={totalPlayers} disabled/></td>
                    <td className="tbl_col tbl_col4"></td>
                  </tr></tbody></table></span>
            </div>  

            <div className="container contPot">
              <span title="BONUS POT">
              <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col4"><img src={potImage} style={{ width: "42px" }} alt="BONUS POT:"/></td>
                    <td className="tbl_col tbl_col3"><input style={{ width: "180px" }} className="inputBar" type="text" value={bonusPot} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr></tbody></table></span>
              <div className={potWindow}>{potatoImage}</div><br /> 
              {createButton}
              <div style={{display: playerData }}>
                <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col1">{data_holderLight}</td>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">CURRENT HOLDER:</label></td>
                    <td className="tbl_col tbl_col3">{data_currentHolder}</td>
                  </tr><tr>
                    <td className="tbl_col tbl_col1">{data_lastAtkLight}</td>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">LAST ATTACKER:</label></td>
                    <td className="tbl_col tbl_col3">{data_currentHolderLA}</td>
                  </tr><tr>
                    <td className="tbl_col tbl_col1">{data_turnsLight}</td>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">YOUR TURNS LEFT:</label></td>
                    <td className="tbl_col tbl_col3">{data_turnsLeft}</td>
                  </tr></tbody></table>
                <div style={{margin: "10px 0 10px 0"}}>{playButton}{refreshButton}</div>
              </div>  
            </div><br />

            <div className="container contCard1" style={{display: statsData}}>
              <table className="tableData"><tbody><tr>
                  <td className="tbl_col tbl_col1">{data_allowanceLight}</td>
                  <td className="tbl_col tbl_col2"><label className="inputLabel">ALLOWANCE:</label></td>
                  <td className="tbl_col tbl_col3">{data_allowance}</td>
                  <td className="tbl_col tbl_col4">{DAI_logo}</td>
                </tr></tbody></table>
                <div style={{margin: "10px 0 10px 0"}}>{approveButton} </div>
                <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col1">{data_walletLight}</td>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">WALLET:</label></td>
                    <td className="tbl_col tbl_col3">{data_wallet}</td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr></tbody></table>
                <div style={{margin: "10px 0 10px 0"}}>{buyButton} </div>
            </div>

            <div className="container contCard2" style={{display: statsData}}>
                <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col1">{data_balanceLight}</td>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">BALANCE:</label></td>
                    <td className="tbl_col tbl_col3">{data_balance}</td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr></tbody></table>
                  <div style={{margin: "10px 0 10px 0"}}>{cashoutButton} </div>
            </div><br />
          
            <b className="contLabel">REFERRAL SYSTEM (4%)</b>
            <div className="container">
              <div style={{display: refData }}>
                <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">COMMISSIONS:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={referrersBalance} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr></tbody></table>
              </div>
              <div style={{margin: "10px 0 10px 0"}}>{referButton} </div>
              <div style={{display: refData }}>
                <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">REFERRALS:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={referralQty} disabled/></td>
                    <td className="tbl_col tbl_col4"></td>
                  </tr></tbody></table>
              </div>
              <div style={{display: refData }}>
                <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">LIFETIME:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={totalCommissions} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr></tbody></table>
              </div>
              <div style={{display: refData }}>
                <label className="inputLabel ilLg">REFERRAL LINK:</label> 
                <InputGroup className="mb-3" style={{margin: "auto", width: "95%"}}>
                  <FormControl
                    id="reflink"
                    style={{ background: "rgb(209, 209, 209)", border: "2px solid gray" }}
                    placeholder={referralLink}
                    value={referralLink} 
                    aria-label={referralLink} 
                    aria-describedby="basic-addon2" 
                    readOnly 
                  />
                  <InputGroup.Append>
                    <Button className="copyButton" variant="primary" onClick={() => copyRefLink()}></Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </div><br />

            <b className="contLabel" style={{display: statsData}}>PLAYER STATS</b>
            <div style={{display: statsData}} className="container">
              <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">TOTAL STEALS:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={playersSteals} disabled/></td>
                    <td className="tbl_col tbl_col4"></td>
                  </tr><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">LAST ATTACKER:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={lastAttacker} disabled/></td>
                    <td className="tbl_col tbl_col4"></td>
                  </tr><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">TOTAL SPENT:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={playersPurchased} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">TOTAL CASHOUTS:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={playersWithdrawn} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">TOTAL PROFITS:</label></td>
                    <td className="tbl_col tbl_col3">{data_profits}</td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr></tbody></table>
            </div><br />

            <b className="contLabel">CONTRACT STATS</b>
            <div className="container">
              <table className="tableData"><tbody><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">PURCHASES:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={totalSpent} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">WITHDRAWALS:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={totalWithdrawn} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr><tr>
                    <td className="tbl_col tbl_col2"><label className="inputLabel">TOTAL INGAME:</label></td>
                    <td className="tbl_col tbl_col3"><input className="inputBar" type="text" value={totalInGame} disabled/></td>
                    <td className="tbl_col tbl_col4">{DAI_logo}</td>
                  </tr></tbody></table>
            </div>
          </div><br /><br />

          <div className="container" style={{display: noticeDisp}}><br />
            <img src={noticeImg} style={{ width: "200px" }} alt=""/><br /><br />
          </div><br />

          <div id="about"></div><br /><br />
          
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" className="cardHead">
                ABOUT
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="cardBody">

                  <b>WHAT IS HOT POTATO?</b> <br />
                    Hot Potato is a DApp, or decentralized application, built on the Binance Smart Chain! 
                    The Hot Potato smart contract uses DAI as its utility token, due to its stable-price, wide-spread adoption, and cross-chain presense! 
                    This is a pay-to-play, online game, that allows players to potentially double, or even triple whatever they spend by fighting 
                    over a virtual Hot Potato!<br /><br />

                  <b>GENERAL IDEA:</b> <br />
                  <ul>
                    <li> Purchase TURNS with DAI tokens! </li>
                    <li> Use 1 TURN to Steal the Hot Potato, and get back 1 DAI from the Bonus Pot! </li>
                    <li> While you are holding the Hot Potato, you will get 5% of any Purchases made by other users! </li>
                    <li> You will continuously steal this Hot Potato back from other players until you are out of TURNS! </li>
                    <li> The end goal is to finish with more DAI than you started with! </li>
                  </ul><br />

                  <b>PURCHASING TURNS:</b> <br />
                  Players can purchase TURNS with DAI
                  <ul>
                    <li> 15 TURNS = 10 DAI </li>
                    <li> 200 TURNS = 100 DAI </li>
                    <li> 2500 TURNS = 1000 DAI </li>
                    <li> 30000 TURNS = 10000 DAI </li>
                  </ul><br />

                  <b>DISTRIBUTING DAI:</b> <br />
                  Spent DAI is distributed accordingly
                  <ul>
                    <li> 1% goes to the Dev Team </li>
                    <li> 4% goes to your Referrer (or the Marketing Team if no referral link given) </li>
                    <li> 5% goes to the player currently Holding the Potato </li>
                    <li> 90% goes into the Bonus Pot </li>
                  </ul><br />

                  <b>EARNING METHODS:</b><br />
                  There are 3 ways to earn DAI in this game:   
                  <ul>
                    <li> Collect DAI from the Bonus Pot by Stealing</li>
                    <li> Try to catch 5% of Purchases made by Holding</li>
                    <li> Collect 4% Referral Commissions by Referring</li>
                  </ul><br />

                  <b>REQUIREMENTS</b><br />
                  <ul>
                    <li> Must use a web3 supported browser to access this website </li>
                    <li> Must have at least 10 DAI to spend in order to play this game </li>
                  </ul><br />

                  <b>INITIAL SETUP</b><br />
                  <ol>
                    <li> Click "Create Account" and pay the associated gas fee </li>
                    <li> Click "Approve Contract" to allow your DAI to be spent </li>
                    <li> Click "Purchase Turns" and purchase some TURNS with DAI </li>
                    <li> Click "Steal the Potato" to start earning DAI </li>
                  </ol><br />

                  <b>RESTRICTIONS:</b>
                  <ul>
                    <li> You can NOT Purchase Turns if you are Holding the Hot Potato! </li> 
                    <li> You can NOT Steal the Hot Potato from the same player twice in a row! </li> 
                  </ul><br /> 

                  <b>WHY PLAY?:</b> <br />
                  <ul>
                    <li> Players compete to hold the Hot Potato, because Holding grants you 5% of any Purchases made! </li>
                    <li> And as long as the Bonus Pot has funds, you get 1 DAI everytime you Steal the Potato from someone! </li>
                    <li> Most players will see the potential to double, or even triple their investment!</li> 
                  </ul><br />

                  <b>RISKS:</b> <br />
                  <ul>
                    <li> You may NEVER catch a 5% purchase while Holding the Hot Potato</li>
                    <li> and the Bonus Pot could empty faster than your TURNS do!</li>
                    <li> You may have to wait for someone else to fill the Bonus Pot for you to continue profiting from steals!</li>
                  </ul><br />

                  <b>RISK LEVELS:</b> <br />
                  <ul>
                    <li> 10 DAI = 150+% ROI | RISK: Low </li>
                    <li> 100 DAI = 200+% ROI | RISK: Med </li>
                    <li> 1000 DAI = 250+% ROI | RISK: High </li>
                    <li> 10000 DAI = 300+% ROI | RISK: Extreme </li>
                  </ul><br />

                  <b>RISK CONSIDERATIONS:</b> <br />
                  <ul>
                    <li> The time it will take to meet your ROI by pulling 1 DAI at a time! </li>
                    <li> The gas fees associated with that amount of transactions!</li>
                    <li> Other player interactions </li>
                    <li> Unknown, outside circumstances </li>
                  </ul><br />

                  <div className="center">
                    <b>ALWAYS DO YOUR OWN RESEARCH<br />&<br />NEVER INVEST MORE THAN YOU ARE WILLING TO LOSE</b>
                  </div>

                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1" className="cardHead">
                AUDITS
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="cardBody">
                    Audit logos and links here
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2" className="cardHead">
                CONTRACT
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body className="cardBody">
                    Contract details here
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

        </div><br />
      </div>//  
  );
}
export default App;