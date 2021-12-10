import './style/style.css';
import './style/modern-normalize.css';
import {initialize} from './scripts/initialize';
import {createListeners} from './scripts/coordinator'

//IIFE to encapsulate site creation
(() => {
    //create the initial page structure
    initialize();
    //initialize the page content and create the page listeners
    createListeners();
})();
