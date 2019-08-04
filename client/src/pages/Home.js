import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/actions/authActions'

class Home extends React.Component{
    render(){
        return(
            <div>
                <h1>I am Home</h1>
               
            </div>
        )
    }
}

const mapStateProps = state =>({
    auth: state.auth
})
export default connect(mapStateProps,{logout}) (Home)