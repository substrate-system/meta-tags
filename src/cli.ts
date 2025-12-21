#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { metas } from './index.js'
import { MetaImage } from './image.js'

yargs(hideBin(process.argv))
    .command(
        'image',
        'Generate a meta image URL using Cloudinary',
        (yargs) => {
            return yargs
                .option('cloud-name', {
                    alias: 'c',
                    type: 'string',
                    description: 'Cloudinary cloud name',
                    demandOption: true
                })
                .option('filename', {
                    alias: 'f',
                    type: 'string',
                    description: 'Image filename (including extension)',
                    demandOption: true
                })
                .option('text', {
                    alias: 't',
                    type: 'string',
                    description: 'Optional text overlay'
                })
        },
        (argv) => {
            const url = MetaImage({
                cloudName: argv['cloud-name'],
                filename: argv.filename,
                text: argv.text
            })
            console.log(url)
        }
    )
    .command(
        '$0',
        'Output all meta tags with placeholder values',
        () => {},
        () => {
            const tags = metas({
                title: 'placeholder',
                description: 'placeholder',
                image: 'placeholder',
                type: 'placeholder',
                name: 'placeholder',
                url: 'placeholder'
            })
            tags.forEach(tag => {
                if (tag) console.log(tag)
            })
        }
    )
    .help()
    .parse()
