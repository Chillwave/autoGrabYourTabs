chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
      const youtubeLinks = tabs
        .map((tab) => tab.url)
        .filter((url) => url && url.includes('youtube.com/watch'));
  
      if (youtubeLinks.length > 0) {
        const outputContent = youtubeLinks.join('\n');
        const blob = new Blob([outputContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
  
        console.log('Downloading links:', youtubeLinks);
  
        chrome.downloads.download({
          url: url,
          filename: 'youtube_links.txt',
          saveAs: true
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error('Download failed:', chrome.runtime.lastError);
          } else {
            console.log('Download initiated, ID:', downloadId);
          }
        });
      } else {
        console.log('No YouTube tabs found.');
      }
    });
  });
  