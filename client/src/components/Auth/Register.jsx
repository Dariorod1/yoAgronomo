import React,{useState,useEffect} from 'react';
import styles from '../LandingPage/styles.module.css';
import {useDispatch,useSelector} from 'react-redux';
import { register } from '../../redux/actions/userActions';


const Register = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)   

    const [userRegister,setUserRegister] = useState({
        email:"",
        password: "",
        //passwordRepeat:"",
        fullName:""
    })

     function handleChange(e){
         setUserRegister({
             [e.target.id]: e.target.value
         })
     }

     function handleSubmit(e){
         e.preventDefault();
         dispatch(register(userRegister)) 
     }
        return (
            <div className={styles.containerD}>
              <form onSubmit={handleSubmit}>
              <div className={styles.box}>
      
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName">Nombre</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="fullName"
                    className={styles.loginInput}/>
                </div>
      
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                  onChange={handleChange}
                  type="text" 
                  name="email" 
                  className={styles.loginInput} />
                </div>
      
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className={styles.loginInput}/>
                </div>
                {/* <div className={styles.inputGroup}>
                  <label htmlFor="password">Repetir</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className={styles.loginInput}/>
                </div> */}
                <button
                  type="button"
                  className={styles.registerBtn}
                  >Registrarme</button>
              </div>
              </form>
            </div>
          );
        }
      

export default Register;