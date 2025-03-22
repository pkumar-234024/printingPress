import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../redux/slices/cardsSlice';
import Home from '../components/user/Home';

const User = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.cards);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards());
    }
  }, [dispatch, status]);
  
  return <Home />;
};

export default User;