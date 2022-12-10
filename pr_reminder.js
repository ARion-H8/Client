const core = require("@actions/core");
const axios = require('axios');

(async () => {
  try {
    
    const payload = {
      text: `<@userID> test 1 ${core.getInput('SLACK_WEBHOOK_URL')}`
    }

    await axios.post(
      "https://hooks.slack.com/services/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", 
      payload);
  } catch (error) {
    core.setFailed(error.message);
  }
})();