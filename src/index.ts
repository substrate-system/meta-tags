export * from './image.js'

export function metas ({
    title,
    description,
    image,
    type,
    name,
    url
}:{
    title:string;
    description:string;
    image?:string;
    type?:string;
    name?:string;
    url?:string;
}):string[] {
    return [
        `<meta property="og:title" content="${title}" />`,
        type ? `<meta property="og:type" content="${type}" />` : '',
        name ? `<meta name="og:site_name" content="${name}"></meta>` : '',
        url ? `<meta property="og:url" name="og:url" content="${url}" />` : '',
        image ? `<meta property="og:image" content="${image}" />` : '',
        description ? `<meta property="og:description" content="${description}" name="description" />` : '',
    ]
}
