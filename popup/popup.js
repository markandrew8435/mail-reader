document.getElementById('read-content').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    function extractEmails() {
      const emails = [];
      const links = document.querySelectorAll('a[href^="mailto:"]');
      links.forEach(link => {
        const email = link.getAttribute('href').replace('mailto:', '');
        emails.push(email);
      });

      const resultStr = emails.join(', ');
      console.log(resultStr);

      navigator.clipboard.writeText(resultStr).then(() => {
        console.log("Emails copied to clipboard!");
      }, () => {
        console.error("Failed to copy emails!");
      });

      (async () => {
        const response = await chrome.runtime.sendMessage({ info: resultStr });
        console.log(response);
      })();
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractEmails,
    }).then(() => console.log('Injected extractEmails function!'));
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
  var resp = request.info;
  if (resp) {
    document.getElementById("result").innerText = resp;
    sendResponse({ farewell: "thanks for sending! goodbye" });


    const copyButton = document.getElementById("copy-emails");

    copyButton.addEventListener('click', () => {
      // Get extracted emails from function call

      // Check if emails are available
      // Use clipboard API to copy emails
    navigator.clipboard.writeText(resp).then(() => {
      console.log("Emails copied to clipboard!");
    }, () => {
      console.error("Failed to copy emails!");
    });
    });

  }
});
