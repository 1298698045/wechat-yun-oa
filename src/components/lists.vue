<template>
    <div>
        <div class="list-item" v-for="(item, index) in list" :key="index">
            <div class="item-name">
                <span>{{item.name}}</span>
            </div>
            <div v-if="item.children" class="children-item">
                <Lists :list="item.children"></Lists>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Lists",
  props: {
    list: Array
  }
};
</script>