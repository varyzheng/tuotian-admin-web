import { connect } from 'dva';
import AddProductType from './add-product-type'

const EditProductType = (props) => {
  return <AddProductType currentProductType={props.currentProductType}/>
}

export default connect(({ currentProductType }) => ({ currentProductType }))(EditProductType)
