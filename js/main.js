const getRequestId = (url) => url.pathname.substring(1)

const getRedirectUrl = (sourceUrl) => {
    const url = new URL(sourceUrl);
    const id = getRequestId(url);
    const domain = url.hostname;
    const urls = redirects[domain] || redirects[domains.default];
    const target = id in aliases ? aliases[id] : id;

    return urls[target] || defaultUrl;
}

const redirect = () => {
    window.location.href = targetUrl
}

const gtag = (...args) => {
    const dataLayer = window.dataLayer = window.dataLayer || []
    dataLayer.push(args)
}

const domains = {
    'default': 'mentordosnerds.com',
    'aliases': {
        'mentor.dev.br': 'mentordosnerds.com',
    }
};

// @TODO pinterest
const redirects = {
    'mentordosnerds.com': {
        'instagram': 'https://instagram.com/mentordosnerds/',
        'facebook': 'https://www.facebook.com/mentordosnerds/',
        'youtube': 'https://www.youtube.com/@mentordosnerds',
        'twitter': 'https://twitter.com/mentordosnerds',
        'github': 'https://github.com/mentordosnerds',
        'linkedin': 'https://www.linkedin.com/company/mentordosnerds/',
        'beacons': 'https://beacons.page/mentordosnerds',
        'whatsapp': 'https://api.whatsapp.com/message/64RTLCYDNMMTK1',
        'blog': 'https://blog.mentor.dev.br/',
        'tiktok': 'https://www.tiktok.com/@mentordosnerds',
        'discord': 'https://discord.gg/W9hbp6j4',
        'spotify': 'https://open.spotify.com/user/12145113997?si=82e6e5fff43346ca',
        'telegram': 'https://t.me/felipeslabreu',
        'grupo-telegram': 'https://t.me/mentordosnerds',
        'amazon': 'https://amzn.to/3QUgetJ',
        'transcendendo-ao-sucesso': 'https://chat.whatsapp.com/Dp5qqPmFkDC24ybaZ7oKRF',
    },
    'produtos.mentordosnerds.com.br': {
        'livro-poder-da-autorresponsabilidade': 'https://amzn.to/3Sqe8AZ',
        'livro-foco-na-pratica': 'https://amzn.to/3CVsa7G',
        'livro-pode-da-acao': 'https://amzn.to/3DmvjOr',
        'livro-poder-alta-performance': 'https://amzn.to/3WPFK4F',
        'livro-poder-do-habito': 'https://amzn.to/3JvqCpY',
        'livro-homem-rico-babilonia': 'https://amzn.to/3RqakRd',
        'livro-atitude-mental-positiva': 'https://amzn.to/3wIT6Vx',
        'livro-roube-como-um-artista': 'https://amzn.to/3I8Fytj',
        'diario-roube-como-um-artista': 'https://amzn.to/3RwrgFP',
        'kit-roube-como-um-artista': 'https://amzn.to/3wXXz7e',
        'livro-mostre-seu-trabalho': 'https://amzn.to/3DKfWQy',
        'livro-siga-em-frente': 'https://amzn.to/3Ym0O3S',
        'livro-5-liguagens-amor': 'https://amzn.to/3HvbZQW',
        'livro-5-liguagens-criancas': 'https://amzn.to/3RCEfWE',
        'livro-raiz-da-rejeicao': 'https://amzn.to/3JHLJ8P',
        'livro-armas-persuasao-2': 'https://amzn.to/40xDNNm',
        'livro-gatilhos-mentais': 'https://amzn.to/3l1KoPE',
        'livro-como-fazer-amigos': 'https://amzn.to/3HVOW27',
        'livro-como-convencer-90-seg': 'https://amzn.to/3jzTBOW',
        'livro-rapido-devagar': 'https://amzn.to/3wX55ix',
        'livro-o-jeito-disney': 'https://amzn.to/3HZbKyX',
        'livro-antifragil': 'https://amzn.to/3HCzTKe',
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
    'bio': 'beacons',
};

const defaultUrl = `${redirects[domains.default]['instagram']}`;
const sourceUrl = window.location.href;
const targetUrl = getRedirectUrl(sourceUrl);

const timeout = 3000;

gtag('js', new Date())
gtag('event', 'redirect', {
    'time': new Date(),
    'visitorType': 'customer',
    'pagePath': targetUrl,
    'pageTitle': sourceUrl,
    'eventTimeout' : timeout,
    'eventCallback': redirect,
});

setTimeout(redirect, timeout + 100);
