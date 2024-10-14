// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'findEmails') {
    //   const emails = [];
    //   const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
    //   mailtoLinks.forEach(link => {
    //     const email = link.getAttribute('href').replace('mailto:', '');
    //     emails.push(email);
    //   });
      sendResponse( ["emails"] );
    }
  });
  