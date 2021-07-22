<template>
    
    <div>Oops!!</div>
    <h3>the {{resource}} you're looking for is not here</h3>
    <router-link :to="{name:'EventList'}">back to home page</router-link>
</template>
<script>
export default {
    props:{
        resource:{
            type:String,
            required:true,
            defualt:'page'
        }
    }
}
</script>