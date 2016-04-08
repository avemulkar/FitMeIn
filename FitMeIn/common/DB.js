
import Store from 'react-native-store';

var DB = {
    "pushups": Store.model('pushups'),
    "situps": Store.model('situps'),
    "squats": Store.model('squats'),
    "dips": Store.model('dips'),
    "hipraises": Store.model('hipraises'),
    "lunges": Store.model('lunges'),
    "currentWorkout": Store.model('currentWorkout')
}

module.exports = DB;
