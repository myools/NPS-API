var liExist = false;

function getParks(states, resultLimit){
  if (states.length != 0){
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${states}&limit=${resultLimit}&api_key=fg6IJp7H394nWU3MWxD2HVSyas22pK60kKMUew2H`)
  .then(response => response.json())
  .then(responseJson => logRenderParks(responseJson))
  }
  else {
    alert('No parks matching criteria, try again');
  }
}
function watchForm(){
  $('form').submit(event => {
  event.preventDefault();
  if(liExist === true){
  $('li').remove();
  liExist = false;
  }

  let states = $('#park-query').val();
  console.log(states);
  let resultLimit = $('#results-limit').val();
  console.log(resultLimit);

  if(isNaN(resultLimit) || resultLimit.length == 0){
    console.log('Not a number')
    resultLimit = 10;
  }
  
  getParks(states,resultLimit);
  })
}

function logRenderParks(responseJson){
  if(responseJson.total == 0){
  alert('No parks matching criteria, try again');
  }
  console.log(responseJson)
  console.log(responseJson.data.length)
  for(let i = 0; i < responseJson.data.length; i++){
  $('ol').append(`<li><b>Name:</b> ${responseJson.data[i].name}<br><b>Description:</b> ${responseJson.data[i].description}<br><b>URL:</b> <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>`);
  }
  liExist = true;
}

$(watchForm())
