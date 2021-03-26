
import React from 'react';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Main.module.scss';
import classNames from 'classnames';
import Loading from "../../assets/img/loading.svg" 
// import {defaultPrimaryColor} from "../../Settings"
// import { favRemove, favAdd} from "../../state/actions/favs"

const loadingIcon = <img style={{marginLeft:14}} src={Loading} alt="" fill="#fff" width="26" height="26" />;


export const ButtonPrimaryOutline = (props) => {
    return (<button className={classNames(styles.buttons, styles.primaryOutline, props.classnamess)}  {...props}>
            {props.text}
            {props.loading && loadingIcon}
        </button>
        )
}
export const ButtonPrimary = (props) => {
    return (<button className={classNames(styles.buttons, styles.primary, props.classnamess)} {...props}>
        {props.icon}
        {props.text}
        {props.loading && loadingIcon}
        </button>
        )
}
export const ButtonSecondary = (props) => {
    return (<button className={classNames(styles.buttons, styles.secondary, props.classnamess)} {...props}>
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonSecondary2 = (props) => {
    return (<button className={classNames(styles.buttons, styles.secondary2, props.classnamess)} {...props}>
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonDark = (props) => {
    return (<button className={classNames(styles.buttons, styles.dark, props.classnamess)} {...props}>
        {props.text}
        {props.loading && loadingIcon}
        </button>
        )
}
export const ButtonSuccess = (props) => {
    return (<button className={classNames(styles.buttons, styles.success, props.classnamess)} {...props}>
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonBlue = (props) => {
    return (<button className={classNames(styles.buttons, styles.blue, props.classnamess)} {...props}>
        {props.icon}
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonOrange = (props) => {
    return (<button className={classNames(styles.buttons, styles.orange, props.classnamess)} {...props}>
        {props.icon}
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonDanger = (props) => {
    return (<button className={classNames(styles.buttons, styles.danger, props.classnamess)} {...props}>
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonDanger2 = (props) => {
    return (<button className={classNames(styles.buttons, styles.danger_2, props.classnamess)} {...props}>
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonGold = (props) => {
    return (<button className={classNames(styles.buttons, styles.gold, props.classnamess)} {...props}>
        {props.text}
        {props.loading && loadingIcon}
    </button>
    )
}
export const ButtonMessage = (props) => {

    // const dispatch = useDispatch();
    // const { favs } = useSelector(
    //     (state) => ({
    //         favs: state.favs.list ? state.favs.list : []
    //     }), shallowEqual
    // );
    return (<div className={classNames(styles.buttons, styles.message, props.classnamess)} style={props.style}>
        <button {...props}>
            <span>{props.text}</span>
            {props.loading && loadingIcon}
        </button>
    </div>
    )
}