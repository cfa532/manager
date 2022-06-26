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
    },


    async onSubmit() {
      const api = window.apiHandler._value;
      const r = new FileReader();
      const sliceSize = 1024*512*1
      r.onerror = e=> {
        console.error("Reading failed for ", this.file.name, e);
      }
      r.onprogress = e=> {
        console.log("Reader progress=", e.loaded);
      }

      function readFileSlice(fsid, start) {
        // first slice
        var end = Math.min(start+sliceSize, r.result.byteLength);
        api.client.MFSetData(fsid, r.result.slice(start, end), start, count=>{
          if (end===r.result.byteLength) {
            // last slice done. Convert to Mac file
            api.client.MFTemp2MacFile(fsid, "", macid=>{
              console.log("Temp file to MacID=", macid);
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
          console.log("temp opened", fsid);
          readFileSlice(fsid, 0);
        }, err=> {
          console.error("open temp file error ", err);
        });
      }
      // read uploaded file
      r.readAsArrayBuffer(this.file);
    } 
  }
}
</script>
