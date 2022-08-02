import React, { Component } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import axios from "axios";
export class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectUsers: null,
    };
  }
  fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://629757ee14e756fe3b2dcf70.mockapi.io/user"
      );
      // Call api thành công
      this.setState({ users: data });
    } catch (error) {
      console.log(error);
    }
  };
  fetchUserDetail = async (userId) => {
    // console.log(productId)
    try {
      const { data } = await axios.get(
        `https://629757ee14e756fe3b2dcf70.mockapi.io/user/${userId}`
      );
      // Thanh cong

      this.setState({selectUsers: data });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    return (
      <div>
        <h1 className="text-center text-primary">Users Managerment</h1>

        <div className="card mb-5">
          <div className="card-header bg-dark text-white">
            <strong>User Form</strong>
          </div>
          <div className="card-body">
            <UserForm user={this.state.selectUsers}
            onSuccess = {this.fetchUsers}/>
          </div>
        </div>

        <UserList users={this.state.users} 
        onSelectUser={this.fetchUserDetail}
        onDeleteSuccsess={this.fetchUsers}/>
      </div>
    );
  }
}

export default UserManagement;
