
export function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "Septerber", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Fraday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

// -----------------
// FORMATS THE TIME
// -----------------

export function parseTime(timestamp, timezone) {

    if(isNaN(timestamp) || isNaN(timezone)){
        console.log(`Is not a number: timestamp [${timestamp}] timezone [${timezone}]`)
        return '';
    } 
    
    var adjTimestamp = timestamp * 1000 + timezone * 1000;

    var date = new Date(adjTimestamp);
    // Hours part from the timestamp
    var hours = date.getUTCHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getUTCMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getUTCSeconds();

    // Will display time in HH:MM format
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
}