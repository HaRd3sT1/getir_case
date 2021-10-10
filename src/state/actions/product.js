import { createAction } from 'redux-act';
import ProductList from "../../data/items.json"
import axios from "axios"

export const PRODUCTS_DATA = createAction('PRODUCTS_DATA');

const productData = () => {
    return async (dispatch, getState) => {
        let mug_brands = []
        let mug_product = []
        let mug_tags = []
        let shirt_brands = []
        let shirt_product = []
        let shirt_tags = []
        axios.get('/items')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        ProductList.forEach(doc=>{
            if(doc.itemType === "mug"){
                if(doc.manufacturer){
                    let findIndex = mug_brands.findIndex(e => e.name === doc.manufacturer)
                    if(findIndex !== -1){
                        mug_brands[findIndex].value = mug_brands[findIndex].value+1
                    }else{
                        mug_brands.push({
                            name:doc.manufacturer,
                            value:1
                        })
                    }
                }
                if(doc.tags.length){
                    doc.tags.forEach(tagDoc =>{
                        let findIndexTag = mug_tags.findIndex(e => e.name === tagDoc)
                        if(findIndexTag !== -1){
                            mug_tags[findIndexTag].value = mug_tags[findIndexTag].value+1
                        }else{
                            mug_tags.push({
                                name:tagDoc,
                                value:1
                            })
                        }
                    })
                }
                mug_product.push({
                    name:doc.name,
                    price:doc.price,
                    added:doc.added,
                })
            }else{

                if(doc.manufacturer){
                    let findIndex = shirt_brands.findIndex(e => e.name === doc.manufacturer)
                    if(findIndex !== -1){
                        shirt_brands[findIndex].value = shirt_brands[findIndex].value+1
                    }else{
                        shirt_brands.push({
                            name:doc.manufacturer,
                            value:1
                        })
                    }
                }
                if(doc.tags.length){
                    doc.tags.forEach(tagDoc =>{
                        let findIndexTag = shirt_tags.findIndex(e => e.name === tagDoc)
                        if(findIndexTag !== -1){
                            shirt_tags[findIndexTag].value = shirt_tags[findIndexTag].value+1
                        }else{
                            shirt_tags.push({
                                name:tagDoc,
                                value:1
                            })
                        }
                    })
                }
                shirt_product.push({
                    name:doc.name,
                    price:doc.price,
                    added:doc.added,
                })
            }
        })

        dispatch(PRODUCTS_DATA({
            mug_brands:mug_brands,
            mug_tags:mug_tags,
            mug_list:mug_product,
            shirt_brands:shirt_brands,
            shirt_tags:shirt_tags,
            shirt_list:shirt_product,
        }))
    };
}
export { productData };
