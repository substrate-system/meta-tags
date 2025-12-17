import { test } from '@substrate-system/tapzero'
import { MetaImage, metas } from '../src/index.js'

test('MetaImage without text', t => {
    const url = MetaImage({
        cloudName: 'test-cloud',
        filename: 'my-image.jpg'
    })

    t.ok(url.includes('res.cloudinary.com/test-cloud/image/upload/'),
        'should include base Cloudinary URL')
    t.ok(url.includes('w_1200,h_627,c_fit,q_auto,f_auto'),
        'should include image fit transformations')
    t.ok(url.endsWith('/my-image.jpg'),
        'should end with filename')
    t.ok(!url.includes('l_text:'),
        'should not include text overlay')
})

test('MetaImage with text', t => {
    const url = MetaImage({
        cloudName: 'test-cloud',
        filename: 'cube.png',
        text: 'Hello World'
    })

    t.ok(url.includes('res.cloudinary.com/test-cloud/image/upload/'),
        'should include base Cloudinary URL')
    t.ok(url.includes('w_1200,h_500,c_fit,q_auto,f_auto'),
        'should include image fit transformations for 500px height')
    t.ok(url.includes('u_cube,e_colorize:100,co_white,w_1200,h_800,c_fill'),
        'should create white canvas with correct dimensions')
    t.ok(url.includes('fl_layer_apply,g_north,y_-50'),
        'should position image with top padding')
    t.ok(url.includes('l_text:roboto_64:Hello%20World'),
        'should include URL-encoded text overlay')
    t.ok(url.includes('fl_layer_apply,g_north,y_650'),
        'should position text at correct y position')
    t.ok(url.endsWith('cube.png'),
        'should end with filename')
})

test('MetaImage with special characters in text', t => {
    const url = MetaImage({
        cloudName: 'my-cloud',
        filename: 'image.jpg',
        text: 'Hello & Welcome!'
    })

    t.ok(url.includes('l_text:roboto_64:Hello%20%26%20Welcome!'),
        'should URL-encode special characters in text')
})

test('MetaImage extracts public_id correctly', t => {
    const url = MetaImage({
        cloudName: 'test',
        filename: 'folder/my-image.jpg',
        text: 'Test'
    })

    t.ok(url.includes('u_folder/my-image,'),
        'should extract public_id by removing extension')
})

test('MetaImage with different file extensions', t => {
    const extensions = ['jpg', 'png', 'webp', 'gif']

    extensions.forEach(ext => {
        const url = MetaImage({
            cloudName: 'test',
            filename: `image.${ext}`,
            text: 'Test'
        })

        t.ok(url.endsWith(`image.${ext}`),
            `should preserve .${ext} extension`)
        t.ok(url.includes('u_image,'),
            `should extract public_id correctly for .${ext}`)
    })
})

test('metas function', t => {
    const tags = metas({
        title: 'My Page',
        description: 'A test page',
        image: 'https://example.com/image.jpg',
        type: 'website',
        name: 'My Site',
        url: 'https://example.com/page'
    })

    t.equal(tags.length, 6, 'should return 6 meta tags')
    t.ok(tags[0].includes('<meta property="og:title" content="My Page"'),
        'should include title tag')
    t.ok(tags[1].includes('<meta property="og:type" content="website"'),
        'should include type tag')
    t.ok(tags[2].includes('<meta name="og:site_name" content="My Site"'),
        'should include site name tag')
    const tag = '<meta property="og:url" name="og:url" content="https://example.com/page"'
    t.ok(tags[3].includes(tag), 'should include URL tag')
    const ogImage = '<meta property="og:image" content="https://example.com/image.jpg"'
    t.ok(tags[4].includes(ogImage), 'should include image tag')
    const description = '<meta property="og:description" content="A test page"'
    t.ok(tags[5].includes(description), 'should include description tag')
})

test('metas function with minimal options', t => {
    const tags = metas({
        title: 'My Page',
        description: 'A test page'
    })

    t.equal(tags.filter(tag => tag !== '').length, 2,
        'should return only non-empty tags')
    t.ok(tags[0].includes('og:title'),
        'should include title tag')
    t.ok(tags[5].includes('og:description'),
        'should include description tag')
})

test('all done', () => {
    // @ts-expect-error tests env
    if (typeof window !== 'undefined') window.testsFinished = true
})
