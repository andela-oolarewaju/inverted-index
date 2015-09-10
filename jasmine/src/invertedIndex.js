
//Olarewaju Oreoluwa. Checkpoint 1
//function to read Json file
function booksJson(filePath) {
  var booksContent;
  $.ajax({
    'url': filePath,
    'dataType': "json",
    //i did this so that script finishes running before next statement can run(get json)
    'async': false, 
    'success': function(data) {
      booksContent = data;
    }
  });
  return booksContent;
}

//create index function that'll be called by other functions
var Index = function(){};


Index.prototype.createIndex = function(filePath){
  var result = {};
  booksContent = booksJson(filePath);
  for(var a=0; a < booksContent.length; a++){ 
    for(var b in booksContent[a]){
    	//if I console log here, it prints it in basic text
    	//after spliting, it returns it in an array
      var split = booksContent[a][b].split(' ');
      //while iterating, returns each word after every empty space
      for(var c = 0; c < split.length; c++){ 
      	//i removed every punctuation here
        if(split[c].slice(-1) === '.' || split[c].slice(-1) === ',' || split[c].slice(-1) === ':'){
        	//notice all punctuations come as last character in the word they're attached to, so i removed
          split[c] = split[c].slice(0, -1);
        }
        //if where I sliced is also contained in result then set them to resultArr
        if(result.hasOwnProperty(split[c]) ) {
          var resultArr = result[split[c]];
          //a is incrementing by 1 each time 
          if(parseInt(a)) {
          	var pos = parseInt(a);
          	//if the indexOf pos is < 0, that means it wasn't found
          	if(resultArr.indexOf(pos) < 0){
          		resultArr.push(pos);
          		result[split[c]] = resultArr;
          	}            
          }
        }
        else {
          result[split[c]] = [parseInt(a)];
        }
      }
    }
  }
  return result;
};

//instance of Index
var indexCopy = new Index();
//call createIndex on instance of index
var getIndex = indexCopy.createIndex;
//gets the index
var getIndexResult = getIndex("books.json");

Index.prototype.searchIndex= function(terms){
  var searchResult = [];
  if (!terms == null) {
  	//arguments is also parameters, set it to 'terms'
  	arguments = terms;
  }
  //go through index
  for (var i in getIndexResult) {
  	//go through arguments
  	for (var j in arguments){
  		//if we find something in index that is passed as parameter
      if (i === arguments[j]) {
      	for(var k in getIndexResult[i]){
      		//then get the index and push to searchResult
      		searchResult.push(getIndexResult[i][k]);
      	}
      }
    }
  }
   
  return searchResult;
}





