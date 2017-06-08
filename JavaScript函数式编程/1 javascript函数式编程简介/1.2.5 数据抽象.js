/*
name,    age,    hair
张三,    18,      red
李四,     20,     yellow
*/

const _ = require('../underscore');
// const _ = require('../../框架源码练习/underscore/underscore');

function lameCVS(str) {
    return _.reduce(str.split('\n'), (table, row) => {
        table.push(_.map(row.split(','), v => { return v.trim() }));
        return table;
    }, [])
}

let CVSStr = 'name, age, hair\n张三,    18,      red\n李四,     20,     yellow';
let peopleTable = lameCVS(CVSStr);
console.log(peopleTable);
peopleTable = _.rest(peopleTable).sort();
console.log(peopleTable);
