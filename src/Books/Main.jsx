import React, { useEffect, useState } from 'react';
import './style.css';

function Main() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [booksBySubjects, setBooksBySubjects] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (searchTerm.trim() === '') {
                    setSearchResults([]);
                } else {
                    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`;

                    const response = await fetch(searchUrl);
                    const result = await response.json();

                    setSearchResults(result.docs);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooks();
    }, [searchTerm]);

    useEffect(() => {
        const fetchBooksBySubjects = async () => {
            try {
                const urls = [
                    "https://openlibrary.org/subjects/thriller.json?details=true",
                    "https://openlibrary.org/subjects/love.json?details=true",
                    "https://openlibrary.org/subjects/kids.json?details=true",
                    "https://openlibrary.org/subjects/romance.json?details=true",
                ];

                const responses = await Promise.all(urls.map(url => fetch(url)));
                const results = await Promise.all(responses.map(response => response.json()));

                setBooksBySubjects(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooksBySubjects();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div id="search"><input type="text" placeholder="Search by book title" value={searchTerm} onChange={handleSearchChange} />
            </div>
            {searchResults.map((book, index) => (
                <div className="book-wrapper" key={index}>
                    <h3>{book.title}</h3>
                    <p>Author(s): {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                    <div className="image">
                        {book.cover_i && <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />}
                    </div>
                </div>
            ))}
            {booksBySubjects.map((subject, index) => (
                <div className='hmain' key={index}>
                    <h3 className='smain'>{subject.name}</h3>
                    <div className="main">
                    {subject.works.map((bookInfo, index) => (
                        <div className="book-wrapper" key={index}>
                            <h3 className='booktaetal'>{bookInfo.title}</h3>
                            <div className="image">
                                {bookInfo.cover_id && <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt={bookInfo.title} />}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default Main;