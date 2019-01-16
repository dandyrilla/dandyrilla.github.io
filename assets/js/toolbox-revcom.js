function revCom () {

	let newDna = "";
	let title = "";
	let maxInput = 100000000;

	if (testScript() == false) {
		return false;
	}

	let elemInput = document.getElementById("elem-input");
	if ((checkFormElement(elemInput) == false) || (checkSequenceLength(elemInput.value, maxInput) == false)) {
		return false;
	}

	let arrayOfFasta = getArrayOfFasta(elemInput.value);
    let elemOutput = document.getElementById("elem-output");
    let elemSelect = document.getElementById("elem-select");
    let elemSelectValue = elemSelect.options[elemSelect.selectedIndex].value;

    elemOutput.innerText = "";
	for (let i = 0; i < arrayOfFasta.length; i++)	{

		newDna = getSequenceFromFasta(arrayOfFasta[i]);
		newDna = removeNonDna(newDna);
		title  = getTitleFromFasta(arrayOfFasta[i]);

		if (elemSelectValue == "rc") {
		    elemOutput.innerText += ">" + title + " reverse complement\n";
			newDna = reverse(complement(newDna));
		}
		else if (elemSelectValue == "r")	{
		    elemOutput.innerText += ">" + title + " reverse\n";
            newDna = reverse(newDna);
		}
		else if (elemSelectValue == "c")	{
		    elemOutput.innerText += ">" + title + " complement\n";
			newDna = complement(newDna);
		}

		elemOutput.innerText += addReturns(newDna) + '\n\n';
	}

	return true;
}

function clearInput() {
    document.getElementById("elem-input").value = "";
    document.getElementById("elem-output").innerText = "";
}