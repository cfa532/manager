<script>
import headnodestate from "./HeadNode.vue"
import Uploader from "./Uploader.vue"
import FileList from "./FileList.vue"

console.log("manager.js")  
var global
var c = localStorage.getItem("selected")
if (c == null){
    c = "system"
}

export default {
    name: "Manager",
    // el: '#leitherbody',
    components: {
        headnodestate, Uploader, FileList
        },
    data() {
        return {
            ips:"",
            isLogined:true,
            selected: c,
            sid:"",
            mynodedata:{
                nodeid:" ",
                hostpk:" ",
                ips:" ",
                gateway:"  ",
                peerid:" ",
                swarmlocal:""
            },
            swarmdata:{
                dhts:[],
                //peers:[],
                addrs:[],
                gateway:"  "
            },
            appsdata:{
                apps:[]
            },
            systemdata:{
                localnodeid:"",
                oldVars:"",
                systemvars:"",
                bChanged: false        
            }
        }
    },
    methods: {
        ontest: event =>{
            console.log("vue.ontest", event)
            global.ontest()
        },
        
        onswitch:pid =>{
            console.log("vue.onswitch", pid)
            global.onswitch(pid)
        },

        select: name=> {
            global.vue.selected = name
            localStorage.setItem("selected", name)
        },

        getAppUrl: (appid, ver)=>{
            console.log("getAppUrl")
            return global.vue.baseUrl + "entry?aid="+ appid +"&ver="+ver
        },
        printvars: e=>{
            global.vue.systemdata.bChanged = (e !== global.vue.systemdata.oldVars)
            console.log(e)
            console.log("systemvars=", global.vue.systemdata.systemvars)
            global.vue.systemdata.systemvars =  e
        },
        resetSystemdata:()=>{
            global.vue.systemdata.systemvars = global.vue.systemdata.oldVars
            global.vue.systemdata.bChanged = false
        },
        saveSystemdata:()=>{
            console.log("saveSystemdata ", global.vue.systemdata.systemvars)
            global.apiHandler.then(api=>{
                console.log("api=", api)
                api.client.Act(api.sid, "savesystemvars", global.vue.systemdata.systemvars).then(()=>{
                    console.log("save ok")
                    global.vue.systemdata.oldVars = global.vue.systemdata.systemvars
                },e=>{
                    console.log(e)
                })                
            })
           // global.vue.systemdata.systemvars = global.vue.systemdata.oldVars
        }
    },
    created() {
        global = window     // which is used inside auth.js as global
        global.vue = this.$data
        import("/src/auth.js").then((module) => {
            console.log("module", module);
        })
        // var tag = document.createElement("script");
        // tag.setAttribute("src", "/src/auth.js");
        // tag.setAttribute("type", 'text/javascript');
        // document.head.appendChild(tag); 
    },
}
</script>

<template>
    <div id="leitherframe" v-if="isLogined" style="" class="main_div">
        <div class="sub_second_menu_left">
            <div @click="select('myfiles')" :class="{sub_second_menu_left_second:true, sub_second_menu_left_second_select:selected==='myfiles'}">文件序列</div>
            <div @click="select('mynode')" :class="{sub_second_menu_left_second:true, sub_second_menu_left_second_select:selected==='mynode'}">我的节点</div>
            <div @click="select('swarm')" :class="{sub_second_menu_left_second:true, sub_second_menu_left_second_select:selected==='swarm'}">节点网络</div>
            <div @click="select('myapp')" :class="{sub_second_menu_left_second:true, sub_second_menu_left_second_select:selected==='myapp'}">我的应用</div>
            <div @click="select('message')" :class="{sub_second_menu_left_second:true, sub_second_menu_left_second_select:selected==='message'}">互动消息</div>
            <div @click="select('system')" :class="{sub_second_menu_left_second:true, sub_second_menu_left_second_select:selected==='system'}">系统设置</div>
        </div>
        <div id="mynode" v-if="selected==='mynode'" class="sub_second_iframe_left">
            <headnodestate :localid="systemdata.localnodeid" :nodeid="mynodedata.nodeid"></headnodestate>
            <!-- <div class="main_header">
                <p class="main_header_title">当前状态</p>
                <div class="main_header_hint2">
                本地节点&nbsp;<span class="theme_color">{{systemdata.localnodeid}}</span>&nbsp;&nbsp;&nbsp;当前浏览&nbsp;&nbsp;<span class="theme_color">{{mynodedata.nodeid}}</span>
                </div>
            </div> -->

            <form>
                <div class="main_content">

                    <div class="main_item">
                        <div class="main_item_name">节点ID</div>
                        <div class="main_item_content"><span class="theme_color">{{mynodedata.nodeid}}</span></div>
                    </div>
                    <div class="main_item">
                        <div class="main_item_name">节点公钥</div>
                        <div class="main_item_content"><span class="theme_color">{{mynodedata.hostpk}}</span></div>
                    </div>
                    <div class="main_item">
                        <div class="main_item_name">节点网关</div>
                        <div class="main_item_content">
                        <span class="theme_color">{{mynodedata.gateway}}</span>
                        </div>
                    </div>
                    <div class="main_item">
                        <div class="main_item_name">节点地址</div>
                        <div class="main_item_content">
                            <span class="theme_color"> {{mynodedata.ips}}  </span>
                        </div>
                    </div>
                    <div class="main_item">
                        <div class="main_item_name">ipfs节点ID</div>
                        <div class="main_item_content"><span class="theme_color">{{mynodedata.peerid}}</span></div>
                    </div>

                    <div class="main_item">                    
                        <div class="main_item_name">ipfs节点地址</div>
                        <div class="main_item_content">
                            <span class="theme_color">{{mynodedata.swarmlocal.length}}</span>
                        </div>
                    </div>
        
                    <div class="main_item" v-for="item in mynodedata.swarmlocal" :key="item">                    
                            <div class="main_item_name"></div>
                            <div class="main_item_content">
                                <span class="theme_color">{{item}}</span>
                            </div>
                    </div>

                    

                </div>
            </form>
            
        </div>
        <div id="swarm" v-if="selected==='swarm'" class="sub_second_iframe_left">
            <headnodestate :localid="systemdata.localnodeid" :nodeid="mynodedata.nodeid"></headnodestate>
            <div class="main_content">
                <div class="main_item">
                    <div class="main_item_name">节点网关</div>
                    <div class="main_item_content">
                        <span class="theme_color">{{mynodedata.gateway}}</span>
                    </div>
                </div>


            <span  v-for="(dht, id) in swarmdata.dhts" :key="id" >               
                <div class="main_item">                    
                    <div class="main_item_name">{{id}}</div>
                    <div class="main_item_content"> <span class="theme_color">{{dht.length}}</span></div>
                </div>
                <div class="main_item" v-for="pid in dht" :key="pid">                    
                    <div class="main_item_name"></div>
                    <div class="main_item_content">
                        <span class="theme_color">{{pid}}</span>
                    </div>
                </div>
            </span>

            <div class="main_item">                    
                <div class="main_item_name">节点地址</div>
                <div class="main_item_content">
                    <span class="theme_color">{{Object.keys(swarmdata.addrs).length}}</span>
                </div>
            </div>

            <span  v-for="(addrs, pid) in swarmdata.addrs" :key="pid" >               
                <div class="main_item">                    
                    <div class="main_item_name"> </div>
                    <div class="main_item_content"> <span class="theme_color">{{pid}}</span></div>
                </div>
                
                <div class="main_item" v-for="addr in addrs" :key="addr">                    
                    <div class="main_item_name"></div>
                    <div class="main_item_content">
                        <span class="theme_color">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{addr}}</span>
                    </div>
                </div>
            </span>


            <!-- <div class="main_item">                    
                <div class="main_item_name">节点数目</div>
                <div class="main_item_content">
                    <span class="theme_color">{{swarmdata.peers.length}}</span>
                </div>
            </div>

            <div class="main_item" v-for="peer in swarmdata.peers" :key="peer">                    
                    <div class="main_item_name"></div>
                    <div class="main_item_content">
                        <span class="theme_color">{{peer}}</span>
                    </div>
            </div> -->
            

            </div>
        </div>
        <div id="myapp" v-if="selected==='myapp'" class="sub_second_iframe_left">
            <div class="main_header">
                <p class="main_header_title">应用数目: &nbsp; &nbsp;<span>{{appsdata.apps.length}}</span></p>
            </div>

            <div v-for="(app, index) in appsdata.apps" :key="index"> 
                <div class="main_item">
                    <div class="main_item_name">应用名称</div>
                    <div class="main_item_content"><span class="theme_color">{{app.name}}</span></div>
                </div>
                <div class="main_item">
                    <div class="main_item_name">应用ID</div>
                    <div class="main_item_content"><span class="theme_color">{{app.iD}}</span></div>
                </div>
                <div class="main_item">
                    <div class="main_item_name">开发者</div>
                    <div class="main_item_content"><span class="theme_color">{{app.author}}</span></div>
                </div>
                <div class="main_item">
                    <div class="main_item_name">应用版本</div>
                    <div class="main_item_content">
                        <span class="theme_color" v-for="(ver, i) in app.appvers" :key="i">
                            <a :href="getAppUrl(app.iD, ver)">{{ver}} </a> <a> &nbsp;  &nbsp; </a>  
                        </span>
                    </div>
                </div>
            </div>
            <!-- <button v-on:click="ontest()">测试</button> -->
        </div>
        <div id="message" v-if="selected==='message'" class="sub_second_iframe_left">
            <div class="main_header">
                <p class="main_header_title">互动消息</p>
            </div>
        </div>
        <div id="mefiles" v-if="selected==='myfiles'" class="sub_second_iframe_left">
            <div class="main_header">
                <p class="main_header_title">文件列表</p>
            </div>
            <div class="main_item">
                <Uploader></Uploader>
                <hr/>
                <FileList></FileList>
            </div>
            <div class="main_item">
            </div>
        </div>        
        <div id="system" v-if="selected==='system'" class="sub_second_iframe_left">
            <headnodestate :localid="systemdata.localnodeid" :nodeid="mynodedata.nodeid"></headnodestate>

            <!-- <button v-on:click="ontest()">测试</button> -->
            <div class="main_item">                    
                <div class="main_item_name">点击切换节点</div>
                <div class="main_item_content"></div>
            </div>

            <div class="main_item" v-for="pid in swarmdata.dhts['LAN']" :key="pid">                    
                    <div class="main_item_name"></div>
                    <div class="main_item_content">
                        <span v-on:click="onswitch(pid)" class="theme_color">{{pid}}</span>
                    </div>
            </div>
            <div>
                <div class="main_item_name">配置文件</div>
                <div class="main_item_content">
                    <textarea  v-bind:value="systemdata.systemvars" @input="printvars($event.target.value)" class="input_text"></textarea>
                    <div class="main_item_content">
                        <button v-bind:disabled="!systemdata.bChanged" v-on:click="resetSystemdata()" >重置</button> 
                        <button v-bind:disabled="!systemdata.bChanged" v-on:click="saveSystemdata()" >保存</button>
                    </div>
                </div>
            </div>              
        </div>
    </div>		
    <div  v-if="!isLogined">
        <form method="post" action="login.js">
            <p>当前登陆的节点地址:{{ips}}</p>

            <p><label class="label_input">用户名</label><input type="text" id="username" class="text_field"/></p>
            <p><label class="label_input">密&nbsp;&nbsp;码</label><input type="text" id="password" class="text_field"/></p>
     
            <div id="login_control">
                <input type="button" id="btn_login" value="登录" οnclick="login();"/>
                <input type="button" id="btn_login" value="注册" οnclick="login();"/>
            </div>
        </form>
    </div>
</template>
