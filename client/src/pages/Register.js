import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../store/actions/authActions'

class Register extends React.Component{
    state ={
        name: '',
        email: '',
        password: '',
        confirmPassword: '',

        error: {}
    }

 
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)
        ) {
          return {
            error: nextProps.auth.error
          };
        }
        return null;
      }

    changeHandler = event => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        let {name,email,password,confirmPassword}= this.state
        this.props.register({name,email,password,confirmPassword},this.props.history)
    }
    render(){
        let {name,email,password,confirmPassword,error}=this.state
   
        return(
            
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h1 className='text-center display-4'>Register Here</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name:</label>
                            <input
                            className={error.name ? 'form-control is-invalid': 'form-control'}
                            type="text"
                            
                            placeholder="enter your Name"
                            name='name'
                            id='name'
                            value={name}
                            onChange={this.changeHandler}
                            />
                            {error.name && <div className="invalid-feedback">
                            {error.name}
                        </div>}
                        </div>
                        

                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input
                            className={error.email ? 'form-control is-invalid': 'form-control'}
                            type="email"
                            
                            placeholder="enter your Email"
                            name='email'
                            id='email'
                            value={email}
                            onChange={this.changeHandler}
                            />
                             {error.email && <div className="invalid-feedback">
                            {error.email}
                        </div>}
                        </div>
                      

                        <div className='from-group'>
                            <label htmlFor='password'>Password:</label>
                            <input
                            className={error.password ? 'form-control is-invalid': 'form-control'}
                            type="password"
                            
                            placeholder="enter your Password"
                            name='password'
                            id='password'
                            value={password}
                            onChange={this.changeHandler}
                            />
                              {error.password && <div className="invalid-feedback">
                            {error.password}
                        </div>
                       }
                        </div>
                     

                        <div className='from-group'>
                            <label htmlFor='confirmPassword'>Confimr Password:</label>
                            <input
                            className={
                                error.confirmPassword
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                            type="password"
                           
                            placeholder="enter your ConfirmPassword"
                            name='confirmPassword'
                            id='confirmPassword'
                            value={confirmPassword}
                            onChange={this.changeHandler}
                            />
                            {error.confirmPassword && <div className="invalid-feedback">
                        {error.confirmPassword}
                        </div>}
                        </div>
                       
                        <Link to='/login'>AlreadyHave Acount? Login Here</Link>
                            <button className='btn btn-primary d-block'>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateProps = state =>({
    auth: state.auth
})
    


export default connect(mapStateProps, {register})(Register)