// pages/AddBook.js
import React, { useState } from 'react';
import BookService from '../services/BookService'; // Yolu gerektiği gibi ayarlayın
import { Form, Button, Input } from 'semantic-ui-react';

const bookService = new BookService();

const AddBook = () => {
  const [book, setBook] = useState({ title: '', author: '', summary: '', Url: '' });
//event olduğu i,çin olay güncellemek için kuallnılır
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(book => ({
      ...book,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookService.addBook(book) // BookService örneğini kullanın
      .then(response => {
        console.log('Kitap eklendi:', response.data);
        // Opsiyonel: Başka bir sayfaya yönlendirme veya başarı mesajı gösterme
      })
      .catch(error => {
        console.error('Kitap eklenemedi:', error);
      });
  };

  return (
    <div>
      <h2>Kitap Ekle</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Başlık</label>
          <Input
            type="text"
            name="bookname"
            value={book.bookname}
            onChange={handleChange}
            placeholder="Kitap Başlığı"
          />
        </Form.Field>
        <Form.Field>
          <label>Yazar</label>
          <Input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Kitap Yazarı"
          />
        </Form.Field>
        <Form.Field>
          <label>Özet</label>
          <Input
            type="text"
            name="booksummary"
            value={book.booksummary}
            onChange={handleChange}
            placeholder="Kitap Özeti"
          />
        </Form.Field>
        <Form.Field>
          <label>Resim URL'si</label>
          <Input
            type="text"
            name="url"
            value={book.url}
            onChange={handleChange}
            placeholder="Kitap Resim URL'si"
          />
        </Form.Field>
        <Button type="submit">Kitap Ekle</Button>
        
      </Form>
    </div>
  );
};

export default AddBook;
