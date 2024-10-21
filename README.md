# AGYT

AGYT allows users to select websites from open tabs to extract and save their links in a timestamped text file. This is particularly useful for gathering links from specific websites like YouTube, Wikipedia, GitHub, Reddit, and others.

## Features

- **Select Sites:** Dynamically displays a list of websites from open tabs for user selection.
- **Targeted Link Collection:** Saves links from selected websites only.
- **Detailed Filenames:** Downloads links in a text file named after the selected sites and timestamp (e.g., `links_youtube_com_github_com_20241016T123456.txt`)

## Installation (from source)

1. **Download** or **clone** this repository to your local machine.

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable **Developer mode** by toggling the switch in the top right corner.

4. Click **"Load unpacked"** and select the directory where you saved this project.
  
## Usage

1. Ensure you have tabs open for the websites from which you want to gather links.

2. Click on the AutoGrab Your Tabs icon in the Chrome toolbar.

3. In the popup window, you'll see checkboxes for each domain from your open tabs, along with the number of tabs open for each.

4. **Select the sites** you are interested in by checking the corresponding boxes.

5. Click the **"Exprot Links"** button.

6. The extension will download a text file containing the links from your selected sites, with the filename indicating site names and the current timestamp.
