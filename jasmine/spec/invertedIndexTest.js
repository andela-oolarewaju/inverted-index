"use strict";
describe("IndexFile", function() {

	describe("Read book data", function() {
		var booksContent = booksJson("books.json");

    it("should be defined", function () {
      expect(booksJson).toBeDefined();
    });

    it("should not be empty", function() {
      expect(booksContent).not.toBe([]);
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
});

describe("Populate Index", function() {
	var booksContent = booksJson("books.json");

	it("should ensure that index is created", function() {
        expect(getIndex).toBeDefined();   
	});

  it("should ensure that getIndexResult is created", function() {
    expect(getIndexResult).toBeDefined();
  })

  it("should ensure that index is correct", function() {
    expect(getIndexResult.hobbit).toEqual([1]);
  });

  it("should map index to its string keys", function() {
    expect(booksContent[0].title).toEqual("Alice in Wonderland");
    expect(booksContent[0].text).toEqual("Alice falls into a rabbit hole and enters a world full of imagination.");
    expect(booksContent[1].title).toEqual("The Lord of the Rings: The Fellowship of the Ring.");
    expect(booksContent[1].text).toEqual("An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.");
  });

  it("should not be overwritten by new JSON file", function () {
    expect(getIndexResult.a).toEqual([0,1]);
  });
});

describe("Search index", function() {    
  it("should be defined", function () {
    expect(Index.prototype.searchIndex).toBeDefined();
  });

  it("should ensure index returns the correct results when searched.", function() {
      expect(Index.prototype.searchIndex("Alice")).toEqual([0]);
      expect(Index.prototype.searchIndex("of")).toEqual([0, 1]);
      expect(Index.prototype.searchIndex("Fellowship")).toEqual([1]);
  });

  it("should ensure searchIndex can handle a varied number of search terms as arguments.", function() {
      var search = Index.prototype.searchIndex("Alice", "Wonderland", "Fellowship");
      expect(search).toEqual([0, 0 , 1]);
  });
});


















