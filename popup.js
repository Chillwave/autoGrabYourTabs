document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({}, (tabs) => {
      let siteCount = {};
  
      // Count tabs per site
      tabs.forEach(tab => {
        try {
          let url = new URL(tab.url);
          let hostname = url.hostname;
          siteCount[hostname] = siteCount[hostname] ? siteCount[hostname] + 1 : 1;
        } catch (e) {
          console.error('Invalid URL:', tab.url);
        }
      });
  
      // Create the UI
      const container = document.getElementById('optionsContainer');
      for (let site in siteCount) {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = site;
  
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(`${site} (${siteCount[site]})`));
        container.appendChild(label);
      }
    });
  
    document.getElementById('fetchLinks').addEventListener('click', () => {
      const selectedSites = Array.from(document.querySelectorAll('#optionsContainer input:checked'))
        .map(input => input.value);
  
      if (selectedSites.length === 0) {
        alert('No sites selected.');
        return;
      }
  
      chrome.tabs.query({}, (tabs) => {
        const selectedLinks = tabs
          .filter(tab => {
            try {
              const url = new URL(tab.url);
              return selectedSites.includes(url.hostname);
            } catch (e) {
              return false;
            }
          })
          .map(tab => tab.url);
  
        if (selectedLinks.length) {
          const outputContent = selectedLinks.join('\n');
          const blob = new Blob([outputContent], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
  
          const now = new Date();
          const timestamp = now.toISOString().replace(/[:.-]/g, '');
          const siteNames = selectedSites.join('_').replace(/[\W_]+/g, '_').substring(0, 50);  // Use valid characters, and trim length if necessary
  
          const filename = `links_${siteNames}_${timestamp}.txt`;
  
          chrome.downloads.download({
            url: url,
            filename: filename,
            saveAs: true
          });
        } else {
          alert('No matching links found.');
        }
      });
    });
  });
      