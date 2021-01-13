import React, { useState, useEffect } from 'react';

import { MOVIE_DB_GET } from '../config';

const HomePage = () => {
  // movie - react-состояние;
  // setMovie - функция обновления react-состояния
  const [ movie, setMovie ] = useState(null);


  useEffect(() => {
    let cleanupFunction = false;
    const fetchData = async () => {
      try {
        const response = await fetch(MOVIE_DB_GET);
        const result = await response.json();
        console.log(result, 'result')

        // непосредственное обновление состояния
        if(!cleanupFunction) setMovie(result);
      } catch (e) {
        console.error(e.message)
      }
    };

    fetchData();

    // функция очистки useEffect
    return () => cleanupFunction = true;
  }, []);

  const descriptionMovie = () => {
    const {
      vote_average,
      vote_count,
      original_title,
      title,
      id,
      overview,
      budget,
      production_companies,
      production_countries
    } = movie;

    return (
      <>
        <p><h3 className='title__h3'>Описание:</h3> {overview}</p>
        <p><h3 className='title__h3'>Бюджет:</h3> {budget}</p>

        {
          production_companies ? (
            <ul>
              <h3 className='title__h3'>Production company: </h3>
              {
                production_companies.map((item, index) => {
                  return (
                    <li key={index}>{item.name}</li>
                  )
                })
              }
            </ul>
          ) : false
        }

        {
          production_countries ? (
            <ul>
              <h3 className='title__h3'>Production country: </h3>
              {
                production_countries.map((item, index) => {
                  return (
                    <li key={index}>Продакшн страна: {item.name}</li>
                  )
                })
              }
            </ul>
          ) : false
        }
      </>
    )
  };

  return (
    <main>
      <section>
      {
        movie ? <h1>{movie.title} <span><i>(ориг. {movie.original_title})</i></span></h1> : null
      }

      <div><img src='https://image.tmdb.org/t/p/w200/66RvLrRJTm4J8l3uHXWF09AICol.jpg'></img></div>

      {
        movie ? descriptionMovie() : false
      }
      </section>
    </main>
  )
};

export default HomePage;
