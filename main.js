const Cherp = require('cherp')
const cherp = new Cherp({githubOrg: process.env.GITHUB_ORG})

;(async () => {
  let membersWithout2fa = await cherp.membersMissing2fa()
  let orgRepos = await cherp.reposThatMembersBelongTo(membersWithout2fa)

  for (let repo in orgRepos) {
    orgRepos[repo].forEach(async (collaboratorToNotify) => {
      let issueMessage = {
        title: 'cant spell 2fa without u',
        body: `Hello @${collaboratorToNotify.login} :wave:.
It appears you do not have Multi-factor authentication enabled. Please enable 2fa on your github account.
Look [to this link to learn how  to do that.](https://github.blog/2013-09-03-two-factor-authentication/). Thank you!`
      }

      try {
        let assignedSuccess = await cherp.openAssignedIssue(repo = repo, assignee = collaboratorToNotify.login, issueMessage)
        console.log(`Success: assigned issue ${assignedSuccess.issueUrl} to ${assignedSuccess.login}`)
      } catch (err) {
        console.error('Error opening assigned issue;', err)
      }
    })
  }
})()
