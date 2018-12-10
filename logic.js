$(document).ready(function () {

    var database = firebase.database();

    function dataPusher() {

    };
    $('#submit').on('click', function () {
        console.log("test");
        var newTableRow = $('<tr>');
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var firstTime = $('#firstTime').val().trim();
        var frequency = $('#frequency').val().trim();
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        });
        // var minutestonexttrain = math TODO
    });
    console.log("test");
    database.on("value", dataPusher);
});

