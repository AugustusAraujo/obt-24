<script>
  export default {
    props: ['texto', 'cor']
  }
</script>

<style>
.Botao{
  width: 70%;
  height: 90px;
  font-size: 210%;
  border-radius: 10px;
  font-weight: bold;
  padding:20px;
}
</style>

<template>
  <div>
    <button 
      :style="{ backgroundColor: cor }"
      class="Botao"
    >
    {{ texto }}
    </button>
  </div>
</template>