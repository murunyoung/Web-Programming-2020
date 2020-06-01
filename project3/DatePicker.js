function DatePicker(id, callback) {
    this.render = function (datetime) {
        var ele = document.getElementById(id);
        ele.innerHTML = "";
        var table = document.createElement("table");
        ele.appendChild(table);

        var head = table.createTHead();
     

        var firstrow = head.insertRow(0);
        firstrow.setAttribute("class", "header");
        var back = firstrow.insertCell(0);
        back.setAttribute("class", "back");
        var first = firstrow.insertCell(1);
        var next = firstrow.insertCell(2);
        next.setAttribute("class", "next");
        var week = table.insertRow(1);
        week.setAttribute("class", "week");

        week.insertCell(0).innerHTML = "Su";
        week.insertCell(1).innerHTML = "Mo";
        week.insertCell(2).innerHTML = "Tu";
        week.insertCell(3).innerHTML = "We";
        week.insertCell(4).innerHTML = "Th";
        week.insertCell(5).innerHTML = "Fr";
        week.insertCell(6).innerHTML = "Sa";


        back.innerHTML = "<div id=" + id + "back" + "> &lt; </div>";
        next.innerHTML = "<div id=" + id + "next" + "> &gt; </div>";
        first.colSpan = "5"; 


        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthAndYear = "<center> " + months[datetime.getMonth()] + " " + datetime.getFullYear() + "</center>";
        first.innerHTML = monthAndYear;
    
        back = document.getElementById(id + "back");
        back.addEventListener("click", function () {
            if (datetime.getMonth() === 0) {
                datetime.setMonth(11);
                datetime.setFullYear(datetime.getFullYear() - 1);
            } else {
                datetime.setMonth(datetime.getMonth() - 1);
            }
            this.render(new Date(datetime));
        }.bind(this));

        next = document.getElementById(id + "next");
        next.addEventListener("click", function () {
            if (datetime.getMonth() === 11) {
                datetime.setMonth(0);
                datetime.setFullYear(datetime.getFullYear() + 1);
            } else {
                datetime.setMonth(datetime.getMonth() + 1);
            }
            this.render(new Date(datetime));
        }.bind(this));



        var date = new Date(datetime.valueOf());
        var firstDateOfThisMonth = new Date(date.setDate(1));
        var firstDateOfNextMonth = new Date(date.setMonth(date.getMonth() + 1));
        var tempDate = new Date(firstDateOfNextMonth);
        var lastDateOfThisMonth = new Date(tempDate.setDate(0));
        var daysThisMonth = (lastDateOfThisMonth.getDate() - firstDateOfThisMonth.getDate() + 1);

        var firstDimRow = false;
        var lastDimRow = false;
        var firstDayOfThisMonth = firstDateOfThisMonth.getDay();
        var daysLeft = daysThisMonth;

        if (firstDayOfThisMonth !== 0) {
            daysLeft = daysLeft - (7 - firstDayOfThisMonth);
            firstDimRow = true;
        }

        var lastDayOfThisMonth = lastDateOfThisMonth.getDay();
        if (lastDayOfThisMonth !== 6) {
            daysLeft = daysLeft - (lastDayOfThisMonth + 1);
            lastDimRow = true;
        }
        
     
        var NotDimWeeks = daysLeft / 7;
        var row = 1;

        var currDate;
        var currCell;

        var rows = [];
        if(firstDimRow) {
            row++;
            rows[row] = table.insertRow(row);
            rows[row].setAttribute("class", "usual");
            for (var i = firstDayOfThisMonth - 1; i >= 0; i--) {
                tempDate = new Date(firstDateOfThisMonth);
                currDate = new Date(tempDate.setDate(-i));
                currCell = rows[row].insertCell(firstDayOfThisMonth - 1 - i);
                currCell.innerHTML = currDate.getDate();
                currCell.setAttribute("class", "dim");
                
            }
            for (var i = firstDayOfThisMonth; i <= 6; i++) {
                tempDate = new Date(firstDateOfThisMonth);
                currDate = new Date(tempDate.setDate(i - firstDayOfThisMonth + 1));
                currCell = rows[row].insertCell(i);
                currCell.innerHTML = currDate.getDate();
                
                this.clickDate(currCell, currDate, id, callback);
            }
        }

        var offset = firstDimRow ? 1 : 0;
        for (var j = 0; j < NotDimWeeks; j++) {
            row++;
            rows[row] = table.insertRow(row);
            rows[row].setAttribute("class", "usual");
            for (var i = 0; i <= 6; i++) {
                tempDate = new Date(firstDateOfThisMonth);
                currDate = new Date(tempDate.setDate(i + 1 - firstDayOfThisMonth + (j + offset) * 7));
                currCell = rows[row].insertCell(i);
                currCell.innerHTML = currDate.getDate();
                this.clickDate(currCell, currDate, id, callback);
            }
        }

        if (lastDimRow) {
            row++;
            rows[row] = table.insertRow(row);
            rows[row].setAttribute("class", "usual");
            for (var i = 0; i <= lastDayOfThisMonth; i++) {
                tempDate = new Date(firstDateOfNextMonth);
                currDate = new Date(tempDate.setDate(-lastDayOfThisMonth + i));
                currCell = rows[row].insertCell(i);
                currCell.innerHTML = currDate.getDate();
                this.clickDate(currCell, currDate, id, callback);
            }
            
            for (var i = 1; i <= 6 - lastDayOfThisMonth; i++) {
                tempDate = new Date(firstDateOfNextMonth);
                currDate = new Date(tempDate.setDate(i));
                currCell = rows[row].insertCell(lastDayOfThisMonth + i);
                currCell.innerHTML = currDate.getDate();
                currCell.setAttribute("class", "dim");
            }
        }
    };
}

DatePicker.prototype.clickDate = function(currCell, currDate, id, CPick) {
    currCell.addEventListener("click", function() {
        CPick(id, {month: currDate.getMonth()+1, day: currDate.getDate(), year: currDate.getFullYear()});
    });
};
