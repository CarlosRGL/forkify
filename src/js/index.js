import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
  // 1) Get query from the view
  const query = searchView.getInput(); // TODO

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      console.log(error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
  // Get the ID from the URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare the UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);
    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render the recipe
      console.log(state.recipe);
    } catch (error) {
      alert(error);
    }
  }
};
['haschange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
