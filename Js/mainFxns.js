//drop-down-counter
let dD = 1;
let actionAlert = document.getElementById('actionAlert');
let clockInTime = new Date().getTime();
setInterval(() => {
	document.getElementById('timer').textContent =
		new Date().toLocaleTimeString();
}, 1000);
let selectBoxValue = '-Select-';

//local storage access
let projList = JSON.parse(localStorage.getItem('projectList'));
let clockData = JSON.parse(localStorage.getItem('clockInOutData'));

let todayDate = new Date().toLocaleDateString();

let emptyObj = {};
let todayDateEmptyObj = {};
todayDateEmptyObj[`${todayDate}`] = {
	count: 0,
};
//check if the local storage is present, if not, initialize
if (projList == null) {
	localStorage.setItem('projectList', JSON.stringify(emptyObj));
	projList = localStorage.getItem('projectList');
	projList = JSON.parse(projList);
}
if (clockData == null) {
	localStorage.setItem('clockInOutData', JSON.stringify(emptyObj));
	clockData = localStorage.getItem('clockInOutData');
	clockData = JSON.parse(clockData);
}
//check if there is data related to today's date, if not present, initialize one
if (clockData[`${todayDate}`] == undefined) {
	clockData[`${todayDate}`] = {};
	localStorage.setItem('clockInOutdata', JSON.stringify(`${clockData}`));
}
//function for checking running task and display it.
updateStatus = () => {
	let ongoingTask1 = document.getElementById('ongoingTask1');
	let ongoingTask2 = document.getElementById('ongoingTask2');
	let ongoingTask3 = document.getElementById('ongoingTask3');
	let todayDateObj = clockData[`${todayDate}`];
	let stats = 'No task Running';
	let prev = 'No data found';
	let older = 'No data found';
	let reverseCId = Object.keys(todayDateObj).reverse();
	ongoingTask1.style.borderColor = 'red';
	if (reverseCId.length != 0) {
		if (todayDateObj[`${reverseCId[0]}`].clockOutTime == '') {
			stats = 'Working on ' + todayDateObj[`${reverseCId[0]}`].projectName;
			ongoingTask1.style.borderColor = 'blue';
		}
		let len = reverseCId.length;
		let i = 0;
		let flag = 0;
		while (i < len) {
			if (todayDateObj[`${reverseCId[i]}`].clockOutTime != '') {
				if (todayDateObj[`${reverseCId[i]}`].projectName == 'Daily Work') {
					if (flag == 0) {
						prev = 'Worked on unknown task';
						i += 1;
						flag = 1;
					} else {
						older = 'Worked on unknown task';
						i = len + 1;
						break;
					}
				} else {
					if (flag == 0) {
						prev = 'Worked on ' + todayDateObj[`${reverseCId[i]}`].projectName;
						i += 2;
						flag = 1;
					} else {
						older = 'Worked on ' + todayDateObj[`${reverseCId[i]}`].projectName;
						i = len + 1;
						break;
					}
				}
			} else {
				i += 1;
			}
		}
	}
	ongoingTask1.childNodes[2].textContent = ': ' + stats;
	ongoingTask2.childNodes[2].textContent = ': ' + prev;
	ongoingTask3.childNodes[2].textContent = ': ' + older;
};
//function to display present day's working percentage
showPresentDayWorkingHours = () => {
	let tDiff = [0, 0, 0];
	let todayDateObj = clockData[`${todayDate}`];
	for (const eachEntry in todayDateObj) {
		if (
			todayDateObj[`${eachEntry}`].projectName == 'Daily Work' &&
			todayDateObj[`${eachEntry}`].clockOutTime != ''
		) {
			let cInTime = todayDateObj[`${eachEntry}`].clockInTime;
			let cOutTime = todayDateObj[`${eachEntry}`].clockOutTime;
			let getDifference = secondsDiff(cInTime, cOutTime);
			tDiff[0] += getDifference[0];
			tDiff[1] += getDifference[1];
			tDiff[2] += getDifference[2];
		}
	}
	getOverallDiffAndDisplayIt(tDiff);
};

//function to calculate time difference
secondsDiff = (time1, time2) => {
	var difference = time2 - time1;
	var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
	difference -= daysDifference * 1000 * 60 * 60 * 24;
	var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
	difference -= hoursDifference * 1000 * 60 * 60;
	var minutesDifference = Math.floor(difference / 1000 / 60);
	difference -= minutesDifference * 1000 * 60;
	var secondsDifference = Math.floor(difference / 1000);
	return [hoursDifference, minutesDifference, secondsDifference];
};
//get overall time difference in hrs
getOverallDiffAndDisplayIt = tDiffrnce => {
	let totalHrs = tDiffrnce[0] * 60 + tDiffrnce[1] + parseInt(tDiffrnce[2] / 60);
	totalHrs /= 60;
	document.getElementById('totalHours').textContent =
		Math.round(totalHrs * 100) / 100 + ' Hrs';
	document.getElementById('todayPercentage').textContent =
		(totalHrs / 24) * 100 + '%';
};
//function for changing the selected task from the user end
selectList = boxValue => {
	let selectBoxElements = document.querySelectorAll('.elements');
	let top = 70;
	for (let i = 0; i < selectBoxElements.length - 1; i++) {
		const element = selectBoxElements[i];
		if (dD > 0) {
			element.style.top = `${top}px`;
			top = top + 40;
		} else {
			element.style.top = '30px';
		}
	}
	if (dD < 0) {
		document.getElementById('dropDown').style.transform = '';
		switch (boxValue) {
			case '1':
				selectBoxValue = 'Daily Work';
				break;
			case '2':
				selectBoxValue = 'Portfolio';
				break;
			case '3':
				selectBoxValue = 'Coursera';
				break;
			case '4':
				selectBoxValue = 'DSA';
				break;
			case '0':
				selectBoxValue = '-Select-';
				break;
		}
	}
	document.getElementById(
		'topElement',
	).childNodes[0].textContent = `${selectBoxValue}`;
	if (dD > 0) {
		let imgele = document.getElementById('dropDown');
		imgele.style.transform = 'rotate(180deg)';
	}
	document.getElementById('topElement').value = selectBoxValue;
	dD = dD * -1;
};
//function to display any action made
actionAlertAppear = () => {
	setTimeout(() => {
		actionAlert.style.opacity = '0';
	}, 2500);
	actionAlert.style.opacity = '1';
};
checkIfNoTaskSelected = taskName => {
	if (taskName == '-Select-' || taskName == undefined) {
		actionAlertAppear();
		actionAlert.textContent =
			'Please select one of the options to start/end the task';
		return -1;
	}
	return 0;
};

//internal function
clockInWithDW = (todayDateObj, taskName, id) => {
	if (taskName != 'Daily Work') {
		let innerObj = {
			projectName: 'Daily Work',
			clockInTime: new Date().getTime(),
			clockOutTime: '',
		};
		todayDateObj[`cid${parseInt(id) + 1}`] = innerObj;
		id = parseInt(id) + 1;
	}
	let innerObj = {
		projectName: `${taskName}`,
		clockInTime: new Date().getTime(),
		clockOutTime: '',
	};
	todayDateObj[`cid${parseInt(id) + 1}`] = innerObj;
	return todayDateObj;
};
//login fxn
logIn = () => {
	let taskName = document.getElementById('topElement').value;
	if (checkIfNoTaskSelected(taskName) < 0) {
		return;
	}
	let flag1 = 0;
	if (taskName == 'Daily Work') {
		flag1 = 1;
	}
	let lastCId = 'cid-1';
	let todayDateObj = clockData[`${todayDate}`];
	for (const eachEntry in todayDateObj) {
		lastCId = eachEntry;
	}

	let id = lastCId.substring(3, lastCId.length);
	if (lastCId == 'cid-1') {
		todayDateObj = clockInWithDW(todayDateObj, taskName, id);
	} else if (todayDateObj[`${lastCId}`].clockOutTime == '') {
		if (todayDateObj[`${lastCId}`].projectName == 'Daily Work') {
			let innerObj = {
				projectName: `${taskName}`,
				clockInTime: new Date().getTime(),
				clockOutTime: '',
			};
			todayDateObj[`cid${parseInt(id) + 1}`] = innerObj;
		} else {
			actionAlertAppear();
			actionAlert.textContent = 'Some task running already';
			return;
		}
	} else {
		todayDateObj = clockInWithDW(todayDateObj, taskName, id);
	}
	clockData[`${todayDate}`] = todayDateObj;
	localStorage.setItem('clockInOutData', JSON.stringify(clockData));
	actionAlertAppear();
	actionAlert.textContent = `You have started working on '${taskName}'`;
	updateStatus();
};
//logout fxn
logOut = () => {
	let taskName = document.getElementById('topElement').value;
	if (checkIfNoTaskSelected(taskName) < 0) {
		return;
	}
	let todayDateObj = clockData[`${todayDate}`];
	let lastCId = '';
	for (const eachEntry in todayDateObj) {
		if (todayDateObj[`${eachEntry}`].clockOutTime == '') lastCId = eachEntry;
	}
	if (lastCId == '') {
		actionAlertAppear();
		actionAlert.textContent = 'Selected task not running';
		return;
	} else if (todayDateObj[`${lastCId}`].projectName != 'Daily Work') {
		if (todayDateObj[`${lastCId}`].projectName == taskName) {
			todayDateObj[lastCId].clockOutTime = new Date().getTime();
			clockData[`${todayDate}`] = todayDateObj;
			localStorage.setItem('clockInOutData', JSON.stringify(clockData));
			let id = lastCId.substring(3, lastCId.length);
			todayDateObj[`cid${id - 1}`].clockOutTime = new Date().getTime();
			clockData[`${todayDate}`] = todayDateObj;
			localStorage.setItem('clockInOutData', JSON.stringify(clockData));
		} else if (taskName == 'Daily Work') {
			actionAlertAppear();
			actionAlert.textContent = 'Selected task not running';
		}
	} else {
		todayDateObj[lastCId].clockOutTime = new Date().getTime();
		clockData[`${todayDate}`] = todayDateObj;
		localStorage.setItem('clockInOutData', JSON.stringify(clockData));
	}
	updateStatus();
	showPresentDayWorkingHours();
};
updateStatus();
showPresentDayWorkingHours();
