document.getElementById('fetchLinks').addEventListener('click', () => {
    chrome.tabs.query({}, (tabs) => {
      const youtubeLinks = tabs
        .map((tab) => tab.url)
        .filter((url) => url && url.includes('youtube.com/watch'));
  
      if (youtubeLinks.length > 0) {
        const outputContent = youtubeLinks.join('\n');
        const blob = new Blob([outputContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
  
        // Create a timestamp
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.-]/g, ''); // Remove characters not allowed in filenames
  
        // Construct the filename with the timestamp
        const filename = `ytLinks_${timestamp}.txt`;
  
        chrome.downloads.download({
          url: url,
          filename: filename,
          saveAs: true
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error('Download failed:', chrome.runtime.lastError);
          } else {
            console.log('Download successful, ID:', downloadId);
          }
        });
      } else {
        console.log('No YouTube tabs found.');
        alert('No YouTube tabs found.');
      }
    });
  });
  