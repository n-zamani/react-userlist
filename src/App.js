import React, {Component} from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      sex: '',
      userList: [],
      checkF: false,
      checkM: false
    }
  }

  submitHandler = () => {
    const {userList,username,firstName,lastName,sex,checkF,checkM} = this.state;
    this.setState({
      userList: [...userList, {id: new Date().getTime(), username: username, firstName: firstName, lastName: lastName, sex: sex}],
      username: '',
      firstName: '',
      lastName: '',
      sex: '',
      checkF: false,
      checkM: false
    });
  }

  deleteHandler = id => () => {
    const {userList} = this.state;
    const idx = userList.findIndex(user => user.id == id);
    userList.splice(idx,1);
    this.setState({userList});
  }

  changeHandler = (event) => {
    const {name,value} = event.target;
    let {checkF,checkM} = this.state;
    if (value == 'male') {
      checkM = true;
      checkF = false;
    } else if (value == 'female'){
      checkF = true;
      checkM = false;
    }
    this.setState({
      [name]: value,
      checkF,
      checkM
    });
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems:'center', flexDirection: 'column', maxWidth: '1200px', margin:'auto'}}>
        <h1>User List</h1>
        <div className="table-header">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Sex</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>
                  <input onChange={this.changeHandler} value={this.state.username} name='username' type='text' placeholder='Enter Username' spellCheck='false' autoComplete='off'/>
                  <span></span>
                </td>
                <td>
                  <input onChange={this.changeHandler} value={this.state.firstName} name='firstName' type='text' placeholder='Enter First Name' spellCheck='false' autoComplete='off'/>
                  <span></span>
                </td>
                <td>
                  <input onChange={this.changeHandler} value={this.state.lastName} name='lastName' type='text' placeholder='Enter Last Name' spellCheck='false' autoComplete='off'/>
                  <span></span>
                </td>
                <td style={{display: 'flex', justifyContent: 'center'}}>
                  <input type='radio' name='sex' value='male' style={{margin: '8px 4px'}} onChange={this.changeHandler} checked={this.state.checkM}/>
                  <input type='radio' name='sex' value='female' style={{margin: '8px 4px'}} onChange={this.changeHandler} checked={this.state.checkF}/>
                </td>
                <td>
                  <button onClick={this.submitHandler} className='submit' title='Add User' disabled={!this.state.username || !this.state.firstName || !this.state.lastName || !this.state.sex}><i className="fa fa-plus"></i></button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-content">
          <table>
            <tbody>
              {this.state.userList.map(user => <tr key={user.id}>
                <td>
                  <span>{user.username}</span>
                </td>
                <td>
                  <span style={{textTransform: 'capitalize'}}>{user.firstName}</span>
                </td>
                <td>
                  <span style={{textTransform: 'capitalize'}}>{user.lastName}</span>
                </td>
                <td>
                  <span style={{textTransform: 'capitalize'}}>{user.sex}</span>
                </td>
                <td>
                  <button onClick={this.deleteHandler(user.id)} className='delete' title='Delete User'><i className="fa fa-minus"></i></button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}