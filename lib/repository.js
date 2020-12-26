var config = require('../config.js')
const { Octokit } = require("@octokit/rest")
const octokit = new Octokit()

const template = config.get("package")
var package = octokit.repos
  .listReleases({
    owner: template.githubOwner,
    repo: template.githubRepository,
  })
  .then(data => {
    const releases = data.data
    var app = template
    var latestVersion = ""
    app.changelog = []
    releases.forEach(release => {
      var version = release.tag_name
      // trim v from tag name
      if (version.startsWith("v")) {
        version = version.substring(1)
      }
      if (!latestVersion) {
        latestVersion = version
      }
      app.changelog.push({
        "version": version,
        "changes": release.body
      })
    })
    app.version = latestVersion
    return Promise.resolve(app)
  })
  .catch(err => {
    return Promise.reject(err)
  })

module.exports = package
