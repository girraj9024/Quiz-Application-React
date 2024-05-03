import React, { useEffect, useState } from 'react';
import './style.css'

function Main() {
    const [booksBySubjects, setBooksBySubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            
                const urls = [
                    "https://openlibrary.org/subjects/thriller.json?details=true",
                    "https://openlibrary.org/subjects/love.json?details=true",
                    "https://openlibrary.org/subjects/kids.json?details=true",
                    "https://openlibrary.org/subjects/romance.json?details=true",
                ];

                const responses = await Promise.all(urls.map(url => fetch(url)));
                const results = await Promise.all(responses.map(response => response.json()));

                setBooksBySubjects(results);
            
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const filteredResults = booksBySubjects.map(subject => ({
            ...subject,
            works: subject.works.filter(work => work.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }));

        setSearchResults(filteredResults);
    }, [searchTerm, booksBySubjects]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
        <input type="search" name="" id="search" placeholder='Search books by title' value={searchTerm} onChange={handleSearchChange} />
                {searchResults.map((booksBySubject, index) => (
                    <div key={index}>
                        <div>
                            <h3 className='hmain'>{booksBySubject?.name}</h3>
                        </div>
                        <div className='ssmain'>
                            {booksBySubject?.works?.map((bookInfo, index) => (
                                <div className="book-wrapper" key={index}>
                                        <h3 className='booktaetal'>{bookInfo.title}</h3>
                                        <div className="image" key={index}>
                                            <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt="cover_id" />
                                        </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </>
    )
}

export default Main;
