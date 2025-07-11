/**
 * 1. Photo
 * {% pixiv pid author url %}
 * 
 * 2. bilibili
 * {% bilibili ... %}
 */

'use strict'

const photo_fn = args => {
    const [pid, author, url] = args
    const raw_url = url && url.startsWith('<') && url.endsWith('>') ? url.slice(1, -1) : url;
    let result = `<img src="${raw_url}">`
    result += `<center><font color=grey><a href="https://www.pixiv.net/artworks/${pid}"> Artwork ${pid} by ${author} </a></font></center><br/>`
    return result
}

const bilibili_fn = args => {
    let params = {};
    args.forEach(arg => {
        if (!arg.includes('=')) { // key only
            params[arg.trim()] = true;
        } else { // key-value pair
            const [key, value] = arg.split('=');
            params[key.trim()] = value.trim();
        }
    });

    let result = `<div style="position: relative; padding: 30% 45%;"><iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?isOutside=true`

    if (params.aid) result += `&aid=${params.aid}`
    if (params.bvid) result += `&bvid=${params.bvid}`
    if (params.cid) result += `&cid=${params.cid}`
    if (params.p) result += `&p=${params.p}`
    if (params.t) result += `&t=${params.t}`

    result += `&muted=${params.muted ? 1 : 0}`
    result += `&autoplay=${params.autoplay ? 1 : 0}`
    result += `&danmaku=${params.danmaku ? 1 : 0}`

    result += `&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe></div>`
    return result
}

hexo.extend.tag.register('pixiv', photo_fn, { ends: false })
hexo.extend.tag.register('bilibili', bilibili_fn, { ends: false })
