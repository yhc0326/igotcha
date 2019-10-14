import { SERVER_ERROR, GAME_LOADED, GAME_LOAD_FAILED, GAME_PAGE_LOADED, GAME_PAGE_LOAD_FAILED, GAME_DOWNLOADED, GAME_DOWNLOAD_FAILED, REVIEW_ADDED, REVIEW_ADD_FAILED, REVIEW_DELETED, REVIEW_DELETE_FAILED, RATING_LOADED, RATING_LOAD_FAILED } from "../types/types";

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SERVER_ERROR:
          return {
            ...state,
            serverError: true,
          };
        case GAME_LOADED:
          return {
            ...state,
            games: payload,
          };
        case GAME_LOAD_FAILED:
          return {
            ...state,
            games: null,
          };
        case GAME_PAGE_LOADED:
          return {
            ...state,
            gamePage: payload,
          };
        case GAME_PAGE_LOAD_FAILED:
          return {
            ...state,
            gamePage: null,
          };
        case GAME_DOWNLOADED:
          return {
            ...state,
            downloadedGame: payload,
          };
        case GAME_DOWNLOAD_FAILED:
          return {
            ...state,
            downloadedGame: null,
          };
        case REVIEW_ADDED:
          return {
            ...state,
            addedReview: payload,
          };
        case REVIEW_ADD_FAILED:
          return {
            ...state,
            addedReview: null,
          };
        case REVIEW_DELETED:
          return {
            ...state,
            deletedReview: payload,
          };
        case REVIEW_DELETE_FAILED:
          return {
            ...state,
            deletedReview: null,
          };
        case RATING_LOADED:
          return {
            ...state,
            loadedRatings: payload,
          };
        case RATING_LOAD_FAILED:
          return {
            ...state,
            loadedRatings: null,
          };
        default:
          return state;
    }
}