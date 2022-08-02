import React, { Component } from "react";
import axios from "axios";

export class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        username: "",
        fullname: "",
        password: "",
        phone: "",
        typeuser: "",
        gmail: "",
        id: "",
      },
    };
  }
  handleChange = (evt) => {
    const { value, name } = evt.target;
    console.log(evt.target);
    // name: name || description || price || img
    this.setState((state) => ({
      values: {
        ...state.values,
        [name]: value,
      },
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    // Bơi vì componentDidUpdate s tự động đc thực thi khi stat hoặc prop thay đôi
    //
    if (this.props.user && this.props.user !== prevProps.user) {
      this.setState({ values: { ...this.props.user } });
    }
  }
  handleSubmit = async (evt) => {
    evt.preventDefault();
    const { id, ...payload } = this.state.values;
    try {
      if (id) {
        // Cập nhật
        await axios.put(
          `https://629757ee14e756fe3b2dcf70.mockapi.io/user/${id}`,
          payload
        );
      } else {
        await axios.post(
          `https://629757ee14e756fe3b2dcf70.mockapi.io/user/${id}`,
          payload
        );
        // Tạo mới
      }

      this.setState({
        values: {
          username: "",
          fullname: "",
          password: "",
          phone: "",
          typeuser: "",
          gmail: "",
          id: "",
        },
      });
      this.props.onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { values } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {/* Name */}
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Name
              </label>
              <input
                id="username"
                className="form-control"
                value={values.username}
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                id="password"
                className="form-control"
                value={values.password}
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gmail" className="form-label">
                Gmail
              </label>
              <input
                id="gmail"
                className="form-control"
                value={values.gmail}
                name="gmail"
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-success me-2">Submit</button>
            <button className="btn btn-primary">Update</button>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Họ tên
              </label>
              <input
                id="fullname"
                className="form-control"
                value={values.fullname}
                name="fullname"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                id="phone"
                className="form-control"
                value={values.phone}
                name="phone"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="typeuser" className="form-label">
                Loại người dùng
              </label>
              <select
                id="typeuser"
                className="form-control"
                onChange={this.handleChange}
                name="typeuser"
                value={values.typeuser}
              >
                <option  >
                  Khách hàng
                </option>
                <option>Quản trị</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
      </form>
    );
  }
}

export default UserForm;
