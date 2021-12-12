import './style/style.css';
import './style/modern-normalize.css';
import {initialize} from './scripts/initialize';
import {load, createListeners} from './scripts/coordinator'

//IIFE to encapsulate site creation
(() => {
    //create the initial page structure
    initialize();
    //load the initial content
    load();
    //create the page listeners
    createListeners();
})();
