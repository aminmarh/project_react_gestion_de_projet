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

3. Create a `.env` file in the root of the project. In this file, specify the path to the database file.

```
DB_PATH=/path/to/your/database/file.db
```

4. For example, if your database file is on the desktop, your .env file should look something like this (adjust the path according to your operating system and username):

```
DB_PATH=C:\Users\AminM\OneDrive\Bureau\BD_Projet.db
```

5. Install the project dependencies using npm.

```bash
npm install
```

## Usage

To start the application, run the following command:

```bash
npm run dev
```

This will launch the development server, and you can access the application in your web browser at http://localhost:3000.

## User Roles and Permissions

By default, when you create an account in the application, you are assigned the role of a collaborator. This role allows you to participate in projects and manage tasks assigned to you. However, if you wish to manage projects and have the permissions of a project manager, such as creating new projects and assigning tasks to others, you will need to change your role in the database.

### Changing User Role to Project Manager

1. Open your SQLite Database using the SQLite Browser.
2. Navigate to the users table.
3. Find your user entry in the table.
4. Change the id_role field of your user entry from 2 to 1.
5. Save the changes to the database.