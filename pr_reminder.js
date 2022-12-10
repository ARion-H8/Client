const core = require("@actions/core");
const axios = require('axios');

(async () => {
  try {
    console.log(core.getInput('pr-reviewers'))
    
    const payload = {
      text: `<@userID> test 1 ${JSON.stringify(core.getInput('pr-reviewers'))}`
    }

    await axios.post(
      `${core.getInput('slack-webhook-url')}`, 
      payload);
  } catch (error) {
    core.setFailed(error.message);
  }
})();