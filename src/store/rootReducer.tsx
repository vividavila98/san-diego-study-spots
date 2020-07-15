import { combineReducers } from '@reduxjs/toolkit';
import studySpots from './slice';

const rootReducer = combineReducers({studySpots});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;