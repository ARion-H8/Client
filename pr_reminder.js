const core = require("@actions/core");
const fetch = require("node-fetch");

(async () => {
  try {
    
    const payload = {
      text: `test 1 ${core.getInput('SLACK_WEBHOOK_URL')}`
    }

    const res = await fetch("https://hooks.slack.com/services/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", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Server error ${res.status}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();