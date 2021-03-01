<template>
    <ul class="rec-list">
        <li
            class="rec-card corner"
            v-for="(item,index) in goods"
            v-bind:key="index"
            @click="redirectTo(item)">
            <img class="rec-media" :src="item.cover"/>
            <div class="rec-pro file">
                <h4>{{item.text}}</h4>
                <p>
                    <span class="rec-price">原价:￥{{item.price}}</span>
                    <span class="rec-online-price">促销价:￥{{item.onlinePrice}}</span>
                </p>
            </div>
        </li>
    </ul>
</template>
<script>
import Config from "@/config/config.js"
export default {
    name:"Index",
    computed:{
        goods(){
            return Config.goods
        }
    },
    methods:{
        redirectTo(item){
            this.$router.push({path:"goods",query:{goodName:item.name}})
        }
    }
}
</script>
<style scoped>
.rec-card{border: 1px solid #CCC;padding:16px;display: inline-block;margin:4px 8px;cursor: pointer;}
.rec-card:hover{background-color: #F1F1F1;}
.rec-price{text-decoration: line-through; color: #a1a1a1;font-style: italic;}
.rec-pro span{ display: block;}
</style>