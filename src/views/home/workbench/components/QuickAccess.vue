<template>
  <Card class="access-container">
    <template #header>
      <span class="text-xl">{{ props.title }}</span>
    </template>
    <template #default>
      <div class="content">
        <template v-for="item in accessList" :key="item.name">
          <div class="w-full cursor-pointer card-grid md:w-1/3" @click="handleClick(item)">
            <div class="flex flex-col items-center justify-center">
              <EIcon
                :icon="item.icon"
                class="text-xl"
                :post-icon="item.postIcon"
                :style="{ color: item.color }"
              ></EIcon>
              <span class="mt-2 truncate">{{ item.title }}</span>
            </div>
          </div>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import EIcon from '@/components/icons/EIcon.vue'
import { PropType } from 'vue'
import { AccessItem } from './types'
const props = defineProps({
  accessList: {
    type: Array as PropType<AccessItem[]>,
    default: () => []
  },
  title: String
})

const emits = defineEmits(['clickItem'])

function handleClick(item: AccessItem) {
  emits('clickItem', item)
}
</script>

<style lang="less" scoped>
.access-container {
  :deep(.el-card__body) {
    padding: 0;
  }
}

.content {
  margin: -1px 0 0 -1px;
  overflow: hidden;

  &::before {
    display: table;
    content: '';
  }

  &::after {
    display: table;
    clear: both;
    content: '';
  }

  .card-grid {
    float: left;
    border: 0;
    padding: 1.5rem;
    border-radius: 0;
    box-shadow: 1px 0 0 0 var(--box-shadow-color) inset, 0 1px 0 0 var(--box-shadow-color) inset;
    transition: all 0.3s;

    &:hover {
      position: relative;
      z-index: 1;
      box-shadow: var(--box-hover-shadow);
    }
  }
}
</style>
