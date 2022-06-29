<template>
<div class="file">
  <form @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="fields">
      <input
        type="file"
        ref="file"
        @change="onSelect"
      />
    </div>
    <div class="fields">
      <button>Submit</button>
    </div>
    <div class="message">
      <h5>{{message}}</h5>
    </div>
  </form>
</div>
</template>

<script>
console.log("file uploader")
function ScorePair() {}

export default {
  name: "Uploader",
  components: {
  },
  data() {
    return {
      file: "",
      message: ""
    }
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0]
      this.file = file
      console.log(this.file)
    },
    async onSubmit() {
      const api = window.apiHandler._value;
      const r = new FileReader();
      const sliceSize = 1024*1024*1
      r.onerror = e=> {
        console.error("Reading failed for ", this.file.name, e);
      }
      function readFileSlice(fsid, start) {
        // first slice
        var end = Math.min(start+sliceSize, r.result.byteLength);
        api.client.MFSetData(fsid, r.result.slice(start, end), start, count=>{
          if (end===r.result.byteLength) {
            // last slice done. Convert to Mac file
            api.client.MFTemp2MacFile(fsid, "", macid=>{
              console.log("Temp file to MacID=", macid);
              // create mmid for this app
              api.client.MMCreate(api.sid,"","","test_file_list", 2, "", mid=> {
                console.log("Create MM id=", mid)
                document.getElementsByTagName("input")[0].value= "" // clear input value
                api.client.MMOpen(api.sid, mid, "cur", mmsid=>{
                  console.log("Open MM mmsid=", mmsid);
                  api.client.Zadd(mmsid, "file_list", {score:Date.now(), member:macid}, ret=>{
                    console.log("Zadd ret=", ret)
                    api.client.Hset(mmsid, "file_list_index", macid, fi, ret=>{
                      console.log("Hset ret=", ret);
                    }, err=>{
                      console.error("Hset error=", err)
                    })
                  }, err=>{
                    console.error("Zadd error=", err)
                  })
                }, err=>{
                  console.error("Open MM error=", err)
                })
              }, err=>{
                console.error("Create MMid error=", err)
              })
            }, err=>{
              console.error("Temp to Mac error ", err);
            });
          } else {
            readFileSlice(fsid, start+count)
          }
        }, err=>{
          console.error("set temp file data error ", err);
        })
      }

      r.onload = e=> {
        api.client.MFOpenTempFile(api.sid, fsid => {
          console.log("temp opened", api.sid, fsid);
          readFileSlice(fsid, 0);
        }, err=> {
          console.error("open temp file error ", err);
        });
      }
      var fi = new ScorePair
      fi.name = this.file.name
      fi.lastModified = this.file.lastModified
      fi.size = this.file.size
      fi.type = this.file.type
      console.log(fi)                  

      // read uploaded file
      r.readAsArrayBuffer(this.file);
    } 
  }
}
</script>
