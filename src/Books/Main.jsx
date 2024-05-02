import React, { useEffect, useState } from 'react';
import './style.css'

function Main() {
    const [booksBySubjects, setBooksBySubjects] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
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

        fetchBooks();
    }, []);

    return (
        <>
            {booksBySubjects.map((booksBySubject, index) => (
                <div key={index}>
                    <h3>{booksBySubject?.name}</h3>
                    {booksBySubject?.works?.map((bookInfo, index) => (
                        <div className="book-wrapper" key={index}>
                            <div className="second">
                            <h3>{bookInfo.title}</h3>
                            <div className="image" key={index}>
                                <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt="cover_id" />
                            </div>
                            </div>
                            {/* <h3>{bookInfo.cover_id}</h3> */}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default Main;