<template>
  <h1>Events For Good</h1>
  <div class="events">
     <form @submit="change_size">
    <input id="select-size"  v-model="size" type="number">
    </form>
    <br>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
    <router-link :to="{name:'EventList',query:{page:page-1}}"
      rel="prev" id="page-prev"
      v-if="page!=1"
    > prev</router-link>
    <router-link :to="{name:'EventList',query:{page:page+1}}"
      rel="next" id="page-next"
      v-if="has_next_page"
    > next</router-link>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import {watchEffect} from '@vue/runtime-core'
// import axios from 'axios'
export default {
  name: 'EventList',
  props:{
    page:{
      type:Number,
      required:true
    }
  },
  components: {
    EventCard // register it as a child component
  },
  data() {
    return {
      events: null,
      total_count:0,
      size:2
    }
  },
  created(){
    watchEffect(()=>{
      EventService.getEvents(this.size,this.page)
        .then((response)=>{
            this.events = response.data;
            this.total_count=response.headers['x-total-count']
        })
        .catch((error)=>{
            console.log(error)
        })
    })
  },
  computed:{
    has_next_page(){
      let total = Math.ceil(this.total_count/2);
      return this.page<total;
    },
    change(){
      console.log(this.size)
      return true
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: pink;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
