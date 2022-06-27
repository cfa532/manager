# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

1、用户登录之后，可以获取一个sid
2、创建弥媒
所有的资源都通过弥媒封装，使用之前创建一个弥媒
MMCreate(sid, appid, ext, mark string, tp byte, right uint64) (mid string, err error)
appid是应用id,可以写空
ext,是类型，应用自定义
mark,是唯一标识，同样参数生成的mimeiid是不变的
多次创建也没关系的，都是同一个弥媒

如果是"{{auto}}"，会自动生成一个确保唯一的id
这个每次产生一个新的
tp有两种类型，文件和数据库. MM_File 是1, MM_Db 2

3、打开弥媒
MMOpen(sid, mid, ver string, opt ...string) (string, error)
这时候获取一个mmsid,后面的操作都使用mmsid

4、如果是文件可以使用文件相关的api,如果是数据库类型可以使用数据库相关的api
文件相关（都在不断调整中）
 MFOpenByPath(sid, mid, path string, flag int) (string, error)
 MFOpenMacFile(sid, mid, fileid string) (string, error)
 MFOpenTempFile(sid string) (string, error)
 MFTemp2MacFile(sid, mid string) (string, error)
 MFPath2TempID(sid, localpath string) (string, error)
 MFClose(fsid string) error
 MFTruncate(fsid string, size int64) error
 MFSetObject(fsid string, obj interface{}) error
 MFGetObject(fsid string) (interface{}, error)
 MFSetData(fsid string, data []byte, start int64) (count int, err error)
 MFGetData(fsid string, start int64, count int) ([]byte, error)
 MFGetSize(fsid string) (int64, error)
 MFStat(fsid string) (*FileInfo, error)
 MFIsExist(fsid, fileid string) (bool, error)
 MFReaddir(fsid string, count int) ([]*FileInfo, error)
 MFGetMimeType(fsid string) (string, error)
 MFSetCid(sid, mid, cid string) (string, error)
 
数据库相关
 Begin(dasid string, timeout int) error
 Commit(dasid string) error
 Rollback(dasid string) error
 Set(dasid, key string, value interface{}) error
 Get(dasid, key string) (interface{}, error)
 Del(dasid string, key ...string) (int64, error)
 Incr(dasid, key string) (int64, error)
 IncrBy(dasid, key string, delta int64) (int64, error)
 Strlen(dasid, key string) (int64, error)
 Hmclear(dasid string, key ...string) (int64, error)
 Hdel(dasid, key string, field ...string) (int64, error)
 Hlen(dasid, key string) (int64, error)
 Hset(dasid, key, field string, value interface{}) (int64, error)
 Hget(dasid, key, field string) (interface{}, error)
 Hmget(dasid, key string, fields ...string) ([]interface{}, error)
Hmset(dasid, key string, values ...FVPair) error
 Hgetall(dasid, key string) ([]FVPair, error)
 Hkeys(dasid, key string) ([]string, error)
 Hscan(dasid, key, beginfield, match string, count int, inclusive bool) (ret []FVPair, err error)
 Hrevscan(dasid, key, beginfield, match string, count int, inclusive bool) (ret []FVPair, err error)
 HincrBy(sid, key, field string, delta int64) (ret int64, err error)
 Lpush(dasid, key string, value ...interface{}) (int64, error)
 Lpop(dasid, key string) (interface{}, error)
 Rpush(dasid, key string, value ...interface{}) (int64, error)
 Rpop(dasid, key string) (interface{}, error)
 Lrange(dasid, key string, start, stop int32) ([]interface{}, error)
 Lclear(dasid, key string) (int64, error)
 Lmclear(dasid string, keys ...string) (int64, error)
 Lindex(dasid, k string, index int32) (interface{}, error)
 Llen(dasid, k string) (int64, error)
 Lset(dasid, k string, index int32, value interface{}) error
 Zadd(dasid, key string, args ...ScorePair) (int64, error)
 Zcard(dasid, key string) (int64, error)
 Zcount(dasid, key string, mins, maxs int64) (int64, error)
 Zrem(dasid, key string, members ...string) (int64, error)
 Zscore(dasid, key, member string) (int64, error)
 Zrank(dasid, key, member string) (int64, error)
 Zrange(dasid, key string, mins, maxs int) ([]ScorePair, error)
 Zrangebyscore(dasid, key string, mins, maxs int64, offset int, count int) ([]ScorePair, error)
 Zremrangebyscore(dasid, key string, mins, maxs int64) (int64, error)
 Zrevrange(dasid, key string, start, stop int) (ret []ScorePair, err error)
 Zrevrangebyscore(dasid, key string, mins, maxs int64, offset int, count int) (ret []ScorePair, err error)
 Zmclear(dasid string, key ...string) (int64, error)
 Zclear(dasid, key string) (int64, error)
 ZincrBy(dasid, key string, delta int64, member string) (ret int64, err error)
 Sadd(dasid, key string, args ...string) (int64, error)
 Scard(dasid, key string) (int64, error)
 Sclear(dasid, key string) (int64, error)
 Sdiff(dasid string, keys ...string) ([]string, error)
 Sinter(dasid string, keys ...string) ([]string, error)
 Smclear(dasid string, key ...string) (int64, error)
 Smembers(dasid, key string) ([]string, error)
 Srem(dasid, key string, m string) (int64, error)
 Sunion(dasid string, keys ...string) ([]string, error)
 Scan(dasid string, begin, match string, count int, inclusive bool, tp byte) (keys []string, err error)

 api用法可以参考redis
 http://redisdoc.com/