const Cherp = require('cherp')
const cherp = new Cherp({githubOrg: process.env.GITHUB_ORG})

// get the list of members in Org that do not have mfa
;(async () => {
  let membersWithout2fa = await cherp.membersMissing2fa()

  let aa = await cherp.reposThatMembersBelongTo(membersWithout2fa)
  console.log('GOT IT: ', aa)

  for (let repo in aa) {
    aa[repo].forEach(async (collaboratorToNotify) => {
      let issueMessage = {
        title: 'cant spell 2fa without u',
        body: `Hello @${collaboratorToNotify.login} :wave:.
It appears you do not have Multi-factor authentication enabled. Please enable 2fa on your github account. Go [to this link for details](https://github.blog/2013-09-03-two-factor-authentication/). Thank you!`
      }
      try {
        console.log(await cherp.openAssignedIssue(repo = repo, assignee = collaboratorToNotify.login, issueMessage))
      } catch (err) {
        console.error('Error opening assigned issue;', err)
      }
    })
  }
})()
