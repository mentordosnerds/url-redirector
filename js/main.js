const getRequestId = (url) => url.pathname.substring(1)

const getRedirectDomainByUrl = (url) => url.hostname in redirects ? url.hostname : defaultDomain

const getTargetUrlByLocation = (url) => {
    const domain =  getRedirectDomainByUrl(url);
    const id = getRequestId(url);
    const target = id in aliases ? aliases[id] : id;

    return redirects[domain][target] || defaultUrl;
}

const redirect = () => {
    window.location.href = targetUrl
}

const gtag = (...args) => {
    const dataLayer = window.dataLayer = window.dataLayer || []
    dataLayer.push(args)
}

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
        'amazon': 'https://produtos.mentordosnerds.com.br/amazon',
        'transcendendo-ao-sucesso': 'https://chat.whatsapp.com/Dp5qqPmFkDC24ybaZ7oKRF',
    },
    'checkout.mentordosnerds.com.br': {
        'notion-gestao-despesas': 'https://checkout.mycheckout.com.br/checkout/6480ae283c15732276facf2b',
    },
    'produtos.mentordosnerds.com.br': {
        '': 'https://produtos.mentordosnerds.com.br/mercadoshops',
        'mercadoshops': 'https://fslabreu.mercadoshops.com.br/',
        'amazon': 'https://amzn.to/3vdKatL',
        'behringer': 'https://fslabreu.mercadoshops.com.br/MLB-3933938302-interface-de-audio-behringer-u-phoria-umc22-_JM',
        'notion-gestao-despesas': 'https://notion-gestao-de-despesas.webflow.io/',
        'livro-poder-da-autorresponsabilidade': 'https://amzn.to/3TyQPJu',
        'livro-foco-na-pratica': 'https://amzn.to/3tolNsU',
        'livro-pode-da-acao': 'https://amzn.to/3RwqhFP',
        'livro-poder-alta-performance': 'https://amzn.to/4845Ze4',
        'livro-poder-do-habito': 'https://amzn.to/3RRfU0Z',
        'livro-homem-rico-babilonia': 'https://amzn.to/471S86x',
        'livro-atitude-mental-positiva': 'https://amzn.to/3TDXNfY',
        'livro-roube-como-um-artista': 'https://amzn.to/4784xWT',
        'diario-roube-como-um-artista': 'https://amzn.to/470Tcb3',
        'kit-roube-como-um-artista': 'https://amzn.to/484oRcG',
        'livro-mostre-seu-trabalho': 'https://amzn.to/3RmJYji',
        'livro-siga-em-frente': 'https://amzn.to/47c42uB',
        'livro-5-liguagens-amor': 'https://amzn.to/3to6hxk',
        'livro-5-liguagens-criancas': 'https://amzn.to/3GRCobC',
        'livro-raiz-da-rejeicao': 'https://amzn.to/3GRCobC',
        'livro-armas-persuasao-2': 'https://amzn.to/475y4jR',
        'livro-gatilhos-mentais': 'https://amzn.to/3tq6zDO',
        'livro-como-fazer-amigos': 'https://amzn.to/3NwTu2c',
        'livro-como-convencer-90-seg': 'https://amzn.to/3ts9xYv',
        'livro-rapido-devagar': 'https://amzn.to/48pH3xq',
        'livro-o-jeito-disney': 'https://amzn.to/3Nz8RHu',
        'livro-antifragil': 'https://amzn.to/3NyRIOg',
        'livro-arte-da-guerra': 'https://amzn.to/48jKxRO',
        'livro-trabalhe-4h-semana': 'https://amzn.to/4847oBm',
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

const defaultDomain = 'mentordosnerds.com';
const defaultUrl = `${redirects[defaultDomain]['instagram']}`;

const sourceUrl = window.location;
const targetUrl = getTargetUrlByLocation(sourceUrl);

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
