//using query selector on all variables\
//need day js to account for the date that will be displayed on the page
var currentDate = dayjs();
//need a dayjs variable to account for the hour of the day
var currentHour = dayjs().hour(); 
var dateTime = document.querySelector('#dateTime');
var currentDay = document.querySelector('#currentDay');
var timeBlocks = document.querySelectorAll('.time-block');
var saveButton = document.querySelectorAll('.saveBtn');
var clearButton = document.querySelector("#ClearBtn");

colorTimeBlock();


//first, we will need to add color to the time blocks based on the current time
function colorTimeBlock() 
{
  //make a for loop so each time block is checked
  for (let i = 0; i < timeBlocks.length; i++)
  {
    var timeBlock = $(timeBlocks[i]);
    var timeBlocksID = $(timeBlocks[i]).attr('id');

    //we will need the string we will get from the id attr into an integer so we use parseint
    var hour = parseInt(timeBlocksID);

    //Now that we have a variable set to timeblocks, we can give it a refrence point (past,present,or future)
    if (hour < currentHour) {
      timeBlock.addClass('past');
    }
     else if (currentHour === hour)
    {
      timeBlock.addClass('present');
    } 
      else 
    {
      timeBlock.addClass('future');
    }
  }
    
}



//Using dayjs and jquery syntax we can format the date on the page 
$(currentDay).text(currentDate.format("MMMM D, YYYY"));

  //will use dom traversal here in order to target what the user wrote and place it in local storage
function handleSubmit()
{
  var Id = $(this).parent().attr('id');
  var description = $('#' + Id).children(".description");
  var descriptionValue = description.val();

  localStorage.setItem(Id, descriptionValue);

  colorTimeBlock();
  showStorage();

}
//use dom traversal once again
//Now we need the information from local storage to appear within the time blocks on the page
function showStorage() {
  //use the same for loop to be able to go through all timeblocks
  for (let i = 0; i < timeBlocks.length; i++)
  {
    var timeBlocksID = $(timeBlocks[i]).attr('id');
    var description = $(timeBlocks[i]).children('.description');
    var timeBlockdescription = localStorage.getItem(timeBlocksID);
    description.text(timeBlockdescription);
  }
}

//we need to make sure that the clear button clears the local storage
function handleClear() {
  for ( let i = 0; i < timeBlocks.length; i++){

    var timeBlocksID = $(timeBlocks[i]).attr('id');
    var clear = "";
    //these two ne ariables will allow us to clear local storage
    localStorage.setItem(timeBlocksID, clear);
  }
  //we will nee to call showStorage funtion when handleClear is called 
  showStorage();
}

colorTimeBlock();
showStorage();

//going back to the variables stated in the beginning, we need to add a listener to save button
//star with another for loop to run through all the buttons in each row
for (let i = 0; i < saveButton.length; i++){
  saveButton[i].addEventListener('click', handleSubmit);
}
//Add an event listener to the clear button on top of the page
clearButton.addEventListener("click", handleClear);

