import React from 'react';
import { onChange} from '../../state/actions/form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './switch.module.scss';
import classNames from 'classnames';

const Switch = (props) => {
    const dispatch = useDispatch();
    const { form } = useSelector(
        (state) => ({
            form: state.form
        }), shallowEqual
    );
    return (<div className={classNames(styles.switch)}>    
        <label className={styles.heartSwitch}>
            {/* dispatch(onChange(props.name, e.target.value)) */}
            {form[props.name] === true ? <input type="checkbox" value={false}  name={props.name} onChange={(e) => dispatch(onChange(props.name, false))} checked /> : <input type="checkbox" value={true}  name={props.name} onChange={(e) => dispatch(onChange(props.name, true))} />}
            <svg viewBox="0 0 33 23" fill="white">
                <path d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"></path>
            </svg>
        </label>
        <p style={{color: form[props.name] === true ? "#ec4472" : "#333"}}>{form[props.name] === true ? "On" : "Off"}</p>
    </div> )
}
export default Switch;

// <label class="heart-switch">
//     <input type="checkbox" checked>
//     <svg viewBox="0 0 33 23" fill="white">
//         <path d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"></path>
//     </svg>
// </label>