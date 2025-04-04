export function saveBooks(books) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("selectedBooks", JSON.stringify(books));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function loadBooks() {
  return new Promise((resolve, reject) => {
    try {
      const data = localStorage.getItem("selectedBooks");
      resolve(data ? JSON.parse(data) : []);
    } catch (error) {
      reject(error);
    }
  });
}

export function saveFinishedBooks(books) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("finishedBooks", JSON.stringify(books));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function loadFinishedBooks() {
  return new Promise((resolve, reject) => {
    try {
      const data = localStorage.getItem("finishedBooks");
      const parsed = data ? JSON.parse(data) : [];
      resolve(parsed.filter(book => book && book.id));
    } catch (error) {
      reject(error);
    }
  });
}