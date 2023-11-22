<template>
  <section class="text-gray-600 body-font">
    <div class="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
      <div class="w-full text-center lg:w-2/3">
        <h1 class="text-red-500 dark:text-red-500">404 NOT FOUND</h1>
        <p class="mb-8 leading-relaxed dark:text-gray-300">Oops, looks like you got kidnapped by aliens.</p>
        <div class="flex justify-center">
          <router-link :to="{ name: 'Home' }"> Bring me back Home </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
