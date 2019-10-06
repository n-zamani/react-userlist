import React from 'react';

function RenderRow({column, changeHandler, state}) {
    switch (column.type) {
        case 'bool':
            return <input
                type="checkbox"
                name={column.name}
                checked={state[column.name]}
                onChange={changeHandler}
                placeholder={column.label}
            />
        case 'list':
            return <select name={column.name} onChange={changeHandler}>
                {column.options.map(option => <option key={option.value} value={option.value} selected={state.status === option.label ? true : false}>{option.label}</option>)}
            </select>
        case 'number':
            return <input
                type={column.type}
                name={column.name}
                value={state[column.name]}
                onChange={changeHandler}
                placeholder={column.label}
                min='0'
            />
        default:
            return <><input
                type={column.type}
                name={column.name}
                value={state[column.name]}
                onChange={changeHandler}
                placeholder={column.label}
                autoComplete='off'
            /><span></span></>
    }
}

export default RenderRow;