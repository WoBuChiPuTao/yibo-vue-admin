<template>
  <Card class="access-container">
    <template #header>
      <span class="text-xl">快捷访问</span>
    </template>
    <template #default>
      <div class="content">
        <template v-for="list in AccessItems" :key="list">
          <div class="gird-container">
            <template v-for="item in list" :key="item.title">
              <Card shadow="hover">
                <div class="flex flex-col items-center">
                  <EIcon
                    :icon="item.icon"
                    class="text-xl"
                    :post-icon="item.postIcon"
                    :style="{ color: item.color }"
                  ></EIcon>
                  <span class="mt-2 truncate">{{ item.title }}</span>
                </div>
              </Card>
            </template>
          </div>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import EIcon from '@/components/icons/EIcon.vue'
import { AccessItems } from './data'
</script>

<style lang="less" scoped>
.access-container {
  :deep(.el-card__header + .el-card__body) {
    padding: 0;
  }

  .content {
    margin: -1px 0 0 -1px;
  }
  .content::before {
    display: table;
    content: '';
  }
  .content::after {
    display: table;
    clear: both;
    content: '';
  }
}
.gird-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* stylelint-disable-next-line no-descending-specificity */
  :deep(.el-card) {
    border-radius: 0%;
    box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset,
      0 1px 0 0 #f0f0f0 inset;
  }

  .is-hover-shadow:hover {
    z-index: 1;
    box-shadow: var(--el-box-shadow-light);
  }
}
</style>
