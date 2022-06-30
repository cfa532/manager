<template>
<div class="file">
    <div v-for="(file, index) in fileList" :key="index">
        <a @click="loadFile">{{file.name}}</a>
    </div>
</div>
</template>

<script>
console.log("fileList vue")
export default {
    name: "FileList",
    data() {
        return {
            api: window.apiHandler,
            fileList: []
        }
    },
    methods:{
        loadFileList: function() {
            var api = window.apiHandler
            if (!api) {
                this.fileList = [{name:"test2 array"}]
                return
            }
            api = api._value
            api.client.MMCreate(api.sid,"","","file_list", 2, "", mid=>{
                console.log("Load MM id=", mid);
                api.client.MMOpen(api.sid, mid, "cur", mmsid=>{
                    console.log("Open MM mmsid=", mmsid);
                    // var sc = Data.now()
                    api.client.Zrange(mmsid, "file_list", 0, 100, sps=>{
                        console.log("Score pair lists", sps)
                        sps.forEach(element => {
                            api.client.Hget(mmsid, "file_list", element.member, fi=>{
                                console.log("file: ", fi)
                                this.fileList.push(fi)
                            }, err=>{
                                console.error("Hget error=", err)
                            })
                        });
                    }, err=>{
                        console.error("Zrange error=", err)
                    })
                }, err=>{
                    console.error("MMOpen error=", err)
                })
            }, err=>{
                console.error("MM Create error=", err)
            })
        },
        loadFile: function() {
            console.log("load file content")
        }
    },
    async mounted() {
        this.loadFileList()
    }
}
</script>