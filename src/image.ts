/**
 * Use Cloudinary to create the `meta` tag image URL.
 *
 * @param opts `filename` should include the extension.
 */
export function MetaImage ({ cloudName, filename, text }:{
    cloudName:string;
    filename:string;
    text?:string;
}):string {
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`

    if (!text) {
        // Simple case: no text, just fit the image
        const imageTransformations = ['w_1200', 'h_627', 'c_fit', 'q_auto',
            'f_auto'].join(',')
        return `${baseUrl}${imageTransformations}/${filename}`
    }

    // Extract the public_id (filename without extension) for overlay reference
    const publicId = filename.replace(/\.[^/.]+$/, '')

    // Canvas dimensions: 50px top + 500px image + 250px bottom = 800px total
    const canvasHeight = 800
    const topPadding = 50
    const imageMaxHeight = 500

    // 50 + 500 + 100 = 650
    const textYPosition = topPadding + imageMaxHeight + 100

    // Step 1: Fit the cube image to 1200x500
    const fitImage = 'w_1200,h_500,c_fit,q_auto,f_auto'

    // Step 2: Create white canvas (1200x800) as underlay and position the
    // fitted image at y=50
    // Use underlay with same image colored white to create the
    // white background
    const createCanvas = `u_${publicId},e_colorize:100,co_white,w_1200,` +
        `h_${canvasHeight},c_fill/fl_layer_apply,g_north,y_-${topPadding}`

    // Step 3: Add text overlay positioned in the white space at y=650, centered
    const textOverlay = text ? `l_text:roboto_64:${encodeURIComponent(text)},` +
        `co_black/fl_layer_apply,g_north,y_${textYPosition}/` : ''

    const url = `${baseUrl}${fitImage}/${createCanvas}/` +
        `${textOverlay}${filename}`
    return url
}
