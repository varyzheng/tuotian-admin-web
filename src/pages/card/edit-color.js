import { connect } from 'dva';
import AddColor from './add-color'

const EditColor = (props) => {
  return <AddColor currentColor={props.currentColor} location={props.location}/>
}

export default connect(({ currentColor }) => ({ currentColor }))(EditColor)
