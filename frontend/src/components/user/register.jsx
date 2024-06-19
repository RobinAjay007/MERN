import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, register } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');
  const dispatch=useDispatch();
  const{loading,error,isAuthenticated}=useSelector(state=>state.authState)
  const navigate=useNavigate();
  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };
  console.log(avatar)

  const submitHandler=(e)=>{
    e.preventDefault();
    const fromData = new FormData();
    fromData.append('name',userData.name);
    fromData.append('email',userData.email);
    fromData.append('password',userData.password);
    fromData.append('avatar',avatar);
    dispatch(register(fromData))
  }

  useEffect(()=>{
    if(isAuthenticated){
        navigate('/')
        return
    }
    if (error) {
        toast(error,{
          type:"error",
          onOpen:()=>{ dispatch(clearAuthError)}
        });
        return;
    }
  },[error,dispatch,isAuthenticated,navigate])

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              name="name"
              id="name_field"
              className="form-control"
              value={userData.name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              name="email"
              id="email_field"
              className="form-control"
              value={userData.email}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              name="password"
              id="password_field"
              className="form-control"
              value={userData.password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
