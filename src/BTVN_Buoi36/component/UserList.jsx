import React, { Component } from "react";
import axios from "axios";

export class UserList extends Component {
  handleDelete = async (userId) => {
    try {
      // B1: Call API delete
      await axios.delete(
        `https://629757ee14e756fe3b2dcf70.mockapi.io/user/${userId}`
      );
      // B2: Thanh cong goi den prop onDeleteSuccsess de chay lai ham fetchProducts o component PM
      this.props.onDeleteSuccsess();
    } catch (error) {
      console.log(error);
    }
  };

  onSelectUser = (userId) => {};
  render() {
    const { users } = this.props;
    return (
      <div>
        <div className="card-header bg-dark text-white p-2 mb-4">
          <strong>Danh sách người dùng</strong>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Mật khẩu</th>
              <th>Gmail</th>
              <th>Số điện thoại</th>
              <th>Loại người dùng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td> {user.fullname}</td>
                <td>{user.password}</td>
                <td>{user.gmail}</td>
                <td>{user.phone}</td>
                <td>{user.typeuser}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => this.props.onSelectUser(user.id)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(user.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
