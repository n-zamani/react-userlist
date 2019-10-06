import React,{Component} from 'react';
import RenderRow from './renderRow';

export default class Header extends Component {

    constructor(props) {
        super(props);
        const {columns} = props;
        this.initState = columns.reduce((obj,column)=>{
            switch(column.type) {
                case 'bool':
                    return {...obj, [column.name]: (column.initValue !== undefined)  ? column.initValue : true}
                case 'list':
                        return {...obj, [column.name]: (column.initValue !== undefined) ? column.initValue : column.options[0].label}
                case 'number':
                    return {...obj, [column.name]: (column.initValue !== undefined) ? column.initValue : 0}
                case 'text':
                    return {...obj, [column.name]: (column.initValue !== undefined) ? column.initValue : ''}
            }
        },{});
        this.state = this.initState;
    }
    
    onAdd = () => {
        const id = new Date().getTime();
        this.props.addRow({...this.state, id});
        this.setState(this.initState);
    }

    changeHandler = (event) => {
        const {target:{value,name,type,checked}} = event;
        const {columns} = this.props;
        if (type === 'checkbox') {
          this.setState({[name]: checked});
        } else if (name === 'status') { //instead of value, label will be set in state
            this.setState({[name]: columns[5].options[value].label})
        } else {
          this.setState({[name]: value});
        }
    }

    render() {
        const {columns,sort} = this.props;
        const disabled = !columns.every(column => column.required ? this.state[column.name] : true )
        return <thead>
            <tr>
                {columns.map(column=><th key={column.name}>{column.label} {column.required ? '*' : ''}
                <button onClick={sort(column.name)} className='sort'><i className="fa fa-sort"></i></button> {/* sort buttons */}
                </th>)}
                <th>Action</th>
            </tr>
            <tr>
                {columns.map(column=><td key={column.name}>
                    <RenderRow column={column} changeHandler={this.changeHandler} state={this.state}/>
                </td>)}
                <td>
                    <button disabled={disabled} onClick={this.onAdd} className='add-row'><i className="fa fa-plus"></i></button>
                </td>
            </tr>
        </thead>;
    }
}
