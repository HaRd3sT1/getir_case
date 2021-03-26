import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import {sendGift} from "../../../state/actions/messages"

const Gifts = ({fakeId, close}) => {
    const dispatch = useDispatch();
    const { gifts} = useSelector(
        (state) => ({
            gifts: state.generalDataReducer.gifts ? state.generalDataReducer.gifts : [],
            // users: state.users ? state.users : []
        }), shallowEqual
    );
    return (
        <div className={styles.Gifts}>
            {gifts.map((data, index) => {
                if (!data){
                    return null
                }
                // if (props.hidden){
                //     return null
                // }
                return (
                    <div className={styles.box} key={index}>
                        <div className={styles.content} onClick={(e) => {dispatch(sendGift(fakeId, data.id, data.coin, data.name, false)); close(false)}}>
                            <p>{data.name}</p>
                            <img src={data.img} alt="" />
                            <button>{data.coin} Coin</button>
                        </div>
                    </div>
                )
            })}
        </div>)
}
export default Gifts;
