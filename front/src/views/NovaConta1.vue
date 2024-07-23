<template>
    <ion-page>
      <h1 style="font-size: 50px;">Nova Conta</h1>
      <Input texto="Nome" />
      <Input texto="E-mail" />
      <Input texto="Crie uma senha" />
      <Input texto="Confirme sua senha" />
      <Input texto="CPF" />
      <a style="text-decoration: none;" href="/nova_conta_2">
        <Botao texto="CONTINUAR" cor="#FE621D"/>
      </a>
      <h4 style="font-size: 20px;">Já tem uma conta ?</h4>
      <a href="/" style="text-decoration: none;"><Botao texto="ENTRAR" cor="#212227"/></a>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage } from '@ionic/vue';
  import Botao from "../components/Botao.vue"
  import Input from "../components/Input.vue"
  </script>
  