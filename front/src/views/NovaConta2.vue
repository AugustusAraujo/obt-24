<template>
    <ion-page>
      <h1 style="font-size: 50px;">Nova Conta</h1>
      <Input texto="Estado" />
      <Input texto="Cidade" />
      <Input texto="CEP" />
      <a style="text-decoration: none;" href="/feed">
        <Botao texto="FINALIZAR" cor="#FE621D"/>
      </a>
      <p></p>
      <a href="/" style="text-decoration: none;"><Botao texto="VOLTAR" cor="#212227"/></a>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage } from '@ionic/vue';
  import Botao from "../components/Botao.vue"
  import Input from "../components/Input.vue"
  </script>
  