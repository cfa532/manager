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
      const sliceSize = 1024*1024*1
      r.onerror = e=> {
        console.error("Reading failed for ", this.file.name, e);
      }
      r.onprogress = e=> {
        console.log("Reader progress=", e.loaded);
      }

      r.onload = e=> {
        console.log("loadend", api);
        api.client.MFOpenTempFile(api.sid, fsid => {
          console.log("temp opened", fsid, end);
          // var readFileSlice = (fsid, start) => {
          //   // first slice
          //   var end = min(start+sliceSize, e.target.result.byteLength)
          //   console.log(end)
          //   api.client.MFSetData(fsid, r.result.slice(start, end), start, count=>{
          //     if (end===r.result.byteLength) {
          //       // last slice done. Convert to Mac file
          //       console.log("Temp file done, ", fsid, end)
          //     } else {
          //       api.client.MFSetData(fsid, start+sliceSize)
          //     }
          //   }, err=>{
          //     console.error("set temp file data error ", err)
          //   })
          // }
          // readFileSlice(fsid, 0);
        }, err=> {
          console.error("open temp file error ", err)
        });
      }
      // read uploaded file
      r.readAsArrayBuffer(this.file);
    } 
  }
}
</script>
