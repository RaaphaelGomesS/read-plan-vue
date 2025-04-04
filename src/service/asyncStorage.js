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
