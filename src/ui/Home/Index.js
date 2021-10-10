import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Style.module.scss';
import Shorting from "./filter/Shorting"
import Brands from "./filter/Brands"
import Tags from "./filter/Tags"
import Products from "./Products"
import {productData} from "../../state/actions/product"
const Index = () => {
  // const {repositories, bookmarks, users, userDetails} = useSelector(
  //   (state) => ({ 
  //     repositories: state.repositories,
  //     bookmarks: state.bookmarks ? state.bookmarks : [],
  //     userDetails: state.userDetails,
  //     users: state.users ? state.users : [],
  //   }), shallowEqual
  // );
  const [tab, tabSet] = useState("mug");
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(productData())
  }, [])
  return (
    <div className="container">
      <div id="home" className={styles.home}>
        <div className={styles.filters}>
          <Shorting tab={tab} />
          <Brands tab={tab} />
          <Tags tab={tab} />
        </div>
        <Products tab={tab}  tabSet={tabSet} />
        <div className={styles.basket}>

        </div>
      </div>
    </div>
  );
};

export default Index;
