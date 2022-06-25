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
      const api = window.apiHandler
      const r = new FileReader()
      const sliceSize = 1024*1024*10

      readFileSlice = (i) => {
        // first slice
        api.MFOpenTempFile(api.sid).then(fsid => {
          api.MFSetData(fsid, r.result, i)
        })
      }
      r.onerror = e => {
        console.error("Reading failed for ", this.file.name, e)
      }
      r.onprogress = e => {
        console.log("Reader progress=", e.loaded)
      }
      r.onload = (function(f) {
        return function(e) {
          // Here you can use `e.target.result` or `f.name`.
          var flen = e.target.result.byteLength
          console.log("loadend, len=", flen)
          readFileSlice(0)
        };
      })(this.file);
      r.readAsArrayBuffer(this.file)

    }
  }
}
</script>
