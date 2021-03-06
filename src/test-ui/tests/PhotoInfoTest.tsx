import React from 'react'

import { Photo, PhotoDetail } from 'common/CommonTypes'
import { getMasterPath } from 'common/util/DataUtil'

import PhotoInfo from 'app/ui/info/PhotoInfo'

import { addSection, action, TestContext } from 'test-ui/core/UiTester'
import { testBigPhoto } from 'test-ui/util/MockData'


const baseUrl = 'dist'
const defaultTags = [ 'Holiday', 'Family', 'Cool stuff' ]

const defaultProps = {
    style: { width: '300px', height: '100%' },

    isActive: true,
    photo: { ...testBigPhoto, master: `${baseUrl}/${getMasterPath(testBigPhoto)}` },
    tags: defaultTags,
    closeInfo: action('closeInfo'),
    getFileSize(path: string): Promise<number> { return Promise.resolve(3380326) },
}

let sharedPhotoDetail: PhotoDetail = {
    versions: [],
    tags: [ defaultTags[0], defaultTags[2] ]
}

function createGridRowHeightProps(context: TestContext) {
    return {
        photoDetail: sharedPhotoDetail,
        setPhotoTags: (photo: Photo, tags: string[]) => {
            sharedPhotoDetail = {
                versions: sharedPhotoDetail.versions,
                tags
            }
            context.forceUpdate()
        }
    }
}


addSection('PhotoInfo')
    .add('normal', context => (
        <PhotoInfo
            {...defaultProps}
            {...createGridRowHeightProps(context)}
        />
    ))
    .add('with edited size', context => (
        <PhotoInfo
            {...defaultProps}
            {...createGridRowHeightProps(context)}
            photo={{ ...testBigPhoto, edited_width: 800, edited_height: 600 }}
        />
    ))
    .add('filename overflow', context => (
        <PhotoInfo
            {...defaultProps}
            {...createGridRowHeightProps(context)}
            photo={{ ...testBigPhoto, master_filename: 'RAW_FUJI_FINEPIX_X100.RAF' }}
        />
    ))
    .add('no tags', context => (
        <PhotoInfo
            {...defaultProps}
            {...createGridRowHeightProps(context)}
            photoDetail={{ versions: [], tags: [] }}
        />
    ))
    .add('loading tags', context => (
        <PhotoInfo
            {...defaultProps}
            {...createGridRowHeightProps(context)}
            photoDetail={null}
        />
    ))
    .add('no photo', context => (
        <PhotoInfo
            {...defaultProps}
            {...createGridRowHeightProps(context)}
            photo={null}
        />
    ))
    .add('not active', context => (
        <PhotoInfo
            {...defaultProps}
            {...createGridRowHeightProps(context)}
            isActive={false}
        />
    ))
