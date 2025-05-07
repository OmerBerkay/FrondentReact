import React from 'react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';
import ProductList from '../pages/ProductList';

export default function Dashbord() {
  const navigate = useNavigate();

  const handleAddBookClick = () => {
    navigate('/add-book'); // Kitap ekleme sayfasına yönlendirir
  };
  const handleDeleteBookClick=() =>{
    navigate('delete-book');
  };

  return (
    <div>
      <Button primary onClick={handleAddBookClick}>kitap ekleme</Button>
      <Button primary onClick={handleDeleteBookClick}>kitap silme</Button>
      <Categories/>
      <ProductList/>
    </div>
  );
}
