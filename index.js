import { ready } from 'https://lsong.org/scripts/dom.js';
import { h, render, useState, useEffect } from 'https://lsong.org/scripts/components/react.js';


const getBooks = async () => {
  const response = await fetch('books.json');
  const books = await response.json();
  return books;
};


const App = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks().then(books => setBooks(books));
  }, []);
  return [
    h('h2', null, "Books 📖"),
    h('ul', { className: 'books' }, [
      books.map(book =>
        h('li', { className: 'book' },
          h('a', { href: book.link },
            h('img', { src: book.img, alt: book.title }),
            h('h3', null, book.title),
            h('p', null, book.description),
          )
        ))
    ])
  ]
};

ready(() => {
  const app = document.getElementById('app');
  render(h(App), app);
});
