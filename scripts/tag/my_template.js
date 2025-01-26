/**
 * Photo
 * {% pixiv pid author url }
 */

'use strict'

const photo_fn = args => {
    const [pid, author, url] = args
    let result = `<img src="${url}">`
    result += `<center><font color=grey><a href="https://www.pixiv.net/artworks/${pid}"> Artwork ${pid} by ${author} </a></font></center><br/>`
    return result
}

hexo.extend.tag.register('pixiv', photo_fn, {ends: false})
