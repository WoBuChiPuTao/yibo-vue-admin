<template>
  <div class="h-full p-4">
    <Card class="h-full">
      <template #header>
        <h1> webSocket </h1>
      </template>
      <div class="flex justify-between h-96">
        <div class="flex flex-col w-1/3">
          <div class="flex items-center">
            <span class="mr-4">连接状态</span>
            <ElTag :type="getIsOpen ? 'success' : 'danger'">{{ status }}</ElTag>
          </div>
          <ElDivider></ElDivider>
          <div class="flex justify-between">
            <div class="w-2/3">
              <ElInput v-model:model-value="server" class="mr-4" size="default" disabled>
                <template #prepend> 连接地址 </template>
              </ElInput>
            </div>
            <ElButton :type="getIsOpen ? 'danger' : 'primary'" @click="toggleConnect">
              {{ getIsOpen ? '关闭连接' : '开启连接' }}
            </ElButton>
          </div>
          <ElDivider></ElDivider>
          <el-input
            v-model="sendValue"
            :autosize="{ minRows: 2, maxRows: 6 }"
            type="textarea"
            placeholder="Please input"
          />
          <ElDivider></ElDivider>
          <ElButton type="primary" @click="sendInfomation" :disabled="sendValue.length === 0">
            发送
          </ElButton>
        </div>
        <div class="flex flex-col w-7/12">
          <h1>消息框</h1>
          <ElDivider></ElDivider>
          <div class="h-full overflow-y-auto bg-gray-100">
            <ul>
              <li v-for="item in getList" :key="item.time" class="mb-6 ml-4">
                <div class="text-xs">{{ formatTime(item.time) }}</div>

                item.res
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { VNode, computed, defineComponent, h, reactive, toRefs, watchEffect } from 'vue'
import Card from '@/components/card/Card.vue'
import { ElInput, ElButton, ElTag, ElDivider } from 'element-plus'
import { useWebSocket } from '@vueuse/core'
import { formatTime } from '@/utils/dateFormat'

const server = 'ws://101.35.249.181:3300/ws'
export default defineComponent({
  name: 'WebSocket',
  components: { Card, ElInput, ElButton, ElDivider, ElTag },
  setup() {
    const state = reactive({
      server,
      sendValue: '',
      recordList: [] as { time: number; res: VNode }[]
    })

    const { status, data, send, open, close } = useWebSocket(state.server, {
      heartbeat: {
        message: 'ping',
        interval: 1000,
        pongTimeout: 10000
      }
    })

    const getIsOpen = computed(() => status.value === 'OPEN')
    const getList = computed(() => {
      return [...state.recordList]
    })

    watchEffect(async () => {
      if (data.value) {
        try {
          const response = (await JSON.parse(data.value)) as { time: number; res: string }
          const arr = response.res.split(/\n/)
          const br = h('br')
          const arrRes: (string | VNode)[] = []
          arr.forEach((item, index) => {
            if (index === 0) return
            arrRes.push(br)
            arrRes.push(item)
          })
          const res = h('p', { class: 'px-4 py-1 bg-white rounded news-triangle' }, ...arrRes)
          state.recordList.push({ time: response.time, res })
        } catch (error) {
          console.log('error', error)
          state.recordList.push({
            res: data.value,
            time: new Date().getTime()
          })
        }
      }
    })

    function sendInfomation() {
      if (status.value === 'OPEN') {
        send(state.sendValue)
        state.sendValue = ''
      }
    }

    function toggleConnect() {
      if (status.value === 'OPEN') {
        close()
      } else {
        open()
      }
    }

    return {
      ...toRefs(state),
      status,
      getIsOpen,
      getList,
      toggleConnect,
      sendInfomation,
      formatTime
    }
  }
})
</script>

<style lang="less" scoped>
.news-triangle {
  display: inline-block;
  position: relative;
  &::before {
    content: '';
    width: 0px;
    height: 0px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #ffffff;
    position: absolute;
    top: 6px;
    left: -10px;
  }
}
</style>
