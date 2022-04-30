let students = {
  info: [
    {
      ID: "101",
      name: "John Doe",
      booksBorrowed: [],
    },
    {
      ID: "102",
      name: "Mary Doe",
      booksBorrowed: [],
    },
  ],
  getStudentInfo: function (ID) {
    const student = this.info.find((stude) => {
      return stude.ID == ID;
    });
    return student ? student : "Student not found";
  },
  getStudentWithISBN: function (ISBN) {
    return this.getStudentInfo(library.checkBook(ISBN).borrower);
  },
};

let library = {
  books: [
    {
      ISBN: "AB102",
      title: "test2",
      author: "test2",
      publisher: "test2",
      year: 2000,
      isBorrowed: false,
      borrower: null,
    },
    {
      ISBN: "AB103",
      title: "test3",
      author: "test3",
      publisher: "test3",
      year: 2000,
      isBorrowed: false,
      borrower: null,
    },
    {
      ISBN: "045658487-0",
      title: "Prizzi's Honor",
      author: "Willas",
      publisher: "Metz, Huels and Zieme",
      year: 1998,
      isborrowed: false,
      borrower: null,
    },
    {
      ISBN: "621496803-6",
      title: "Danube Exodus, The",
      author: "Guyon",
      publisher: "Metz and Sons",
      year: 2010,
      isborrowed: false,
      borrower: null,
    },
    {
      ISBN: "830647550-X",
      title: "War of the Worlds",
      author: "Janssen",
      publisher: "Schowalter-Yundt",
      year: 1999,
      isborrowed: false,
      borrower: null,
    },
    {
      ISBN: "265343597-7",
      title: "Victim",
      author: "Benedtti",
      publisher: "Abbott, Huels and Heidenreich",
      year: 2006,
      isborrowed: false,
      borrower: null,
    },
    {
      ISBN: "016116568-0",
      title: "Shadow Puppets",
      author: "Duprey",
      publisher: "Witting Inc",
      year: 1997,
      isborrowed: false,
      borrower: null,
    },
  ],
  checkBook: function (ISBN) {
    const bookFound = this.books.find((book) => {
      return book.ISBN == ISBN;
    });
    return bookFound ? bookFound : "book not found";
  },
  addBook: function (
    ISBN = null,
    title = null,
    author = null,
    publisher = null,
    year = "n.d.",
    isborrowed = false,
    borrower = null
  ) {
    let newBook = {
      ISBN: ISBN,
      title: title,
      author: author,
      publisher: publisher,
      year: year,
      isborrowed: isborrowed,
      borrower: borrower,
    };
    this.books.push(newBook);
  },
  updateBook: function (ISBN, key, newvalue) {
    const bookToUpdate = this.checkBook(ISBN);
    if (bookToUpdate !== "book not found") {
      return (bookToUpdate[key] = newvalue);
    } else {
      console.log("Book is non-existent, update is impossible.");
    }
  },
  borrowBook: function (ISBN, ID) {
    const bookToBorrow = this.checkBook(ISBN);
    const student = students.getStudentInfo(ID);
    if (student !== "Student not found") {
      if (bookToBorrow !== "book not found") {
        if (!bookToBorrow.isBorrowed) {
          if (student.booksBorrowed.length < 2) {
            bookToBorrow.isBorrowed = !bookToBorrow.isBorrowed;
            bookToBorrow.borrower = ID;
            student.booksBorrowed.push(bookToBorrow.title);
            console.log("success borrowing");
          } else {
            console.log("2 books already borrowed");
          }
        } else if (
          student.booksBorrowed.find((book) => book == bookToBorrow.title)
        ) {
          console.log("This student has borrowed the book already");
        } else {
          console.log("book is already borrowed");
        }
      } else {
        console.log(bookToBorrow);
      }
    } else {
      console.log(student);
    }
  },
  returnBook: function (ISBN, ID) {
    const bookToReturn = this.checkBook(ISBN);
    const student = students.getStudentInfo(ID);
    if (student !== "Student not found") {
      if (bookToReturn !== "book not found") {
        if (student.booksBorrowed.find((book) => book == bookToReturn.title)) {
          bookToReturn.isBorrowed = !bookToReturn.isBorrowed;
          student.booksBorrowed.filter((book) => book !== bookToReturn.title);
          console.log(`${bookToReturn.title} has sucessfully been returned`);
        } else {
          console.log("Student doesn't have this book");
        }
      } else {
        console.log(bookToReturn);
      }
    } else {
      console.log(student);
    }
  },
  deleteBook: function (ISBN) {
    const bookToDelete = this.checkBook(ISBN);
    if (bookToDelete !== "book not found") {
      if (!bookToDelete.isBorrowed) {
        this.books = this.books.filter((book) => book.ISBN != ISBN);
        console.log("success deleting book");
      } else {
        console.log("book is borrowed, return book first");
      }
    } else {
      console.log(bookToDelete);
    }
  },
  showAvailableBooks: function () {
    return this.books.filter((book) => !book.isBorrowed);
  },
  countBooks: function () {
    let availableBooks = this.books.filter((book) => book.isBorrowed).length;
    return `Available books: ${availableBooks} Unavailable books: ${
      this.books.length - availableBooks
    }`;
  },
  searchBooks: function (title) {
    return this.books.filter((book) => {
      let search = RegExp(title, "gi");
      return book.title.match(search);
    });
  },
};

library.addBook("AB101", "testTitle", "testAuthor", "testPublisher", "2000");
console.log(library.checkBook("AB101"));
library.borrowBook("265343597-7", "102");
library.borrowBook("016116568-0", "102");
library.borrowBook("016116568-0", "102");
library.returnBook("016116568-0", "102");
library.borrowBook("AB103", "102");
library.borrowBook("AB103", "102");
library.deleteBook("016116568-0");
library.deleteBook("830647550-X");
console.log(
  `Student Find with ISBN ${students.getStudentWithISBN("016116568-0")}`
);
console.log(`Count Books\n ${library.countBooks()}`);
console.log(library.showAvailableBooks());
console.log(library.searchBooks("victim"));
console.log(library.searchBooks("test"));
console.log(students.getStudentInfo("105"));
console.log(library.updateBook("AB103", "title", "book"));
console.log(library.checkBook("AB103"));
