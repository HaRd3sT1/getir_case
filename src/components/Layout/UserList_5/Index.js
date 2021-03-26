import React from 'react';
import {  useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { NavLink } from 'react-router-dom';
import {userId_S} from "../../../Settings"
// import {FormattedMessage} from 'react-intl';

const UserList = (props) => {
    // const dispatch = useDispatch();
    // const [modal_2, modal_2Status] = useState("");
    const { users } = useSelector(
        (state) => ({
            // favs: state.favs.list ? state.favs.list : [],
            users: state.users ? state.users : []
        }), shallowEqual
    );
    return (
        <div className={styles.userList_5}>
            {props.data && props.data.map((data, index) => {
                if (!data || !users[data]){
                    return null
                }
                return (
                    <div className={styles.box} key={index}>
                        <div className={styles.content}>
                            <NavLink className={styles.bgContent} to={{ pathname: "/users/" + userId_S(data) }}>
                                <div className={styles.bg} style={{ backgroundImage: "url(" + users[data].avatarLarge + ")" }}></div>
                            </NavLink>
                            <NavLink to={{ pathname: "/users/" + userId_S(data) }}>
                                <h2 className={styles.nickname}><span>{users[data].nickname}</span>, {users[data].age} 
                                </h2>
                            </NavLink>
                        </div>
                    </div>
                )
            })}
        </div>)
}
export default UserList;
