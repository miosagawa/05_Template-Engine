// 他のjsファイルの指定
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// モジュールの設定
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// アプトプット先フォルダとファイル名の指定
const OUTPUT_DIR = path.resolve(__dirname, "output")
const output = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];


function app() {
  function createManager() {
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",

        // マネージャーの名前は？
        message: "What is manager's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "managerId",
        // マネージャーのIDは？
        message: "What is manager's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "managerEmail",
        // マネージャーのメールアドレスは？
        message: "What is manager's email?",
        validate: answer => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        // マネージャーのoffice numberは？
        message: "What is manager's office number?",
        validate: answer => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        // チームメンバーのどの職業を追加しますか？
        message: "Which Occupation of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "Nothing"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        // エンジニアの名前は？
        message: "What is engineer's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is engineer's id?",
        validate: answer => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            if (idArray.includes(answer)) {
            } else {
              return true;
            }
                        
          }
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        // エンジニアのアドレスは？
        message: "What is engineer's email?",
        validate: answer => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        // エンジニアのGitHubは？
        message: "What is engineer's GitHub name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        // インターンの名前は？
        message: "What is intern's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "internId",
        // インターンのIDは？
        message: "What is intern's id?",
        validate: answer => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
        }
      },
      {
        type: "input",
        name: "internEmail",
        // インターンのアドレスは？
        message: "What is intern's email?",
        validate: answer => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "internSchool",
        // インターンの学校は？
        message: "What is intern's school?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(output, render(teamMembers), "utf-8");
  }
  createManager();
}
app();
