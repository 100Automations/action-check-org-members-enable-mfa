# action-org-collaborators-enable-mfa

check that collaborators on an organziations repos have mfa enabled.
This action fetchs the list of members in an organization that
do _not_ have 2fa enabled and creates an issue assigned to those members on any
repos that they are collaborators on.

# Usage

```yaml
- name: Check that org collaborators have 2fa enabled
  uses: 100Automations/action-check-org-members-enable-mfa@main  
  env:
    GITHUB_ORG: 'my-org'
    GITHUB_TOKEN: ${{ secrets.ORG_OWNER_TOKEN }}
```

# inputs

### `GITHUB_ORG`
the name of the github organzation.

### `GITHUB_TOKEN`
A token having owner status on the `GITHUB_ORG`. This action lists
members on an org using the `2fa_disabled` filter which [is only available to
org
owners](https://docs.github.com/en/rest/reference/orgs#list-organization-members).

:eyes::warning: Using the default `GITHUB_SECRET` provided to the action
probably will not work and will result in an error message like:

```bash
Error: membersMissing2fa; name: HttpError, status: 422, msg: Only owners can
use this filter.
```

That means you'll need to create the [`ORG_OWNER_TOKEN`
secret](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository) explicitly.

# license
GPL-v2.0
