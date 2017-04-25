import React,{Component} from 'react'
import ReactDOM from 'react-dom'

export default class Nav extends React.Component{
    render(){
        return <nav>
            <ul>
                {
                    this.props.navList.map((item,i)=>
                        <li key={i}><a>{item}</a></li>
                    )
                }
            </ul>
        </nav>
    }
}