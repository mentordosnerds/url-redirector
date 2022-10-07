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
        'youtube': 'https://www.youtube.com/channel/UCryfS2QsHdNT8RCp0-XNH_g',
        'twitter': 'https://twitter.com/mentordosnerds',
        'github': 'https://github.com/mentordosnerds',
        'linkedin': 'https://www.linkedin.com/company/mentordosnerds/',
        'beacons': 'https://beacons.page/coisa',
        'whatsapp': 'https://api.whatsapp.com/message/64RTLCYDNMMTK1',
        'blog': 'https://blog.mentor.dev.br/',
        'tiktok': 'https://www.tiktok.com/@mentordosnerds',
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
    return url.pathname.substring(1);
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
const dataLayer = window.dataLayer = window.dataLayer || [];
const redirect = () => { window.location.href = targetUrl; };
const timeout = 3000;

dataLayer.push({'time': new Date()});
dataLayer.push({
    'event': 'Pageview',
    'pagePath': targetUrl,
    'pageTitle': sourceUrl,
    'visitorType': 'customer',
    'eventCallback': redirect,
    'eventTimeout' : timeout
});

setTimeout(redirect, timeout + 100);
