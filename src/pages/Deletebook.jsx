import React, { useState } from 'react';
import BookService from '../services/BookService'; // Yolu gerektiği gibi ayarlayın
import { Form, Button, Input } from 'semantic-ui-react';

const bookService = new BookService();

const Deletebook = () => {
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState(''); // Başarı veya hata mesajlarını göstermek için

  const handleChange = (e) => {
    setBookId(e.target.value);
  };

  const handleSubmit = async (e) => {
    //sayfa sürekli yenilenmesi idye
    e.preventDefault();
    //boşluk hatası için trim yazdım
    if (bookId.trim() === ('')) {
      setMessage('Kitap ID\'si girilmelidir.');
      return;
    }
    
    try {
        //hata mesajında işlem sonu için yazarım
      const response = await bookService.deleteBook(bookId);
      setMessage(`Kitap silindi`);
    } catch (error) {
      setMessage(`Kitap silinemedi`);
    }
  };

  return (
    <div>
      <h2>Kitap Sil</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Kitap ID'si</label>
          <Input
            type="text"
            name="bookId"
            value={bookId}
            onChange={handleChange}
            placeholder="Silinecek Kitap ID'si"
          />
        </Form.Field>
        <Button type="submit" primary className="button-spacing">Kitap Sil</Button>
      </Form>
      {message && <p>{message}</p>} {/* Mesajları göstermek için */}
    </div>
  );
};

export default Deletebook;
