<template>
  <ion-page>
    <h1 style="font-size: 50px;">ENTRAR</h1>
    <Input texto="E-mail"/>
    <Input texto="Senha"/>
    <a href="/feed" style="text-decoration: none;"><Botao texto="ENTRAR" cor="#FE621D"/></a>
    <p></p>
    <a style="font-size: 20px; font-weight: 600; cursor: pointer; color: #FE621D; text-decoration: none" href="/redefinir_senha">Esqueci minha senha</a>    
    <p></p>
    <h4 style="font-size: 20px;">Ainda não tem uma conta ?</h4>
    <a href="/nova_conta_1" style="text-decoration: none;"><Botao texto="CADASTRE-SE" cor="#212227"/></a>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import Botao from "../components/Botao.vue"
import Input from "../components/Input.vue"
</script>
