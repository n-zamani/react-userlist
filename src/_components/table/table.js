import React, { Component } from 'react';
import Header from './header';
import Row from './row';

export default class Table extends Component {
    state = {
        rows: [],
        page: 1
    }

    addRow = row => {
        const { rows } = this.state;
        this.setState({ rows: [...rows, row] })
    }

    deleteRow = id => (a) => {
        const { rows } = this.state;
        rows.splice(rows.findIndex(row => row.id === id), 1);
        this.setState({ rows });
    }

    editRow = row => {
        const { rows } = this.state;
        rows[rows.findIndex(_row => _row.id === row.id)] = row;
        this.setState({ rows });
    }

    sortClicked = false; //a flag used for sort buttons

    sort = name => () => {
        const { rows } = this.state;
        let sorted = []; //a variable for storing sorted rows
        if (this.sortClicked) { //if sort sortClicked is true, rows will be sorted in descending order
            switch (name) {
                case 'age':
                    sorted = rows.sort((a, b) => +a[name] > +b[name] ? -1 : 1);
                    break;
                default:
                    sorted = rows.sort((a, b) => a[name] > b[name] ? -1 : 1);
            }
            this.sortClicked = false;
        } else { //if sort sortClicked is false, rows will be sorted in ascending order
            switch (name) {
                case 'age':
                    sorted = rows.sort((a, b) => +a[name] > +b[name] ? 1 : -1);
                    break;
                default:
                    sorted = rows.sort((a, b) => a[name] > b[name] ? 1 : -1);
            }
            this.sortClicked = true;
        }
        this.setState({ rows: [...sorted] });
    }

    whichPage = p => () => { //this function is triggered when we want to change page. The number of page will be set to page
        this.setState({ page: p });
    }

    render() {
        const { rows, page } = this.state;
        const { addRow, deleteRow, editRow, sort, whichPage, props: { columns } } = this;
        const numOfPages = Math.ceil(rows.length / 5); //number of pages
        let arrOfPages = []; //an array to store pages' numbers. We create Pages' buttons by using this variable.
        for (let i = 1; i <= numOfPages; i++) {
            arrOfPages.push(i);
        }
        let slicedRows = rows.slice((page - 1) * 5, (page - 1) * 5 + 5); //rows is sliced so we will have 5 rows in each page. We map slicedRows for Row.
        return <>
            <h1>Editable Table</h1>
            <table>
                <Header
                    columns={columns}
                    addRow={addRow}
                    sort={sort}
                />
                <tbody>
                    {slicedRows.map(row => <Row key={row.id} row={row} columns={columns} onDelete={deleteRow(row.id)} onEdit={editRow} />)}
                </tbody>
            </table>
            <div className='pages'>
                {arrOfPages.map(pageNum => <button key={pageNum} onClick={whichPage(pageNum)} className={page === pageNum ? 'active' : ''}>{pageNum}</button>)}
            </div>
        </>;
    }
}