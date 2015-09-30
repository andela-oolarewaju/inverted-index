"use strict";
describe("IndexFile", function() {
  var indexCopy = new Index();

  describe("Read book data", function() {
    var booksContent = indexCopy.booksJson("books.json");
    it("should not be empty", function() {
      expect(booksContent).not.toBe([]);
      expect(booksContent.length).not.toBe(0);
    });

    it("should have property of string", function() {
      for(var a = 0; a < booksContent.length; a++){
        for (var b in booksContent[a]){
          var propType = typeof booksContent[a][b];
          expect(propType).toBe("string");
        }
      }
    });
  });


  describe("Populate Index", function() {
    var getIndex = Index.prototype.createIndex("books.json");

    it("should ensure that index is created", function() {
      expect(getIndex).toEqual(jasmine.any(Object));   
      expect(getIndex.length).not.toBe(0);
    });
    
    it("should map index to its string keys", function() {
      expect(getIndex.elf).toEqual([1]);
      expect(getIndex.a).toEqual([0, 1]);
      expect(getIndex.in).toEqual([0]);
    });
  });

  describe("Search index", function() {    
    
    it("should ensure index returns the correct results when searched.", function() {
      expect(indexCopy.searchIndex("Alice")).toEqual([0]);
      expect(indexCopy.searchIndex("of")).toEqual([0, 1]);
      expect(indexCopy.searchIndex("Fellowship")).toEqual([1]);
    });

    it("should ensure searchIndex can handle a varied number of search terms as arguments.", function() {
      var search = indexCopy.searchIndex("Alice", "Wonderland", "Fellowship");
      expect(search).toEqual([0, 0 , 1]);
    });
  });
});