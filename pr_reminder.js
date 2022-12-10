const core = require("@actions/core");
const axios = require('axios');

(async () => {
  try {
    
    const payload = {
      text: `<@userID> test 1 ${core.getInput('slack-webhook-url')}`
    }

    await axios.post(
      "https://hooks.slack.com/services/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", 
      payload);
  } catch (error) {
    core.setFailed(error.message);
  }
})();