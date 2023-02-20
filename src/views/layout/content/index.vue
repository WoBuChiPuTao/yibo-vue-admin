<template>
  <router-view>
    <template #default="{ Component, route }">
      <Transition name="fade-slide" mode="out-in" appear>
        <KeepAlive>
          <component :is="Component" :key="route.fullPath"></component>
        </KeepAlive>
      </Transition>
    </template>
  </router-view>
</template>

<script setup lang="ts"></script>
