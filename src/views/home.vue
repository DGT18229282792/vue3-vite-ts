<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex' 
import $http from '../http';

defineProps<{ msg: string }>();
const store = useStore();
onMounted(()=>{

})

const count = ref(0)
</script>

<template>
  <div>home页面</div>
  <div>{{ store.state.count }}</div>
    <el-button>Default</el-button>
    <div class="class1">
        456
        <div class="class2">1141</div>
    </div>
</template>

<style lang="scss">
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.class1{
    color: red;
    .class2{
        color: #42b983;
    }
}
</style>
