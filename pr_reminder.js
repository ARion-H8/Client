const core = require("@actions/core");
const axios = require('axios');

(async () => {
  try {
  
    const mappedSlackUserIds = JSON.parse(core.getInput('pr-reviewers'))
    
    const reviewers = JSON.parse(core.getInput('pr-reviewers')).map(d => d.login)
    const slackUserIds = reviewers.map(name => mappedSlackUserIds[reviewers])
    const mentionText = slackUserIds.reduce((curr, acc) => {
      curr += `<@${acc}> `
      return curr
    }, '')
    
    const payload = {
      text: `${mentionText} test 1 ${reviewers.join(',')}`
    }

    await axios.post(
      `${core.getInput('slack-webhook-url')}`, 
      payload);
  } catch (error) {
    console.log(error)
    core.setFailed(error.message);
  }
})();