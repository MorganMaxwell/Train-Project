$(document).ready(function () {
    // declaring a shortcut for this call
    var database = firebase.database();
    // on click event to grab userInput and push it to the database
    $('#submit').on('click', function () {
        // userInputs
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var firstTime = $('#firstTime').val().trim();
        var frequency = $('#frequency').val().trim();
        // push to firebase using object notation
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        });
    });
    // wait for new data to be put in the database
    database.ref().on("child_added", function (childSnapshot) {
        // making the next row of data
        var newTableRow = $('<tr>');
        // these are to gather the data from the database;
        var trainNameData = childSnapshot.val().trainName;
        var destinationData = childSnapshot.val().destination;
        var frequencyData = childSnapshot.val().frequency;
        var firstTimeData = childSnapshot.val().firstTime;
        // this is going to get complicated with this math
        // I did this, but I couldn't have gotten here without the class repo work and I'm 
        // worried about that
        // var firstTimeData = "03:30";

        var minutesAwayData;
        var nextArrivalData;
        var firstTimeMoment = moment(firstTimeData, "HH:mm");

        var compare = moment().diff(firstTimeMoment, "minutes");
        console.log(compare);

        var remainder = compare % frequencyData;
        console.log(remainder);

        var minutesAwayData = frequencyData - remainder;
        console.log(minutesAwayData);

        var nextArrivalData = moment().add(minutesAwayData, "minutes");
        console.log(moment(nextArrivalData).format("HH:mm"));


        // this is to put the database data in a <td> element
        var trainName = $('<td>').text(trainNameData);
        var destination = $('<td>').text(destinationData);
        var frequency = $('<td>').text(frequencyData);
        var nextArrival = $('<td>').text(moment(nextArrivalData).format("HH:mm"));
        var minutesAway = $('<td>').text(minutesAwayData);
        // this is to put all of that data into the table row
        newTableRow.append(trainName);
        newTableRow.append(destination);
        newTableRow.append(frequency);
        newTableRow.append(nextArrival);
        newTableRow.append(minutesAway);
        // finally, push the row to the page
        $('#tableData').append(newTableRow);
    });
});

