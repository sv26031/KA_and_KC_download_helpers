KissAnime and KissCartoon - Download Link Collector
======================

DESCRIPTION
======================

If you're a free user on Kissanime or KissCartoon and want to download multiple episodes at once, you would need to open each episode page individually to click the download links. This bookmarklet will facilitate that process by listing the download links together on the same page. From there, you can save them manually or use a download manager. I use DownThemAll!.

Note: An alternative use is to watch the episodes from the new page without ads or any extra content. Just be sure open them in a new tab.

USAGE
======================

```
javascript:(function(){var%20script=window.document.createElement("script");script.src="https://rawgit.com/sv26031/KissAnime-DLC/master/kissanime.js";document.body.appendChild(script);window.document.getElementsByTagName("head")[0].appendChild(script);})();
```
```
javascript:(function(){var%20script=window.document.createElement("script");script.src="https://rawgit.com/sv26031/KissAnime-DLC/master/kisscartoon.js";document.body.appendChild(script);window.document.getElementsByTagName("head")[0].appendChild(script);})();
```
1. Create a bookmarklet. Name it something you'll remember and paste the above javascript in the 'Location' field. I' named mine ka and kc for KissAnime and KissCartoon, and put them both inside the same folder called Downloader Scripts.

2. Make sure you're logged into the website you're downloading from. Make a free account if necessary.

3. Go to the main episode page of the show you want to download.

4. Click the correct bookmarklet.

5. In the first prompt, enter the first episode number you want to download.

6. In the second prompt, enter the last episode number you want to download.

7. Enter the preferred video quality in the last prompt (e.g. 1280x720). If not available, it will use the highest quality instead.

8. Wait. A new window/tab will open when the selected episode's download links have been collected.

9. Either right click each link on the page and choose 'Save Link As' or use an addon to download them all with one click. 
