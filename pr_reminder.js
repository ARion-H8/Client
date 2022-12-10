const core = require("@actions/core");
const axios = require('axios');

(async () => {
  try {
    
    const payload = {
      text: `<@userID> test 1`
    }

    await axios.post(
      `${core.getInput('slack-webhook-url')}`, 
      payload);
  } catch (error) {
    core.setFailed(error.message);
  }
})();