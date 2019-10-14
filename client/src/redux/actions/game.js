import axios from 'axios';
import { SERVER_ERROR, GAME_LOADED, GAME_LOAD_FAILED, GAME_PAGE_LOADED, GAME_PAGE_LOAD_FAILED, GAME_DOWNLOADED, GAME_DOWNLOAD_FAILED, REVIEW_ADDED, REVIEW_ADD_FAILED, REVIEW_DELETED, REVIEW_DELETE_FAILED, RATING_LOADED, RATING_LOAD_FAILED } from '../types/types';
import { HOST_URL } from "../../constants";

// load games
export const loadGames = (empty) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/game/load-games', empty);
    const res2 = await axios.post(HOST_URL + '/api/game/load-ratings-counts', empty);
    if(!res.data[0]) {
      dispatch({
        type: GAME_LOAD_FAILED
      });
    } else {
      if(res.data.length === res2.data.length) {
        for(let i=0; i<res.data.length; i++) {
          res.data[i].rating_count = res2.data[i].rating_count;
        }
      }
      dispatch({
        type: GAME_LOADED,
        payload: res.data
      });
    }
  } catch(err) {
    dispatch({
      type: SERVER_ERROR
    });
  }
};

// load game
export const loadGamePage = (game) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/game/load-game-page', game);
    if(!res.data[0]) {
      dispatch({
        type: GAME_PAGE_LOAD_FAILED
      });
    } else {
      dispatch({
        type: GAME_PAGE_LOADED,
        payload: res.data
      });
    }
  } catch(err) {
    dispatch({
      type: SERVER_ERROR
    });
  }
};

// download game
export const downloadGame = (info) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/game/download-game', info);

    dispatch({
      type: GAME_DOWNLOADED,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: GAME_DOWNLOAD_FAILED
    });
  }
};

// add review
export const addReview = (info) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/game/add-review', info);
    
    dispatch({
      type: REVIEW_ADDED,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: REVIEW_ADD_FAILED
    });
  }
};

// delete review
export const deleteReview = (info) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/game/delete-review', info);
    
    dispatch({
      type: REVIEW_DELETED,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: REVIEW_DELETE_FAILED
    });
  }
};

// load ratings
export const loadRatings = (info) => async dispatch => {
  try {
    const res = await axios.post(HOST_URL + '/api/game/load-ratings', info);
    
    dispatch({
      type: RATING_LOADED,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: RATING_LOAD_FAILED
    });
  }
};