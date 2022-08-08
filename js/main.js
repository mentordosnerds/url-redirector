const domains = {
    'default': 'mentordosnerds.com',
    'aliases': {
        'mentor.dev.br': 'mentordosnerds.com',
    }
};

const redirects = {
    'mentordosnerds.com': {
        'instagram': 'https://instagram.com/mentordosnerds/',
        'facebook': 'https://www.facebook.com/mentordosnerds/',
        'youtube': 'https://www.youtube.com/channel/UCSG16tbqdkSWEJUvB3CCeYA',
        'twitter': 'https://twitter.com/mentordosnerds',
        'github': 'https://github.com/mentordosnerds',
        'linkedin': 'https://www.linkedin.com/company/mentordosnerds/',
        'beacons': 'https://beacons.page/coisa',
        'whatsapp': 'https://api.whatsapp.com/message/64RTLCYDNMMTK1',
        'blog': 'https://blog.mentor.dev.br/',
    },
    'felipeabreu.com.br': {
        'github': 'https://github.com/coisa',
        'beacons': 'https://beacons.page/coisa',
        'linkedin': 'https://www.linkedin.com/in/felipesla',
    },
};

const aliases = {
    'ig': 'instagram',
    'insta': 'instagram',
    'fb': 'facebook',
    'yt': 'youtube',
    'tw': 'twitter',
    'gh': 'github',
    'wp': 'whatsapp',
    'li': 'linkedin',
    'lkdi': 'linkedin',
    'links': 'beacons',
};

const defaultUrl = `${redirects[domains.default]['instagram']}`;

function getRequestId(url) {
    const candidates = [
        url.username,
        url.search.substring(1),
        url.pathname.substring(1),
    ].filter((value) => { return value.length > 0; });

    return candidates[0];
}

function getRedirectUrl(sourceUrl) {
    const url = new URL(sourceUrl);
    const id = getRequestId(url);
    const domain = url.hostname;
    const urls = redirects[domain] || redirects[domains.default];
    const target = id in aliases ? aliases[id] : id;

    return urls[target] || defaultUrl;
}

const sourceUrl = window.location.href;
const targetUrl = getRedirectUrl(sourceUrl);
const redirect = () => { window.location.href = targetUrl; };
const analytics = new URL(document.scripts[0].src);

document.title = `${document.location} => ${targetUrl}`;
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());

gtag('config', analytics.search.id, {
    'transport_type': 'beacon',
    'non_interaction': true,
});

gtag('event', 'redirect', {
    'targetUrl': targetUrl,
    'event_callback': redirect,
});

window.onload = () => {
    setTimeout(redirect, 5000);
};
