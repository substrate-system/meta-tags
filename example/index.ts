import { type FunctionComponent, render } from 'preact'
import { html } from 'htm/preact'
import { MetaImage } from '../src/index.js'

const imageSrc = MetaImage({
    cloudName: 'dhv2youtt',
    filename: 'cube_vufm7u.png',
    text: 'hello images'
})

const Example:FunctionComponent<unknown> = function () {
    return html`<div>
        <img src=${imageSrc} />
    </div>`
}

render(html`<${Example} />`, document.getElementById('root')!)
