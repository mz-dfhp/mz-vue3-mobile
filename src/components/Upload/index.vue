<script setup lang="ts">
import { showImagePreview, showToast } from 'vant'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { computed, ref, watch } from 'vue'
import addFileImg from '@/assets/images/common/add-file.png'
import removeFileImg from '@/assets/images/common/remove-file.png'

interface UploadFileProps {
  modelValue: string // 上传的文件 String
  isPreview?: boolean // 是否是预览 不显示上传
  emptyTitle?: string // 上传标题
  limit?: number // 上传最大图片上传数 默认为 9张
  fileSize?: number // 图片大小限制 （默认为 10M）
  accept?: 'image/*' | 'video/*' | 'image/*,video/*' | string // 图片类型
  height?: number // 组件高度
  width?: number // 组件宽度
  margin?: number // 间隔
  borderRadius?: number // 圆角
}
const props = withDefaults(defineProps<UploadFileProps>(), {
  modelValue: '',
  isPreview: false,
  emptyTitle: '上传',
  limit: 9,
  accept: 'image/*',
  fileSize: 12,
  height: 90,
  width: 90,
  margin: 8,
  borderRadius: 8,
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineOptions({
  name: 'UploadFile',
})

const bindStyle = computed(() => {
  const px2vw = (px: number) => `${(px / 375 * 100)}vw`
  return {
    '--width': px2vw(props.width),
    '--height': px2vw(props.height),
    '--borderRadius': px2vw(props.borderRadius),
    '--margin': px2vw(props.margin),
  }
})

const fileList = ref<UploaderFileListItem[]>([])

const imageType = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
const videoType = ['mp4', 'm2v', 'mkv', 'mov', '3gp']

function validFileType(url = '') {
  const fileSuffix = url.split('.').pop()?.toLocaleLowerCase() || ''
  if (imageType.includes(fileSuffix))
    return 'image'
  if (videoType.includes(fileSuffix))
    return 'video'
  else return ''
}

function asyncBeforeRead(files: File | File[]) {
  const list = Array.isArray(files) ? files : [files]
  const length = fileList.value.length
  const result: Promise<File>[] = (list.slice(0, props.limit - length)).map((file) => {
    return new Promise((resolve, reject) => {
      const { size, type } = file
      // 文件大小
      if ((size / 1024 / 1024) > props.fileSize) {
        showToast(`上传图片大小不能超过 ${props.fileSize}M！`)
        reject(new Error(`上传图片大小不能超过 ${props.fileSize}M！`))
      }
      // 文件类型
      if ((['false'].includes(type.toLocaleLowerCase()))) {
        showToast('上传文件不符合所需的格式！')
        reject(new Error('上传文件不符合所需的格式！'))
      }
      resolve(file)
    })
  })
  return Promise.all(result)
}

async function afterRead(files: UploaderFileListItem[]) {
  const cloneFileList = files.map(item => ({ ...item }))
  const list = cloneFileList.map((file, index) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        files[index].status = 'uploading'
        files[index].message = '上传中...'
        const formData = new FormData()

        formData.append('file', file.file!)
        formData.append('module', 'efficacy')
        formData.append('category', 'track')
        formData.append('async', 'false')

        // const { data: { absoluteUrl } } = await (await fetch('', {
        //   method: 'POST',
        //   body: formData,
        // })).json()

        const { data: { absoluteUrl } } = await Promise.resolve({
          data: { absoluteUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
        })
        files[index].status = 'done'
        files[index].message = '上传成功'
        files[index].url = absoluteUrl
        resolve({ absoluteUrl })
      }
      catch (error) {
        console.log(error)
        files[index].status = 'failed'
        files[index].message = '上传失败'
        reject(new Error('上传失败'))
      }
    })
  })
  try {
    await Promise.all(list)
  }
  catch (error) {
    emits('update:modelValue', '')
  }
  finally {
    const imgsStr = fileList.value.filter(item => !!item.url).map(item => item.url).join(',')
    emits('update:modelValue', imgsStr)
  }
}

function handleRemove(url: string) {
  const imgsStr = fileList.value.filter(item => item.url !== url).map(item => item.url).join(',')
  emits('update:modelValue', imgsStr)
}

function onViewImgs(url: string) {
  let initialViewIndex = -1
  const images = fileList.value.map((item, index) => {
    if (item.url === url)
      initialViewIndex = index
    return item.url!
  })
  showImagePreview({
    images,
    startPosition: initialViewIndex,
  })
}

watch(() => props.modelValue, (value) => {
  const list: any[] = (value ? value.split(',') : []).map(item => ({
    url: item,
    status: 'done',
    message: '上传成功',
  }))
  fileList.value = list
},
{
  immediate: true,
})
</script>

<template>
  <div>
    <van-uploader
      v-model="fileList"
      v-bind="$attrs"
      :multiple="props.limit !== 1"
      :max-count="props.limit"
      :accept="props.accept"
      :before-read="asyncBeforeRead"
      :after-read="afterRead as UploaderAfterRead"
      :deletable="false"
      :class="isPreview ? 'preview-class' : ''"
      :style="bindStyle"
    >
      <template #preview-cover="{ url, status }">
        <template v-if="status !== 'done'" />
        <template v-else>
          <template v-if="validFileType(url) === 'image'">
            <img :src="url" class="upload-image" @click.stop="onViewImgs(url)">
          </template>
          <template v-else-if="validFileType(url) === 'video'">
            <video controls class="upload-image">
              <source :src="url" type="video/mp4">
              <source :src="url" type="video/ogg">
              您的浏览器不支持Video标签。
            </video>
          </template>
          <template v-else>
            <div class="upload-image other-box">
              {{ url }}
            </div>
          </template>
        </template>
        <div class="delete-box" @click.stop="handleRemove(url)">
          <van-icon :name="removeFileImg" size="4.5vw" />
        </div>
      </template>
      <div class="upload-empty">
        <slot name="empty">
          <div class="empty-box">
            <van-icon :name="addFileImg" size="4vw" />
            <div class="empty-text">
              {{ emptyTitle }}
            </div>
          </div>
        </slot>
      </div>
    </van-uploader>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-uploader) {
    .van-uploader__preview {
        background-color: #F8F9FF;
        width: var(--width);
        height: var(--height);
        border-radius: var(--borderRadius);
        margin-right: var(--margin);
        margin-bottom: var(--margin);
        .van-uploader__file{
          background: none;
        }
    }

    .van-uploader__preview-image {
        width: var(--width);
        height: var(--height);
        border-radius: var(--borderRadius);
        overflow: visible;
    }

    .van-uploader__input-wrapper {
        background-color: #F8F9FF;
        width: var(--width);
        height: var(--height);
        border-radius: var(--borderRadius);
    }

    .upload-empty {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .empty-box {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 14px;
            color: #999;
            flex-direction: column;
            line-height: normal;

            .empty-text {
                margin-top: 9px;
            }
        }
    }

    .upload-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--borderRadius);
        overflow: hidden;
    }
    .other-box{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .delete-box {
        z-index: 1;
        position: absolute;
        top: -6px;
        right: -6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .van-uploader__mask {
        border-radius: var(--borderRadius);
    }

    .van-image__img,
    .van-uploader__file-name,
    .van-uploader__file-icon {
        display: none;
    }

    &.preview-class {
        .van-uploader__input-wrapper {
            display: none;
        }

        .delete-box {
            display: none;
        }
    }
}
</style>
