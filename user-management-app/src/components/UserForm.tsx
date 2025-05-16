import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, RootState } from 'shared-store/src/store';
import './UserForm.scss';

type FormData = {
  name: string;
  role: 'admin' | 'viewer';
  email: string;
  password: string;
};

const UserForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingUser = useSelector((state: RootState) =>
    state.githubUsers.find(user => user.id === id)
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>();

  useEffect(() => {
    if (existingUser) {
      setValue('name', existingUser.name || '');
      setValue('role', existingUser.role || 'viewer');
      setValue('email', existingUser.email || '');
      setValue('password', existingUser.password || '');
    }
  }, [existingUser, setValue]);

  const onSubmit = (data: FormData) => {
    if (existingUser) {
      const updatedUser = {
        ...existingUser,
        login: data.name,
        name: data.name,
        avatar_url: existingUser.avatar_url || `https://ui-avatars.com/api/?name=${data.name}`,
        node_id: existingUser.id,
        role: data.role,
        email: data.email,
        password: data.password,
      };
      dispatch(updateUser(updatedUser));
    } else {
      const newUser = {
        name: data.name,
        avatar_url: `https://ui-avatars.com/api/?name=${data.name}`,
        id: crypto.randomUUID(),
        role: data.role,
        email: data.email,
        password: data.password,
      };
      dispatch(addUser(newUser));
    }
    navigate('/users');
  };

  return (
    <div className="form-container">
      <h2>{existingUser ? '✏️ Edit User' : '➕ Add User'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <label>
          Role
          <select {...register('role', { required: true })}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="submit">{existingUser ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;