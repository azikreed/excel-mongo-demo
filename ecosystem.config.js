module.exports = {
    apps: [{
      name: "excel-mongo-demo",
      script: "main.js"
    }],
    deploy: {
      // "production" is the environment name
      production: {
        // SSH key path, default to $HOME/.ssh
        key: "/path/to/some.pem",
        // SSH user
        user: "azikreed",
        // SSH host
        host: ["65.109.227.207"],
        // SSH options with no command-line flag, see 'man ssh'
        // can be either a single string or an array of strings
        ssh_options: "StrictHostKeyChecking=no",
        // GIT remote/branch
        ref: "origin/main",
        // GIT remote
        repo: "git@github.com:azikreed/excel-mongo-demo.git",
        // path in the server
        path: "/var/www/my-repository",
        // Pre-setup command or path to a script on your local machine
        'pre-setup': "apt-get install git ; ls -la",
        // Post-setup commands or path to a script on the host machine
        // eg: placing configurations in the shared dir etc
        'post-setup': "ls -la",
        // pre-deploy action
        'pre-deploy-local': "echo 'This is a local executed command'",
        // post-deploy action
        'post-deploy': "npm install",
      },
    }
  }
  