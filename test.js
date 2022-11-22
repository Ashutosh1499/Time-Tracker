// let a = {
// 	test: {
// 		newTest: 'letsee',
// 	},
// };
// let b = {
// 	anotherTesting: 'passed',
// };

// a.fail = b;
// console.log(a);
// console.log(a.test);
// console.log(a.fail);
// localStorage.setItem('testingKey', a);
// let ls = localStorage.getItem('testingKey');
// console.log(ls);

// let newObj = { nObj: 'ntst' };
// console.log(newObj.nObj);
// localStorage.setItem('objTesting', JSON.stringify(newObj));
// let retVal = localStorage.getItem('objTesting');
// retVal = JSON.parse(retVal);
// console.log(retVal.nObj);

// let obj1 = {
// 	key1: 'value1',
// 	key2: 'value2',
// };
// let i = 'key0';
// console.log(obj1);
// console.log(obj1.key1);
// obj1[i] = 'ival';
// console.log(obj1);
// let a = prompt('enter the numbers without space');
// let count = [];
// for (let i = 0; i < 10; i++) {
// 	count[i] = 0;
// }
// for (let i = 0; i < a.length; i++) {
// 	count[a[i]]++;
// }
// a = '';
// let j = 0;
// for (let i = 0; i < 10; i++) {
// 	while (count[i] != 0) {
// 		a += i;
// 		count[i]--;
// 		j++;
// 	}
// }
// console.log(a);

// pos = [];
// for (let i = 0; i < 9; i++) {
// 	pos[i] = 0;
// }
// pos[0] = 1;
// for (let i = 1; i < 9; i++) {
// 	pos[i] = pos[i - 1] + count[i - 1];
// }
// na = [];
// for (let i = 0; i < a.length; i++) {
// 	na[pos[a[i]]] = a[i];
// 	pos[a[i]] = pos[a[i]] + 1;
// }
// let st = '';
// for (let i = 0; i < na.length + 1; i++) {
// 	if (na[i] != undefined) {
// 		st += `${na[i]}`;
// 	}
// }
// console.log(st);
