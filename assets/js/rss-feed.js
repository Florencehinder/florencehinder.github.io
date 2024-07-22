document.addEventListener('DOMContentLoaded', function() {
    const feedUrl = 'https://florencehinder.substack.com/feed'; // Replace with your Substack RSS feed URL
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
    const container = document.getElementById('rss-feed-container');

    fetch(rss2jsonUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'ok') {
                throw new Error('Failed to load RSS feed');
            }
            const items = data.items;
            let html = '<ul>';
            items.forEach(item => {
                const title = item.title;
                const link = item.link;
                html += `<li><a href="${link}" target="_blank">${title}</a></li>`;
            });
            html += '</ul>';
            container.innerHTML = html;
        })
        .catch(err => {
            console.error('Error fetching RSS feed:', err);
            container.innerHTML = 'Failed to load RSS feed.';
        });
});
