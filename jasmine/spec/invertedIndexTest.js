"use strict";
describe("IndexFile", function() {
  var booksContent = indexCopy.booksJson("books.json");
  describe("Read book data", function() {
    
    it("should not be empty", function() {
      expect(booksContent).not.toBe([]);
      expect(booksContent.length).not.toBe(0);
    });

    it("should have property of string", function() {
      for(var a in booksContent){
        for (var b in booksContent[a]){
          // console.log(booksContent[a][b]);
          var propType = typeof booksContent[a][b];
          expect(propType).toBe("string");
        }
      }
    });
  });


  describe("Populate Index", function() {
    
    it("should ensure that index is created", function() {
      expect(getIndex).toEqual(jasmine.any(Object));   
      expect(getIndex.length).not.toBe(0);
    });

    it("should ensure that index is correct", function() {
      expect(getIndex.hobbit).toEqual([1]);
    });
    
    it("should map index to its string keys", function() {
      expect(booksContent[0].title).toEqual("Alice in Wonderland");
      expect(booksContent[0].text).toEqual("Alice falls into a rabbit hole and enters a world full of imagination.");
      expect(booksContent[1].title).toEqual("The Lord of the Rings: The Fellowship of the Ring.");
      expect(booksContent[1].text).toEqual("An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.");
    });
  });

  describe("Search index", function() {    
    it("should be defined", function () {
      expect(indexCopy.searchIndex).toBeDefined();
    });

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