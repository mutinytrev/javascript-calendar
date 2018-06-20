function Calendar() // The Calendar that shows up on the sidebar of the main page.
{
	var dayNum = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var daySuffix = ["st","nd","rd","th"];
	var suffix;
	var thisMonthDays;
	var lastMonthDays;
	var nextMonthDays;
	var daySlots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];
	var firstDaySlot;
	var lastDaySlot;
	var firstDay;
	var lastDay;
	var daysFromOne;
	var today;
	var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var thisMonth;
	var lastMonth;
	var date;
	var dd;
	var day;
	var mm;
	var yyyy;
	
	// First, I need to get today's date
	
	function getDate()
	{
		date = new Date();
		dd = date.getDate();
		day = date.getDay();
		mm = date.getMonth()+1;
		yyyy = date.getFullYear();
	}
	
	// Then, I need to associate today's date with the day of the week.
	// NOTE: Sunday = 0, Saturday = 6
	
	function getDayName()
	{
		for(var i = 0; i < 7; i++)
		{
			if(day === i)
			{
				today = dayName[i];
			}
		}
	}
	
	// Now, I need to assign the month name to the month .
	
	function getMonth()
	{
		for(var i = 0; i < 12; i++)
		{
			if(mm === (i + 1))
			{
				thisMonth = month[i];
			}
		}
	}
	
	// Next, I need to figure out how many days are in the month.
	// NOTE: Jan = 31, Feb = 28 or 29 (Special Function for Leap Year), Mar = 31, Apr = 30, May = 31, Jun = 30, Jul = 31, Aug = 31
    // Sep = 30, Oct = 31, Nov = 30, Dec = 31	
	
	function getDaysPerMonth()
	{
		for(var i = 1; i < 13; i++)
		{
			if(mm === i)
			{
				if(mm === 1 || mm === 3 || mm === 5 || mm === 7 || mm === 8 || mm === 10 || mm === 12)
				{
					thisMonthDays = 31;
				}
				else
					if(mm === 4 || mm === 6 || mm === 9 || mm === 11)
					{
						thisMonthDays = 30;
					}
					else
						if(mm == 2)
						{
							if((yyyy % 4) === 0)
							{
								thisMonthDays = 29;
							}
							else
								thisMonthDays = 28;
						}
			}
		}
	}
	
	// Now, we write the month and year to the head of our Calendar.
	
	function getHeader()
	{
		for(i = 1; i < 32; i++)
		{
			if(dd === i)
			{
				if(i === 1 || i === 21 || i == 31)
				{
					suffix = daySuffix[0];
				}
				else
					if(i === 2 || i === 22)
					{
						suffix = daySuffix[1];
					}
					else
						if(i === 3 || i === 23)
						{
							suffix = daySuffix[2];
						}
						else
							suffix = daySuffix[3];
			}
		}
		document.getElementById("date").innerHTML = today + ", " + thisMonth + " " + dd + suffix + ", " + yyyy;
	}
	
	function getModifiedHeader() // For previous month / next month functions
	{
		document.getElementById("date").innerHTML = thisMonth + " " + yyyy;
	}
	
	// Then, we need to assign each day of the month to a weekday.
	
	function assignDays()
	{
		// Start with figuring out which slot on the calendar the month starts on.
		// To do this, we start by figuring out which day of the week the month starts on.
		
		for(var i = daysFromOne + 1; i > 0; i--)
		{
			if(firstDay === 0)
			{
				firstDay = 6;
			}
			else
				firstDay = firstDay - 1;
		}
		
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		firstDaySlot = daySlots[firstDay];
		
		// Now, we need to figure out which days to gray out
		
		// if a slot number is less than firstDay's value, then it should be grayed out.
		
		for(var i = 0; i < (firstDaySlot + 1); i++)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + (i + 1)).innerHTML = "I";
		}		
		
		// Now, I draw the First Day
		
		var j = 0;
		document.getElementById("slot-"+ (firstDaySlot + 1)).innerHTML = dayNum[j];
		
		// Then, The rest of the Month
		
		for(var i = (firstDaySlot + 2); i < (thisMonthDays + 3); i++)
		{
			j++;
			document.getElementById("slot-" + i).innerHTML = dayNum[j];
			lastDay = i;
		}
		
		for(var i = 42; i > lastDay; i--)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + i).innerHTML = "I";
		}	
	}
	
	function nextMonthAssignDays() // For previous month / next month functions
	{
		// First I need to clear the css statements from before:
		for(var i = 1; i < 43; i++)
		{
			$("#slot-"+ i).css("background-color", "");
			$("#slot-"+ i).css("color", "");
			document.getElementById("slot-" + i).innerHTML = "";
		}
		for(var i = daysFromOne + 1; i > 0; i--)
		{
			if(firstDay === 0)
			{
				firstDay = 6;
			}
			else
				firstDay = firstDay - 1;
		}
		
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		firstDaySlot = daySlots[firstDay];
		if(firstDaySlot > 7)
		{
			firstDaySlot = daySlots[(firstDay-7)];
		}

		// Now, we need to figure out which days to gray out
		// if a slot number is less than firstDay's value, then it should be grayed out.
		
		for(var i = 0; i < firstDaySlot; i++)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + (i + 1)).innerHTML = "I";
		}		
		
		// Now, I draw the First Day
		
		var j = 0;
		document.getElementById("slot-"+ firstDaySlot).innerHTML = dayNum[j];
		
		// Then, The rest of the Month
		
		for(var i = (firstDaySlot + 1); i < (daySlots.length + 1); i++)
		{
			j++;
			document.getElementById("slot-" + i).innerHTML = dayNum[j];
			lastDay = thisMonthDays + (firstDaySlot -1);
		}
		
		for(var i = 42; i > lastDay; i--)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + i).innerHTML = "I";
		}	
	}
	
	function previousMonthAssignDays()
	{
		// First I need to clear the css statements from before:
		for(var i = 1; i < 43; i++)
		{
			$("#slot-"+ i).css("background-color", "");
			$("#slot-"+ i).css("color", "");
			document.getElementById("slot-" + i).innerHTML = "";
		}
		
		firstDay = lastDay - lastMonthDays;
		firstDay = firstDay - thisMonthDays;
		
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		while(firstDay < 7)
		{
			firstDay = firstDay + 7;
		}
		
		firstDaySlot = daySlots[firstDay];
		if(firstDaySlot < 0)
		{
			firstDaySlot = daySlots[(firstDay + 6)];
		}
		/*
		if(firstDay < 0)
		{
			firstDay = firstDay + 6;
		}
		alert(firstDay);
		*/
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		firstDaySlot = daySlots[firstDay];
		if(firstDaySlot > 7)
		{
			firstDaySlot = daySlots[(firstDay-7)];
		}
		
		// Now, we need to figure out which days to gray out
		// if a slot number is less than firstDay's value, then it should be grayed out.
		
		for(var i = 0; i < firstDaySlot; i++)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + (i + 1)).innerHTML = "I";
		}		
		
		// Now, I draw the First Day
		
		var j = 0;
		document.getElementById("slot-"+ firstDaySlot).innerHTML = dayNum[j];
		
		// Then, The rest of the Month
		
		for(var i = (firstDaySlot + 1); i < (daySlots.length + 1); i++)
		{
			j++;
			document.getElementById("slot-" + i).innerHTML = dayNum[j];
			lastDay = thisMonthDays + (firstDaySlot -1);
		}
		
		for(var i = 42; i > lastDay; i--)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + i).innerHTML = "I";
		}	
		
	}
	
	function getThisMonth()
	{
		getDate();
		firstDay = day;
		getDayName();
		getMonth();
		getDaysPerMonth();
		getHeader();
		daysFromOne = dd - 1;
		assignDays();
	}
	
	function getNextMonth()
	{
		// I need to increment the month + 1
		mm = mm + 1;
		if(mm > 12)
		{
			mm = mm - 12;
			yyyy++;
		}
		// getMonth should be unchanged
		getMonth();
		getDaysPerMonth();
		// I need to figure out what day slot to start the month on
		// This will start with figuring out which slot the current month ended on.
		// lastDay = the slot the current month ended on. The slot the month ended on - 27 = the slot the next month starts on.
		firstDay = lastDay - 27;
		getModifiedHeader();
		daysFromOne = 0;
		nextMonthAssignDays();
	}
	
	function getLastMonth()
	{
		// I need to increment the month + 1
		lastMonthDays = thisMonthDays;
		mm = mm - 1;
		if(mm < 1)
		{
			mm = mm + 12;
			yyyy--;
		}
		// getMonth should be unchanged
		getMonth();
		getDaysPerMonth();
		// I need to figure out what day slot to start the month on
		// This will start with figuring out which slot the current month ended on.
		// firstDay = the day the Month should start on. 
		getModifiedHeader();
		daysFromOne = 0;
		previousMonthAssignDays();
	}
	
	function eventListeners()
	{
		if(window.addEventListener)
		{
			document.getElementById("next-month").addEventListener("click", getNextMonth);
			document.getElementById("prev-month").addEventListener("click", getLastMonth);
		}
		else
			if(window.attachEvent)
			{
				document.getElementById("next-month").attachEvent("onclick", getNextMonth);
				document.getElementById("prev-month").attachEvent("onclick", getLastMonth);
			}
	}
	getThisMonth();
	eventListeners();
}

window.addEventListener("load", Calendar);