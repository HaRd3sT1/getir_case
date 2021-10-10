import React, {useState, useEffect} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styles from './Style.module.scss';
import Item from "./item/item"
const Products = ({tab, tabSet}) => {
  const {form, product} = useSelector(
    (state) => ({ 
      form: state.form,
      product: state.product[tab+"_list"] ? state.product[tab+"_list"] : [],
    }), shallowEqual
  );
  const [items, itemsSet] = useState([]);
  const [activePages, activePagesSet] = useState(1);
  const dispatch = useDispatch();
  useEffect(() =>{
    let arr = []
    product.forEach((doc, index)=>{
        if(index > activePages * 16){ 
            return null 
        } 
        if(index < (activePages - 1) * 16){ 
            return null 
        } 
        arr.push(doc)
    })
    itemsSet(arr)
  }, [activePages])
  return (
    <div className={styles.products}>
        <div className={styles.title}>
            Products
        </div>
        <div className={styles.buttons}>
            <button className={tab === "mug" ? styles.active : ""} onClick={(e) => tabSet("mug")}>
                Mug
            </button>
            <button className={tab === "shirt" ? styles.active : ""} onClick={(e) => tabSet("shirt")}>
                Shirt
            </button>
        </div>
        <div className={styles.content}>
            <div className={styles.items}>
                {items.map((doc, index) => {
                    return <Item name={doc.name} price={doc.price} />
                })}
            </div>
        </div>
    </div>
  );
};

export default Products;
