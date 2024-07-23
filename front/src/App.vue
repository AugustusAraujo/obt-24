<template>
  <ion-app class="one">
    <main >
      <ion-router-outlet/>
    </main>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style>
body,
html {
  background: white;
  color: black;
}
</style>