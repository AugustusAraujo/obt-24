<script>
  export default {
    props: ['texto']
  }
</script>

<style>
.Input{
  width: 70%;
  height: 70px;
  font-size: 20px;
  font-weight: medium;
  background-color: #FFFFFF;
  border: solid 3px;
  border-color: #DDDEDE;
  border-radius: 10px;
  padding:10px;
  margin:10px;
}

.Input::placeholder {
    color: #DDDEDE;
}
</style>

<template>
  <div>
    <input 
      class="Input"
      type="text"
      :placeholder=texto
    />
  </div>
</template>