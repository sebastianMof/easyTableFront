import React from 'react';
import './App.css';
import urlcodeJson from 'urlcode-json';
import {BrowserRouter as Router, Link, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';


export default class Form_login extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
            rut: '',
            password:  '',
            id:'',
            loginStatus: false
            
        };

        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

//Iniciarsesion
    onLoginSubmit(event) {
        event.preventDefault()
        const { rut, password , id, loginStatus} = this.state
        
        const data = {
            rut : this.state.rut,
            password : this.state.password,
            id : this.state.id    
        }
       
        if (rut && password) { 
          fetch('http://localhost:5555/reserva/delete',{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : 
                    JSON.stringify(data),

                })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log('Respuesta backend', responseJSON);
                   
                    if (responseJSON.status !== 1) {
                        console.log('OHMYGOOOD');
                    
                     } else{
                        //redireccionar a mensaje de creado
                        this.setState({loginStatus: true});
                        console.log(':D');
                        
                     }
                  
                }).catch(e =>{
                  console.log(e);
                })
        }
    }

    render(){
        return(
        
        <div className="Iniciarsesion">
            <form method="post">
                <h2> Borrar Reserva 
                </h2>

                <br />
                RUT <input type ="text"
                    placeholder="12345678-9" required="required"
                    value={this.state.rut}
                    onChange={e => this.setState({rut: e.target.value})}/>
                <br />
                CONTRASEÑA <input type="password"
                    placeholder="password" required="required"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}/>
                <br /> 
                ID DE RESERVA <input type="text"
                    placeholder="6" required="required"
                    value={this.state.id}
                    onChange={e => this.setState({id: e.target.value})}/>
                <br /> 
                <br />
                <button href="usuario" 
                    onClick={this.onLoginSubmit}
                    className="btn btn-primary btn-block btn-large">Borrar Reserva
                </button>

            </form>
            <br />
            
        </div>

        );
    }
}