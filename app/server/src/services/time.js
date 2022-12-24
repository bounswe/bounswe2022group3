
function getTimeDifference(startDate, endDate) {
    // Calculate the difference in milliseconds between the two dates
    var differenceInMilliseconds = endDate - startDate;
    
    // Convert the difference in milliseconds to seconds
    var differenceInSeconds = differenceInMilliseconds / 1000;
    
    // Calculate the difference in minutes
    var differenceInMinutes = differenceInSeconds / 60;
    
    // Calculate the difference in hours
    var differenceInHours = differenceInMinutes / 60;
    
    // Calculate the difference in days
    var differenceInDays = differenceInHours / 24;

    // Return the time difference as a string
    if(differenceInDays > 7){
        return Math.floor(differenceInDays) + " weeks ago";
    }else if(differenceInDays > 1){
      return Math.floor(differenceInDays) + " days ago";
    }else if(differenceInHours > 1){
      return Math.floor(differenceInHours) + " hours ago";
    }else if(differenceInMinutes > 1){
      return Math.floor(differenceInMinutes) + " minutes ago";
    }else if(differenceInSeconds > 1){
      return Math.floor(differenceInSeconds) + " seconds ago";
    }else{
      return "just now";
    }
}
module.exports = { getTimeDifference };