# Project React Gestion de Projet

This project was created by Amin Marheraoui, Yasser Ibouda, and Yanis Seghdau.

## Description

This is a React project that allows you to manage multiple projects by creating projects and tasks for each project. It functions similarly to tools like Jira or Trello, enabling you to organize and track progress efficiently.
## Prerequisites

Before you can run this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [SQLite Browser](https://sqlitebrowser.org/dl/)

## Installation

1. Clone this repository to your local machine using `git clone`.

```bash
git clone https://github.com/aminmarh/project_react_gestion_de_projet.git
```

2. Navigate to the project directory.

```bash
cd project_react_gestion_de_projet
```

3. Create a `.env` file in the root of the project. In this file, specify the path to the database file (which will be sent via Discord).

```
DB_PATH=/path/to/your/database/file.db
```

4. Install the project dependencies using npm.

```bash
npm install
```

## Usage

To start the application, run the following command:

```bash
npm run dev
```

This will launch the development server, and you can access the application in your web browser at http://localhost:3000.