import React, { useState, useEffect } from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { MOVIE_DB_URL_FIRST, MOVIE_DB_URL_LAST } from '../config';

const HomePage = () => {
  const [ movie, setMovie ] = useState(null);
  const [ id, setId ] = useState(550);
  const MOVIE_DB_GET = `${MOVIE_DB_URL_FIRST}${id}${MOVIE_DB_URL_LAST}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MOVIE_DB_GET);
        const result = await response.json();
        console.log(result, 'result')
        setMovie(result);
      } catch (e) {
        console.error(e.message)
      }
    };
    fetchData();
  }, [id]);

  const renderList = (list, title) =>
    list ? (
      <ul>
        <h3 className='title__h3'>{title}: </h3>
        {
          list.map((item, index) => {
            return (
              <li key={index}>{item.name}</li>
            )
          })
        }
      </ul>
    ) : null;

  const inputHandler = (e) => {
    setId(e.target.value);
    console.log(MOVIE_DB_GET)
  }
  
  const descriptionMovie = () => {
    const {
      vote_average,
      vote_count,
      overview,
      budget,
      production_companies,
      production_countries
    } = movie;

    return (
      <>
        <h3 className='title__h3'>Описание:</h3> {overview}
        <h3 className='title__h3'>Бюджет: <span>{budget}</span></h3>

        { renderList(production_companies, 'Production company') }

        { renderList(production_countries, 'Production country') }
      </>
    )
  };

  const posterUrl = movie ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';

  return (
    <main>
      <section>

      <label>
        <NumericTextBox
            placeholder="please enter value"
            value={id}
            onChange={inputHandler}
        />
      </label>
        
      {
        movie ? <h1>{movie.title} <span><i>(ориг. {movie.original_title})({movie.id})</i></span></h1> : null
      }

      <div>
        <img alt='Poster' src={posterUrl}></img>
      </div>

      {
        movie ? descriptionMovie() : false
      }
      </section>
    </main>
  )
};

export default HomePage;
