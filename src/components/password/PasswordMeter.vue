<template>
  <div class="meter">
    <ElInput
      v-if="showInput"
      v-model="inputValue"
      type="password"
      v-bind="$attrs"
      :disabled="disabled"
      show-password
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </ElInput>
    <div class="meter-bar">
      <div class="meter-bar--fill" :data-grade="getPasswordGrade"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { computed, unref } from 'vue'
import { zxcvbn } from '@zxcvbn-ts/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  showInput: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const inputValue = computed<string | null | undefined>({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const getPasswordGrade = computed(() => {
  const inputVal = unref(inputValue)
  if (!inputVal || props.disabled) {
    return -1
  }
  const score = zxcvbn(inputVal).guessesLog10
  let grade = -1
  if (score < 4) {
    grade = 0
  } else if (score < 8) {
    grade = 1
  } else if (score < 12) {
    grade = 2
  } else if (score < 16) {
    grade = 3
  } else {
    grade = 4
  }
  return grade
})
</script>

<style lang="less" scoped>
.meter {
  position: relative;

  &-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    border-radius: 6px;
    background-color: var(--el-text-color-disabled);

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 10;
      width: 20%;
      height: inherit;
      border-width: 0 5px;
      border-style: solid;
      border-color: var(--el-bg-color);
      background-color: transparent;
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }
    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;
      border-radius: inherit;
      background-color: transparent;

      &[data-grade='0'] {
        width: 20%;
        background-color: var(--el-color-danger-dark-2);
      }

      &[data-grade='1'] {
        width: 40%;
        background-color: var(--el-color-danger);
      }

      &[data-grade='2'] {
        width: 60%;
        background-color: var(--el-color-warning);
      }

      &[data-grade='3'] {
        width: 80%;
        background-color: var(--el-color-warning-light-5);
      }

      &[data-grade='4'] {
        width: 100%;
        background-color: var(--el-color-success-light-3);
      }
    }
  }
}
</style>
