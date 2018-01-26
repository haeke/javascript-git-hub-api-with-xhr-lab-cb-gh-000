
function getRepositories() {
  //store the username that was submitted
  var username = document.getElementById("username").value;
  console.log(username);
  //create the XMLHttpRequest
  var req = new XMLHttpRequest();
  //add an event listener to showRepository when it loads
  req.addEventListener('load', showRepositories);
  //create a get request to the github url with the username entered
  // https://api.github.com/users/${username}/repo is the request we want to make using the open method from XMLHttpRequest
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  //send the request
  req.send();
}

function showRepositories(event, data) {
  //store repository data in JSON format
  var reposInfo = JSON.parse(this.responseText);
  const reposList = `<ul>${reposInfo.map(repo => '<li><strong>' + repo.name + '</strong> - ' + repo.description + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = reposList;
}

function getCommits(el) {
  var repo = el.dataset.repository;
  var user = el.dataset.username;
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayCommits);
  request.open("GET", "https://api.github.com/repos/${repo}/${user}/commits");
  request.send();
}

function displayCommits() {
  var response = JSON.parse(this.responseText);
  const commitList = `<ul>${commitList.map(commit => '<li>' + commit.name + '</li>').join('')} </ul`;
  document.getElementById('commits').innerHTML = commitList;
}