// Listen in background for tab's URL change
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // read changeInfo data
      // send the new url, status, flag to contentscripts
      if (changeInfo) {
        console.log(changeInfo)
        chrome.tabs.sendMessage( tabId, {
            message: 'url_changed_complete',
            url: changeInfo.url,
            status: changeInfo.status
        })
      }
    }
  );
