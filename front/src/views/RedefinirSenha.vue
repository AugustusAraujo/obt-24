<template>
    <ion-page>
      <h1 style="font-size: 50px;">REDEFINIR SENHA</h1>
      <Input texto="E-mail"/>
      <a style="text-decoration: none;" href="/">
        <Botao texto="REDEFINIR" cor="#FE621D"/>
      </a>
      <p></p>
      <span style="color:#FE621D">*</span> <span>Um e-mail com as instruções para redefinição será enviado para o endereço acima</span>
      <p></p>
      <a style="text-decoration: none;" href="/">
        <Botao texto="VOLTAR" cor="#212227"/>
      </a>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage } from '@ionic/vue';
  import Botao from "../components/Botao.vue"
  import Input from "../components/Input.vue"
  </script>
  