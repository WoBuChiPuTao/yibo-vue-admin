<template>
  <div class="loader">
    <div class="outer"></div>
    <div class="middle"></div>
  </div>
</template>

<style>
.loader {
  position: relative;
}

.outer,
.middle {
  border: 0.1em solid transparent;
  border-top-color: #3c80ff;
  border-right-color: #3c80ff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
}

.outer {
  width:1.2em;
  height: 1.2em;
  margin-left: -0.6em;
  margin-top: -0.6em;
  animation: spin 2s linear infinite;
}

.middle {
  width: 0.5em;
  height: 0.5em;
  margin-left: -0.25em;
  margin-top: -0.25em;
  animation: spin 1.75s linear reverse infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
