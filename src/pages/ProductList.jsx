import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService'; 
import { Card, Image, Button, Grid, Modal, ModalHeader, ModalContent, FormField } from 'semantic-ui-react'; 
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState([]);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchBooks();
  }, []);

  const fetchUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setUserId(user.id);
    } else {
      console.error('Kullanıcı bilgileri bulunamadı');
    }
  };

  const fetchBooks = async () => {
    const bookService = new BookService();
    try {
      const response = await bookService.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Kitaplar alınırken hata oluştu:', error);
    }
  };

  const handleUpdateBook = async (books) => {
    const bookService = new BookService();
    await bookService.updateBook(item?.id, books);
    fetchBooks(); 
  };

  const handleTakeBook = async (bookId) => {
    try {
      await axios.post('http://localhost:8080/userbooks/take', {
        userId: userId,
        bookId: bookId
      });
      fetchBooks();
    } catch (error) {
      console.error('Kitap alınırken hata oluştu:', error);
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      await axios.post('http://localhost:8080/userbooks/return', {
        userId: userId,
        bookId: bookId
      });
      fetchBooks();
    } catch (error) {
      console.error('Kitap bırakılırken hata oluştu:', error.response ? error.response.data : error.message);
    }
  };

  const handleOpenPortal = (book) => {
    setItem(book);
    setOpen(true);
  };

  const handleClose = () => {
    navigate("/");
    setOpen(false);
  };

  const initialValues = { bookname: item?.bookname, author: item?.author, booksummary: item?.booksummary, url: item?.url };

  return (
    <>
      <Grid container columns={3} stackable className="book-grid" style={{ marginTop: '40px' }}>
        {books.map((book) => (
          <Grid.Column key={book.id} style={{ height: '600px' }}>
            <Card className="book-card">
              {book.url &&
                <Image floated='right' size='mini' src={book.url} style={{ height: '400px', width: '400px', margin: '0 auto' }} />
              }
              <Card.Content>
                <Card.Header>{book.bookname}</Card.Header>
                <Card.Meta>{book.author}</Card.Meta>
                <Card.Description>{book.booksummary}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui buttons'>
                  {book.takenByUserId === userId ? (
                    <Button basic color='red' onClick={() => handleReturnBook(book.id)}>Bırak</Button>
                  ) : book.takenByUserId ? (
                    <Button basic color='grey' disabled>Kitap Dolu</Button>
                  ) : (
                    <Button basic color='green' onClick={() => handleTakeBook(book.id)}>Al</Button>
                  )}
                  
                  <Modal
                    onClose={() => setOpen(false)}
                    open={open}
                    trigger={<Button basic color='red' onClick={() => handleOpenPortal(book)}>Güncelle</Button>}
                  >
                    <ModalHeader>Güncelleme Sayfası</ModalHeader>
                    <ModalContent image>
                      <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                          handleUpdateBook(values);
                        }}
                      >
                        <Form className='ui form' style={{ width: '100%' }}>
                          <div>Kitap Adı:</div>
                          <FormField>
                            <Field name="bookname" placeholder="Kitap Adı:" />
                          </FormField>
                          <FormField>
                            <Field name="author" placeholder="Yazar:" />
                          </FormField>
                          <FormField>
                            <Field name="booksummary" placeholder="Kitap Özeti:" />
                          </FormField>
                          <FormField>
                            <Field name="url" placeholder="Kitap Url:" />
                          </FormField>
                          <div className="ui center aligned segment">
                            <Button color="green" type="submit">Güncelle</Button>
                            <Button content='Vazgeç' negative onClick={handleClose} />
                          </div>
                        </Form>
                      </Formik>
                    </ModalContent>
                  </Modal>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
