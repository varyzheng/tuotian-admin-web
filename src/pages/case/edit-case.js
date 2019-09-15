import { connect } from 'dva';
import AddCase from './add-case'

const EditCase = (props) => {
  return <AddCase currentCase={props.currentCase} location={props.location}/>
}

export default connect(({ currentCase }) => ({ currentCase }))(EditCase)
