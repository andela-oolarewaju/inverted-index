//Olarewaju Oreoluwa. Checkpoint 1

//create index function that'll be called by other functions
var Index = function(){};
//function to read Json file
Index.prototype.booksJson = function(filePath) {
  var booksContent;
  $.ajax({
    'url': filePath,
    'dataType': "json",
    // script finishes running before next statement
    'async': false, 
    'success': function(data) {
      booksContent = data;
    }
  });
  return booksContent;
}

//method to create index
Index.prototype.createIndex = function(filePath){
  var result = {};
  var booksContent = this.booksJson(filePath);
  for(var a = 0; a < booksContent.length; a++){ 
    for(var b in booksContent[a]){
      //it returns it in an array
      var split = booksContent[a][b].split(' ');
      //return each word after every empty space
      for(var c = 0; c < split.length; c++){ 
        //remove every punctuation here
        if(split[c].slice(-1) === '.' || split[c].slice(-1) === ',' || split[c].slice(-1) === ':'){
          //notice all punctuations come as last character in the word they're attached to, so i removed
          split[c] = split[c].slice(0, -1);
        }
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
//gets the index from createIndex method
var getIndex = indexCopy.createIndex("books.json");

//method to search index
Index.prototype.searchIndex= function(terms){
  var searchResult = [];
  //go through index
  for (var i in getIndex) {
    //go through arguments
    for (var j in arguments){
      //if we find something in index that is passed as parameter
      if (i === arguments[j]) {
        for(var k in getIndex[i]){
          //then get the index and push to searchResult
          searchResult.push(getIndex[i][k]);
        }
      }
    }
  }
  return searchResult;
}