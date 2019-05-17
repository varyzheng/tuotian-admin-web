import { connect } from 'dva';
import AddColorType from './add-color-type'

const EditColorType = (props) => {
  return <AddColorType currentColorType={props.currentColorType} location={props.location}/>
}

export default connect(({ currentColorType }) => ({ currentColorType }))(EditColorType)
