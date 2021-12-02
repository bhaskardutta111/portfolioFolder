/*BEFORE STARTING TO CODE THE APP--
step 1:
ALWAYS STRUCTURE IT I.E. 
BREAK DOWN ALL OF ITS WORK INTO SMALLER TASK AND MAKE A TO-DO LIST */
/*TO-DO LIST */
/*1. ADD EVENT HANDLER TO THE ONLY BUTTON
2. GET THE ADD/SUB DESCRIPTION FROM INPUT FIELD
3. GET THESE DESCRIP:VALUE TO OUR INTERNAL DATA STRUCTURE FOR THE LIST
4. DISPLAY ON INCOME/EXPENSES LIST  UI
5. MAIN DISPLAY PANEL AS DISPLAY/EXPENSES UI
6. CALCULATE THE MAIN BUDGET   */

/*step 2:
MAKE MODULES TO CATEGORIZE THE TO-DO LIST
/*UI MODULE
2. GET THE ADD/SUB DESCRIPTION FROM INPUT FIELD
4. DISPLAY ON INCOME/EXPENSES LIST  UI
5. MAIN DISPLAY PANEL AS DISPLAY/EXPENSES UI
*/

/*DATA MODULE
3. GET THESE DESCRIP:VALUE 
TO OUR INTERNAL DATA STRUCTURE FOR THE LIST
6. CALCULATE THE MAIN BUDGET  
 */

/*CONTROLLER MODULE
1. ADD EVENT HANDLER TO THE ONLY BUTTON
*/


/*DATA MODULE*/
var dataController = (function() {
	var Incomes = function(id, descrip, value) {
		this.id = id;
		this.descrip = descrip;
		this.value = value;
	};

	var Expenses = function(id, descrip, value) {
		this.id = id;
		this.descrip = descrip;
		this.value = value;
		this.percent = -1;
	};

	Expenses.prototype.calcPercent = function(totalIncome){
		if (totalIncome > 0) {
		this.percent = Math.round((this.value / totalIncome) * 100);			
		} else {
		this.percent = -1;
		}
	};

	Expenses.prototype.getPercent = function(){
		return this.percent;
	};

	var calculateTotal = function(type){
			var sum = 0;

			appData.data[type].forEach( function(curr) {
				sum += curr.value;
				/*
				sum = 0
				[200 400 600]
				sum = 0 + 200;
				sum = 200 + 400;
				sum = 400 + 600;
				 */
			});
			appData.totals[type] = sum;
		};


	var appData = {		
		data: {
			add: [],
			sub: []
		},
		totals: {
			add: 0,
			sub: 0
		},
		budget: 0,
		percent: -1
	};

	return {
			addItem: function(type, des, val) {

				//[1 2 3 4], next val 5
				//[1 3 4 5], next val 6
				//ID = (last value in array) + 1;
				//ID = (length of array - 1) + 1;
				//ID = add or sub [length of array - 1 + 1]
				
				//Create new ID	
				if (appData.data[type].length > 0) {
					var ID = appData.data[type][appData.data[type].length - 1].id + 1;	
 				} else {
 					ID = 0;
 				}

				//Create new Entry(inc or exp depending on add or sub)
				if (type === 'add') {
					var newEntry = new Incomes(ID, des, val);	
				} else if (type === 'sub') {
					var newEntry = new Expenses(ID, des, val);
				}

			// adding new Entry to our data structure
			appData.data[type].push(newEntry);

			//Return the new Entry to other modules
			return newEntry
		},

		deleteEntry: function(type, id){

			//suppose we want delete id 6
			//[1 3 4  8], next val 9
			// appdata.data[type][id] doesnt work
			// a new array is needed to store all ids,then select the index of that 
			// particular id, then delete it

				var ids = appData.data[type].map(function(current){
					return current.id;
				});

				var index = ids.indexOf(id);

				if (index !== -1) {
					appData.data[type].splice(index, 1);
				}

		},

		calculateBudget: function(){
			// calculate the total income/expenses
			calculateTotal('add');
			calculateTotal('sub');
			
			// calculate the budget = income - expenses
			appData.budget = appData.totals.add - appData.totals.sub;


			// calculate the percent of income we have spent
			if (appData.totals.add > 0) {
				appData.percent =  Math.round((appData.totals.sub / appData.totals.add) * 100);				
			} else {
		 		appData.percent = -1;
			}

		},

		calculatePercentages: function(){
			/*
			20
			30
			40
			total = 100
			a = 20/100 = 20%
			b = 30/100 = 30%
			a method on each object percentages
			 */			
			appData.data.sub.forEach(function(curr) {
				curr.calcPercent(appData.totals.add);
			});
		},

		getPercentages: function(){
			var allPercents = appData.data.sub.map(function(curr){
					return curr.getPercent();
			});
			return allPercents;
		},

		getBudget: function(){
			return{
				budget: appData.budget,
				percent: appData.percent,
				totalIncome: appData.totals.add,
				totalExpense: appData.totals.sub
			}
		},

		testing: function(){
			console.log(appData);
		}

	};

}) ();



/*UI MODULE*/
var uiController = (function() {

//1. GET THE DATA FROM INPUT FIELDS
	
	var DOMstrings = {
		inputAddSub: '.add-sub',
		inputAddSubDescrip: '.add-sub-descrip',
		inputAddSubValue: '.add-sub-value',
		inputAddSubButton: '.add-sub-button',
		incomesContainer: '.incomes-descrip_value',
		expensesContainer: '.expenses-descrip_value',
		totalBudgetLabel: '.budget-total',
		totalIncomesLabel: '.total-income-value',
		totalExpensesLabel: '.total-expenses-value',
		totalPercentLabel: '.total-expenses-percent',
		incomesExpensesContainer: '.incomes-expenses-panel',
		expensesPercentLabel: '.expense_percentage' ,
		dateLabel: '.budget-month'
	};

	var nodeListForEach = function(list, callback){
		for(var i = 0; i < list.length; i++){
		callback(list[i], i);
		}
	};

	return {
		gotInput: function(){

		return {
			addSub: document.querySelector(DOMstrings.inputAddSub).value,
			addSubDescrip: document.querySelector(DOMstrings.inputAddSubDescrip).value,
			addSubValue: parseFloat(document.querySelector(DOMstrings.inputAddSubValue).value)	
			};
	
		},

		addNewList: function(obj, type){

			//Create HTML strings with placeholder text
			if (type === 'add') {
				var elem = DOMstrings.incomesContainer;
				var html = '<div class="income-descrip_value" id="add-%id%"><div class="income_descrip">%descrip%</div><div class="income_value_button"><div class="income_value">%value%</div><div class="value-delete"><button class="value_delete_button"><i class="fas fa-trash-alt"></i></button></div></div></div>';
			} else if(type === 'sub') {
				elem = DOMstrings.expensesContainer;
				html = '<div class="expense-descrip_value" id="sub-%id%"><div class="expense_descrip">%descrip%</div><div class="expense_value_button"><div class="expense_value">%value%</div><div class="expense_percentage">21%</div><div class="value-delete"><button class="value_delete_button"><i class="fas fa-trash-alt"></i></button></div></div></div>';
			}

			//Replace placeholder text with some actual data
			var newHtml = html.replace('%id%', obj.id);
			var newHtml = newHtml.replace('%descrip%', obj.descrip);
			var newHtml = newHtml.replace('%value%', obj.value);

			//Insert the HTML into DOM
			document.querySelector(elem).insertAdjacentHTML('beforeend', newHtml);
		},

		deleteList: function(selectedID){
			var el = document.getElementById(selectedID);
			el.parentNode.removeChild(el);
		},

		clearFields: function(){
			var fields = document.querySelectorAll(DOMstrings.inputAddSubDescrip + ',' + DOMstrings.inputAddSubValue);
			var fieldsArray = Array.prototype.slice.call(fields);

			fieldsArray.forEach( function(current, index, array) {
				current.value = "";
			});
			fields[0].focus();
		},

		displayBudget: function(obj){
			document.querySelector(DOMstrings.totalBudgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.totalIncomesLabel).textContent = obj.totalIncome;
			document.querySelector(DOMstrings.totalExpensesLabel).textContent = obj.totalExpense;
	
			if (obj.percent > 0) {
				document.querySelector(DOMstrings.totalPercentLabel).textContent = obj.percent + '%';
			} else {
				document.querySelector(DOMstrings.totalPercentLabel).textContent = '--';
			}
		},

		displayPercentages: function(percents){
			var fields = document.querySelectorAll(DOMstrings.expensesPercentLabel);

			nodeListForEach(fields, function(curr, index){
				if (percents[index] > 0) {
					curr.textContent = percents[index] + '%';
				} else{
					curr.textContent = '---';
				}
			});
		},

		displayMonth: function(){	
			var now = new Date();
			var year = now.getFullYear();

			var month = now.getMonth();

			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];
			document.querySelector(DOMstrings.dateLabel).textContent = months[month] + '-' + year; 
		},

		changedType: function(){
			var inputAreas = document.querySelectorAll(DOMstrings.inputAddSub + ',' +
				DOMstrings.inputAddSubDescrip + ',' + DOMstrings.inputAddSubValue);

			nodeListForEach(inputAreas, function(curr) {
				curr.classList.toggle('red-focus');
			});
			document.querySelector(DOMstrings.inputAddSubButton).classList.toggle('red');
		},

		gotDOMstrings: function(){
			return DOMstrings;
		}

	};

}) ();


/*CONTROLLER MODULE*/
var controller = (function(calcCtrl, displayCtrl) {
	
	var DOM = displayCtrl.gotDOMstrings();

	var updatePercent = function(){

		//1. calculate percentages in budgetController
		calcCtrl.calculatePercentages();

		//2. read or return the percentages from budget controller
		var percents = calcCtrl.getPercentages();

		//3. update the UI with new percentages
		displayCtrl.displayPercentages(percents);
	}

	var updateBudget = function(){

		//1. A METHOD TO CALCULATE THE BUDGET IN DATAcONTROLLER
		calcCtrl.calculateBudget();

		//2. METHOD TO RETURN THE BUDGET
		var calculatedBudget = calcCtrl.getBudget();		
			//console.log(calculatedBudget);

		//3. DISPLAY INCOMES/EXPENSES IN MAIN DISPLAY PANEL
		displayCtrl.displayBudget(calculatedBudget);
	}

	var budgetCalculator = function(){

		//1. GET THE DATA FROM INPUT FIELDS
		var inputUI = displayCtrl.gotInput();

		
		if (inputUI.addSubDescrip !== "" && !isNaN(inputUI.addSubValue) && inputUI.addSubValue > 0) {
			//2. SEND THE DATA TO DATAcONTROLLER
			var newItem = calcCtrl.addItem(inputUI.addSub, inputUI.addSubDescrip, inputUI.addSubValue);

			//3. DISPLAY THEM IN INCOMES/EXPENSES LIST
			displayCtrl.addNewList(newItem, inputUI.addSub);

			//4. CLEAR THE FIELDS
			displayCtrl.clearFields();

			//5. CALCULATE AND UPDATE BUDGET
			updateBudget();

			//6. CALCULATE AND UPDATE PERCENTAGES
			updatePercent();
	
		}			

	};

	var ctrlDeleteItem = function(event){
		var deleteID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (deleteID) {
			var splitID = deleteID.split("-");
			var type = splitID[0];
			var ID =  parseInt(splitID[1]);
		}

		//1. delete the item from DS
		calcCtrl.deleteEntry(type, ID);

		//2. delete the item from UI
		displayCtrl.deleteList(deleteID);

		//3. update the new budget
		updateBudget();

		//4. calculate and update percentages
		updatePercent();
		//console.log(splitID);
	};

	document.querySelector(DOM.inputAddSub).addEventListener('change', displayCtrl.changedType);

	document.querySelector(DOM.incomesExpensesContainer).addEventListener('click', ctrlDeleteItem);

	document.querySelector(DOM.inputAddSubButton).addEventListener('click', budgetCalculator);
	console.log('App is online.');

	displayCtrl.displayBudget({
		budget: 0,
		percent: -1,
		totalIncome: 0,
		totalExpense: 0
	});

	document.addEventListener('keypress', function(enterKey) {
			if (enterKey.keyCode === 13 || enterKey.which === 13) {
				budgetCalculator();
			}
	});

	displayCtrl.displayMonth();	

}) (dataController, uiController);

