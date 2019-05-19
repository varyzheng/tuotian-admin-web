import { connect } from 'dva';
import AddProductType from './add-product-type'

const EditProductType = (props) => {
  return <AddProductType currentProductType={props.currentProductType} location={props.location}/>
}

export default connect(({ currentProductType }) => ({ currentProductType }))(EditProductType)
