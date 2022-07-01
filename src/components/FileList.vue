<template>
<div class="file">
    <div v-for="(file, index) in fileList" :key="index">
        <a href="#" ref="file"  @click.prevent="loadFile(file)">{{file.name}}</a>
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
                api.mid=mid
                console.log("Load MM id=", mid);
                api.client.MMOpen(api.sid, mid, "cur", mmsid=>{
                    console.log("Open MM mmsid=", mmsid);
                    // var sc = Data.now()
                    api.client.Zrange(mmsid, "file_list", 0, 100, sps=>{
                        console.log("Score pair lists", sps)
                        sps.forEach(element => {
                            api.client.Hget(mmsid, "file_list", element.member, fi=>{
                                fi.macid = element.member
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
        saveBlobFile: function(url, fileName) {
            var a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = url
            a.download = fileName
            a.click()
            window.URL.revokeObjectURL(url)
        },
        loadFile: function(file) {
            console.log("load file content", file.macid, file.size)
            var api = window.apiHandler._value
            api.client.MFOpenMacFile(api.sid, api.mid, file.macid, fsid=>{
                console.log("Open file fsid=", fsid)
                api.client.MFGetData(fsid, 0, -1, buf=>{
                    // arraybuffer
                    const blob = new Blob([buf], { type: file.type });
                    // const blob = new Blob([buf], { type: 'application/octet-stream' });
                    console.log(buf.byteLength, blob)
                    // this.saveBlobFile(URL.createObjectURL(blob), file.name)
                    window.open(URL.createObjectURL(blob))
                }, err=>{
                    console.error("Get File data error=", err)
                })
            }, err=>{
                console.error("Open file error=", err)
            })
        }
    },
    async mounted() {
        this.loadFileList()
    }
}
</script>