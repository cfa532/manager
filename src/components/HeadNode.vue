<template>
    <div class="main_header">
        <p class="main_header_title">当前状态</p>
        <div class="main_header_hint2">
        本地节点&nbsp;<span class="theme_color">{{localid}}</span>&nbsp;&nbsp;&nbsp;
        当前浏览&nbsp;&nbsp;<span class="theme_color">{{nodeid}}</span>    
        </div>
    </div>
</template>
<script>
export default {
    name: "HeadNodeState",
    props: ['localid', "nodeid"],
}
</script>