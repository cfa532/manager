<template>
<div class="file">
    <div v-for="(file, index) in fileList" :key="index">
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            fileList: ""
        }
    }
}
</script>