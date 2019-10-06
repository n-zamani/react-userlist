import React,{Component} from 'react';
import RenderRow from './renderRow';

export default class Row extends Component {

    state = {
        isEdit: false
    }

    editRow = () => {
        if (this.state.isEdit) {
            this.props.onEdit(this.state);
            this.setState({isEdit:false});
        } else {
            this.setState({isEdit: true,...this.props.row});
        }
    }
    
    renderEdit() {
        return this.props.columns.map(column=><td key={column.name}>
            <RenderRow column={column} changeHandler={this.changeHandler} state={this.state}/>
        </td>)
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

    // renderRow = (column) => {
    //     switch(column.type) {
    //         case 'bool':
    //             return <input
    //                         type="checkbox"
    //                         name={column.name}
    //                         checked={this.state[column.name]}
    //                         onChange={this.changeHandler}
    //                         placeholder={column.label}
    //                     />
    //         case 'list':
    //             return <select name={column.name} onChange={this.changeHandler}>
    //                     {column.options.map(option=><option key={option.value} value={option.value} selected={this.state.status === option.label ? true : false}>{option.label}</option>)}
    //                 </select>
    //         case 'number':
    //             return <input
    //                         type={column.type}
    //                         name={column.name}
    //                         value={this.state[column.name]}
    //                         onChange={this.changeHandler}
    //                         placeholder={column.label}
    //                         min='0'
    //                     />
    //         default:
    //             return <><input
    //                         type={column.type}
    //                         name={column.name}
    //                         value={this.state[column.name]}
    //                         onChange={this.changeHandler}
    //                         placeholder={column.label}
    //                         autoComplete='off'
    //                     /><span></span></>
    //     }
    // }

    render() {
        const {row,onDelete,columns} = this.props;
        const {isEdit} = this.state
        return <tr>
            {isEdit ? this.renderEdit() : columns.map(column=>{
                switch(column.type){
                    case 'bool':
                        return <td key={column.name}>{column[row[column.name]]}</td>;
                    case 'list':
                        return <td key={column.name}>{row[column.name]}</td>
                    default:
                        return <td key={column.name}>{row[column.name]}</td>;
                }
            })}
            <td>
                <button onClick={this.editRow}>{isEdit ? <i className="fa fa-check"></i> : <i className="fa fa-pencil-square-o"></i>}</button>
                {!isEdit && <button onClick={onDelete}><i className="fa fa-minus"></i></button>}
            </td>
        </tr>
    }
}