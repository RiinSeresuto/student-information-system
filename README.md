# Student Information System

### Technologies used
- [Node](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)


## Prerequisite
- Node
- npm or pnpm
- MySQL
- Git

#### Installing Node and npm
To install Node and npm, go to [this page](https://nodejs.org/en/download/) to download the installer and install. Node and npm will be installed.

#### Installing pnpm (Optional)
Run the command below to install pnpm. Note that Node and npm must be installed first before installing pnpm.

```
npm install -g pnpm
```

Note: Check [here](https://pnpm.io/installation) for other installation methods

#### Installing MySQL
Install XAMPP from [here](https://www.apachefriends.org/download.html) or Laragon from [here](https://laragon.org/download/index.html) and add phpmyadmin

#### Installing Git
Download, install, and follow the installation instructions for Git from [here](https://git-scm.com/downloads)


## Getting the Source Code
On you chosen directory, clone this repository by running the following command:

```
git clone https://github.com/RiinSeresuto/student-information-system.git
```

## Creating database
1. Run XAMPP or Laragon and run phpmyadmin on you browser and create a new database.
2. Open your newly created database and import `studentInformationSystem.sql`

## Configuring the server
Open `./server/index.js` and edit lines 11 to 16 base on your configuration.

```js
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "yourDatabaseName"
})
```

`"localhost"`, `"root"`, and none is the default configuration for `host`, `user`, and `password`, respectively.

## Installing the dependences
#### Go to `./client` directory and run the command below.

if you are using npm
```
npm install
```

or if you have installed pnpm
```
pnpm install
```

#### Go to `./server` directory and run the command below.

if you are using npm
```
npm install
```

or if you have installed pnpm
```
pnpm install
```

## Running the Application
1. Run XAMPP or Laragon
2. Run the server
	- Go to `./server` directory and run `npm run serve` or `pnpm run serve` if you are using pnpm
3. Run the front-end side
	- Go to `./client` directory and run `npm run dev` or `pnpm run dev` if you are using pnpm
	- Open the address that will be printed from the console in your browser. Example: `http://127.0.0.1:5173/`

---

#### Login information
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | pass|
| Student | jamie@student.school.com | pass |
| Teacher | teach@email.com | pass |
| Teacher | madam@email.com | pass |



