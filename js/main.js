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

function getRedirectUrl() {
    const url = new URL(window.location.href);
    const domain = url.hostname;
    const query = url.search.length > 0 ? url.search.substring(1/*, url.search.search('&')*/) : '';
    const id = query.length ? query : url.idname;
    const urls = redirects[domain] || redirects[domains.default];

    if (id in aliases) {
        return `${urls[aliases[id]]}`;
    }

    if (id in urls) {
        return `${urls[id]}`;
    }

    return defaultUrl;
}

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

const redirectTo = getRedirectUrl();
const analytics = new URL(document.scripts[0].src);

gtag('js', new Date());
gtag('config', analytics.search.id);
gtag('event', 'redirect', {
    'redirect_url': redirectTo,
    'event_callback': () => window.location.href = redirectTo,
});

window.onload = () => {
    setTimeout(() => {
        window.location.href = redirectTo;
    }, 3000);
}
