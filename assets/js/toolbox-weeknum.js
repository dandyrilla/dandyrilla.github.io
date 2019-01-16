function pad(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}


function formatDate(date) {
    // convert Date instance into 'MMddyy' format.
	let MM = pad(date.getMonth() + 1).toString();
	let dd = pad(date.getDate()).toString();
	let yy = date.getFullYear().toString().substr(-2);
	return MM + dd + yy;
}


Date.prototype.getDayM = function() {
	// Monday-first version of getDay.
	return (this.getDay() + 6) % 7;
};


Date.prototype.toWeekString = function() {

	// Thursday in current week decides the year.
	let thu = new Date(this.getFullYear(), this.getMonth(), this.getDate() + 3 - this.getDayM() + offset * 7);
	let mon = new Date(this.getFullYear(), this.getMonth(), thu.getDate() - 3);  // monday
	let sat = new Date(this.getFullYear(), this.getMonth(), thu.getDate() + 2);  // saturday

	// January 4 is always in week 1.
	let week1 = new Date(thu.getFullYear(), 0, 4);
	week1.setDate(week1.getDate() + 3 - week1.getDayM());

	// Adjust to Thursday in week 1 and count number of week from date to week1.
	let days = (thu.getTime() - week1.getTime()) / 86400000;

	return thu.getFullYear() + "-W" + pad(1 + Math.round(days / 7)) + " (" + formatDate(mon) + "-" + formatDate(sat) + ")"
};


let offset = 0;
let today = new Date();
let wnText = document.getElementById('wn-text');
wnText.innerText = today.toWeekString();
wnText.addEventListener('click', copyWeekNum);


function copyToClipboard(value) {
    let elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = value;
    elem.select();
    document.execCommand('Copy');
    document.body.removeChild(elem);
}


function copyWeekNum() {
    // copy to clipboard
    let wnText = document.getElementById("wn-text");
    let value = wnText.innerText;
    copyToClipboard(value);
    // show message
    let sb = document.createElement("div");
    document.body.appendChild(sb);
    sb.id = "snackbar";
    sb.className = "show";
    sb.innerText = "클립보드에 복사되었습니다.\n" + value;
    setTimeout(function(){
        sb.className = sb.className.replace("show", "");
        document.body.removeChild(sb);
    }, 3000);
}


function moveWeek(event) {

	switch (event.target.id) {
		case 'wn-btn-prev':
			offset = offset - 1;
			break;
		case 'wn-btn-today':
			offset = 0;
			break;
		case 'wn-btn-next':
			offset = offset + 1;
			break;
	}
	wnText.innerText = today.toWeekString();
}

document.getElementById('wn-btn-prev').addEventListener('click', moveWeek);
document.getElementById('wn-btn-today').addEventListener('click', moveWeek);
document.getElementById('wn-btn-next').addEventListener('click', moveWeek);