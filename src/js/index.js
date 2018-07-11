// Global app controller
// 025f9947a832641c50198ba26b28e215
// http://food2fork.com/api/search

import axios from 'axios';

async function getResults(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const key = '025f9947a832641c50198ba26b28e215';
  try {
    const res = await axios(
      `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
    );
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }
}

getResults('pizza');
