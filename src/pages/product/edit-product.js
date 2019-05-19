import { connect } from 'dva';
import AddProduct from './add-product'

const EditProduct = (props) => {
  return <AddProduct currentProduct={props.currentProduct} location={props.location} mapping={props.mapping}/>
}

export default connect(({ currentProduct, mapping }) => ({ currentProduct, mapping }))(EditProduct)
