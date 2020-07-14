import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getProducts } from '../../Store/action/ActionCreator'

import classes from './Home.module.css'
import Card from '../../Component/Card/Card'
import * as actionTypes from '../../Store/actionTypes';
import Loading from '../../Component/Loading/Loading';
import ErrorHandler from '../../Hoc/ErrorHandler/ErrorHandler'
import Axios from '../../Axios';

const Home = React.memo((props) => {
   const { onLoadProducts } = props;

   useEffect(() => {
      onLoadProducts();
   }, [onLoadProducts]);

   let list = null;
   if (props.loading) {
      list = (
         <div className={classes.loading}>
            <Loading loading='block' />
         </div>
      )
   }

   if (props.products.length > 0) {
      list = props.products.map(product =>
         (<Card img={product.imagePath}
            title={product.title}
            discrip={product.description}
            price={product.price}
            key={product._id}
            clicked={() => props.onAddProductList(product)}
         />))
   }



   return (
      <div className={classes.grid}>
         {list}
      </div>
   )
})

const mapStateToProps = state => {
   return {
      products: state.shopping.allProducts,
      loading: state.shopping.loading
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onLoadProducts: () => dispatch(getProducts()),
      onAddProductList: (productObj) => dispatch({ type: actionTypes.ADD_PRODUCT_TO_CART, product: productObj })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Home, Axios));
