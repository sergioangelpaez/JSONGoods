# 🚀 Dynamic Product Search & Filter App

## 📝 Project Description

This is an interactive web application built with **React** and styled with **Tailwind CSS** that allows users to explore a product catalog. The app fetches data from an external API using **Axios** and a custom instance for scalable data handling. It provides powerful search and filtering functionalities, with a robust state management solution leveraging **React Context** and **custom hooks** for a clean, modular architecture. A "Load More Products" button ensures a smooth user experience, allowing for the progressive loading of data without overwhelming the user or the application. This project showcases my skills in building modern, responsive user interfaces and managing complex application state effectively.

---

## ✨ Key Features

* **⚡️ Real-time Search**: Find products instantly by typing in the search bar. The search filters products by their title or description with optimized performance using a **debounce** function.
* **🗂️ Multi-Category Filtering**: Refine your search results by selecting one or more categories from a dynamically loaded list.
* **📦 Scalable State Management**: The app uses two separate contexts, `useProducts` and `useCart`, to handle product data and shopping cart state independently and efficiently.
* **➡️ "Load More" Functionality**: Instead of traditional pagination, users can click a button to progressively load more products, ensuring a fast initial render and efficient use of resources.
* **🌙 Dark Mode Toggle**: Personalize your viewing experience by switching between a light and a dark theme.
* **🔄 Enhanced User Feedback**: The app provides a smooth user experience with visual cues like a **skeleton loading state**, clear error messages, and a friendly message when no products are found.

---

## 🛠️ Technologies Used

* **Frontend Framework**: [React](https://reactjs.org/) (with Hooks)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **API Consumption**: [Axios](https://axios-http.com/) (with an API instance)
* **API Endpoint**: [dummyjson.com](https://dummyjson.com/)
* **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
* **Version Control**: Git & GitHub

---

## 🚀 How to Run Locally

Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```
    (Replace `your-username/your-repo-name` with your actual repository URL).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in your browser**:
    The application will be available at `http://localhost:5173` (or a similar port).

---

## 🖼️ Visual Demo

Coming soon!
