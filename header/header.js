import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import Point from '../header/point.js'
import LogoName from '../header/logoName.js'
import MenuBtn from '../header/menuBtn.js'
import Nav from '../header/nav.js'

export default class Header extends React.Component{
    costructor(){

    }
    render(){
        this.navList = ["搜索","定位"];
        return <header><div>
                <Point />
                <LogoName/>
                <MenuBtn />
                <Nav navList = {this.navList}/>
            </div></header>
    }
}