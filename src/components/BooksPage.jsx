import './Books.css';
import { BOOKS } from "../assets/Books";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

const Books = () => {
  // const dispatch = useDispatch();
  // If you need to use `useSelector`, you can define what part of the state you want to select
  // const books = useSelector(state => state.books); // Example of using useSelector

  return (
 
  <div>
     <Header/>

  
    <div className="books">
       
      {BOOKS.map(book => (
        <div key={book.id} className="books-item">
          <img src={book.cover} alt={book.title} width="200px" height="300px" />
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <h3>{book.author}</h3>
          <Link to={`/books/${book.id}`}>View Details</Link> {/* Example of a link to a book details page */}
        </div>
      ))}
      <Footer/>
    </div>
    </div>
 
  );
};

export default Books;
