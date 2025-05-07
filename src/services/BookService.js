// BookService.js
import axios from 'axios';

export default class BookService {
  getBooks() {
    return axios.get('http://localhost:8080/api/books/getAll');
  }

  getBooksById(id) {
    return axios.get(`http://localhost:8080/api/books/getBooksById?id=` + id);
  }

  addBook(book) {
    return axios.post('http://localhost:8080/api/books/add', book);
  }

  updateBook(id, book) {
    console.log("asdasd", book);
    return axios.put(`http://localhost:8080/api/books?id=${id}`, book);
  }

  deleteBook(id) {
    return axios.delete(`http://localhost:8080/api/books/delete/${id}`);
  }
  
    
  
  
    
  
  
}
