import { format, compareAsc } from 'date-fns'
import './style.css';
import './modern-normalize.css';
import {initialize} from './initialize';

initialize();

const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
]

dates.sort(compareAsc);
console.log(dates)

//factory function for task creation
const task = (main, detail, priority, date, status, index) => {
    let item = {
        "main": main,
        "detail": detail,
        "priority": priority,
        "date": date,
        "status": status,
        "index": index,
    }
}