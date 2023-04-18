'use strict';
import {renderCardMarkup} from './render-modal-Card-Markup';
import {fetchPictures} from './fetch-from-API';
import {positionBtnsContainer} from './modal-btns-positioning';

const sectionForRenderIn = document.querySelector('.modal-movie__content'); //<section>

export const handleApiData = async (pickedMovieId) => {
    sectionForRenderIn.innerHTML = '';

    try {
        const {
          poster_path,
          vote_average,
          vote_count,
          popularity,
          original_title,
          genres,
          overview,
        } = await fetchPictures(pickedMovieId);
    
        const eachGenre = genres.map(genre => {
          return ' ' + genre.name;
        });
    
        let roundedVote_average = null;
        if (vote_average < 10.0) {
          roundedVote_average = vote_average.toPrecision(2); //округлення дробових чисел (2 цифри)
        } else {
          roundedVote_average = vote_average.toPrecision(3);
        }
    
        const cardMarkup = renderCardMarkup(
          poster_path,
          roundedVote_average,
          vote_count,
          popularity,
          original_title,
          eachGenre,
          overview
        );
        
        sectionForRenderIn.insertAdjacentHTML('beforeend', cardMarkup);

        positionBtnsContainer();   // динамічне позиціонування контейнера з кнопками

      } catch (err) {
        console.log(err);
      }
}