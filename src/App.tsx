import React, {useState, useEffect} from 'react';
import './App.css';
import { RootState } from './store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getStudySpots } from './store/slice';
import styled from 'styled-components';
import firebase from "firebase/app";
import {Spot} from './store/types';
import { firebaseConfig } from "./firebase";
import "firebase/database";

const Title = styled.h1`
font-size: 35px;
color: #5f122f;
margin: 0;
`;

const Wrapper = styled.section`
margin: 0;
text-align: center;
padding-top: 60px;
height: 100%;
width: 100%;
background: papayawhip;
`;

const Name = styled.h2`
color: palevioletred;
font-size: 25px;
`;

const Image = styled.img`
height:400px;
width: 600px;
`;

const Description = styled.p`
color: #9D5394;
font-size: 20px;
`;

const Button = styled.button`
background: #99446c;
  border-radius: 3px;
  border: 1px solid #99446c;
  color: white;
  margin: 0.5em 1em;
  padding: 10px 25px;
  &:hover {
    cursor: pointer;
    background: #d45b94;
    border: 1px solid #d45b94;
  }
`

function ButtonDisplay(onClick: any) {
  const dispatch = useDispatch();
  //const [spots, setSpots] = useState<any>([]);
  const [num, setNum] = useState(0);
  //const [testSpots, setTestSpots] = useState<any>([]); 
  const studySpots: Spot[] = useSelector((state: RootState) => state.studySpots);
  console.log(studySpots);

  /*const getStudyData = () => {
    const databaseRef = firebase.database().ref();
    const studyRef = databaseRef.child("study-spots");
    studyRef.on('value', snapshot => {
      let spotsData = snapshot.val();
      let newSpots = [];
      for (let spot in spotsData) {
        newSpots.push({
        id: spot,
        name: spotsData[spot].name,
        description: spotsData[spot].description,
        image: spotsData[spot].image
      });
    };
    setSpots(newSpots);
  });
}*/

const getNewSpot = () => {
  if (num <=5) {
    setNum(num +1);
  } else if (num > 5) {
    setNum(0);
  } 
};

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    dispatch(getStudySpots());
  }, []);

  /*useEffect(() => {
    getStudyData();
  }, []);*/

  return (
    <>
    { studySpots[0] &&
    <Wrapper>
      <Title>
        My Favorite Places to Study at in San Diego:
      </Title>
      <Name>{studySpots[num].name}</Name>
      <Image src={studySpots[num].image}></Image>
      <Description>{studySpots[num].description}</Description>
      <Button onClick={getNewSpot}>Next</Button>
    </Wrapper> }
    </>
  );
}

export default ButtonDisplay;
