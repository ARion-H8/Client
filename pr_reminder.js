const core = require("@actions/core");
const axios = require('axios');

(async () => {
  try {
  
    console.log(core.getInput('pr-reviewers'))
    
    const reviewers = JSON.parse(core.getInput('pr-reviewers')).map(d => d.login)
    
    const payload = {
      text: `<@userID> test 1 ${reviewers.join(',')}`
    }

    await axios.post(
      `${core.getInput('slack-webhook-url')}`, 
      payload);
  } catch (error) {
    console.log(error)
    core.setFailed(error.message);
  }
})();