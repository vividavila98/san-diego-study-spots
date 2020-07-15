// createSlice accepts initial state, render functions, and slice name
// to automatically generate action creators and types that correspond
// to reducers and state 

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';
import { Spot } from './types';
import firebase from "firebase/app";
// import { firebaseConfig } from "../config/firebase";
import "firebase/database";

const initialState: Spot[] = [];

const spotSlice = createSlice({
    name: 'studySpots',
    initialState,
    reducers: {
        getStudySpots(state: Spot[], action: PayloadAction<Spot[]>) {
            return state = action.payload;
            //console.log(state);
            }
        }
});

export const getStudySpots = (): AppThunk => async (dispatch: AppDispatch) => {
    const databaseRef = firebase.database().ref();
    const studyRef = databaseRef.child("study-spots");
    studyRef.on('value', snapshot => {
        let spots = snapshot.val();
        let newSpots: Spot[] = [];
        for (let key in spots) {
            newSpots.push({
                id: key,
                name: spots[key].name,
                description: spots[key].description,
                image: spots[key].image
            });
        };
        dispatch(spotSlice.actions.getStudySpots(newSpots));
    });
}

export default spotSlice.reducer;